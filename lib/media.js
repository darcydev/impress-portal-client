import Router from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';

import { createAsset, updateAsset } from '../lib/assets';
import { readJobByJobCode } from '../lib/jobs';

const API_URL = process.env.PUBLIC_API_URL;

export const createMedia = async (assetId, fileList) => {
	const token = Cookie.get('token');

	if (!token) {
		Router.push('/login');
		return null;
	}

	fileList.forEach(async (file) => {
		const formData = new FormData();
		formData.append('files', file);
		formData.append('ref', 'asset');
		formData.append('refId', assetId);
		formData.append('field', 'file');

		const { data } = await axios.post(`${API_URL}/upload`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${token}`,
			},
		});

		if (data.errors) {
			throw new Error(data.errors);
		}
	});

	return true;
};

export const uploadMedia = async (values, fileList) => {
	const token = Cookie.get('token');

	if (!token) {
		Router.push('/login');
		return null;
	}

	const { job_code } = values;
	const tags = values.tags || [];

	// 1) fetch the jobId
	const job = await readJobByJobCode(job_code);
	const jobId = job.id;

	// 2) create the asset in the db
	const createdAsset = await createAsset(jobId);
	const assetId = createdAsset.id;

	if (!assetId) {
		throw new Error('Asset Id not found');
	}

	// 3) upload the file to the newly-created asset
	fileList.forEach(async (file) => {
		const formData = new FormData();
		formData.append('files', file);
		formData.append('ref', 'asset');
		formData.append('refId', assetId);
		formData.append('field', 'file');

		const createdMedia = await axios.post(`${API_URL}/upload`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${token}`,
			},
		});

		if (createdMedia.errors) {
			throw new Error(createdMedia.errors);
		}

		console.log('createdMedia :>> ', createdMedia);

		/**
		 * Add the tags to the relevant asset
		 * The forms submits two type of tags: tags that apply to all uploaded assets,
		 * and tags that apply to only one specific asset
		 * Therefore, while each media item. We need to get both the general tags
		 * and the specific tags, convert them into JSON and then update the asset with
		 * those tags
		 */
		const thisAssetTags = values[file.uid] || [];

		console.log('thisAssetTags :>> ', thisAssetTags);

		const body = JSON.stringify({
			tags: JSON.stringify([...tags, ...thisAssetTags]),
		});

		const updatedAsset = await updateAsset(assetId, body);

		if (updatedAsset.errors) {
			throw new Error(updatedAsset.errors);
		}

		console.log('updatedAsset :>> ', updatedAsset);

		return updatedAsset;
	});
};
