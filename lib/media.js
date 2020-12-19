import Router from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';

import { createAsset, updateAsset } from '../lib/assets';
import { createJob } from '../lib/jobs';

const API_URL = process.env.PUBLIC_API_URL;

export const uploadMedia = async (values, fileList) => {
	const token = Cookie.get('token');

	if (!token) {
		Router.push('/login');
		return null;
	}

	const { job_code, tags } = values;

	// 1) fetch the jobId
	const job = await createJob(job_code);
	const jobId = job[0].id;

	if (!jobId) {
		console.error('no Job Id');
		return null;
	}

	// 2) create the asset in the db
	const createdAsset = await createAsset(jobId);
	const assetId = createdAsset.data.id;

	if (!assetId) {
		console.error('no asset Id');
		return null;
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
			console.error(createdMedia.errors);
			return false;
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
		const thisAssetTags = values[file.uid];
		const body = JSON.stringify({
			tags: JSON.stringify([...tags, ...thisAssetTags]),
		});

		const updatedAsset = await updateAsset(assetId, body);

		if (updatedAsset.errors) {
			console.error(updatedAsset.errors);
			return false;
		}

		console.log('updatedAsset :>> ', updatedAsset);

		return true;
	});
};