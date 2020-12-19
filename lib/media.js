import Router from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';

import { createAsset } from '../lib/assets';
import { createJob } from '../lib/jobs';

const API_URL = process.env.PUBLIC_API_URL;

export const uploadMedia = async (values, fileList) => {
	const token = Cookie.get('token');

	if (!token) {
		Router.push('/login');
		return null;
	}

	const { job_code, tags } = values;
	const route = `${API_URL}/upload`;

	// 1) fetch the jobId
	const job = await createJob(job_code);
	const jobId = job[0].id;

	// 2) create the asset in the db
	const createdAsset = await createAsset(jobId);
	const assetId = createdAsset.data.id;

	// 3) upload the file to the newly-created asset
	fileList.forEach(async (file) => {
		const formData = new FormData();
		formData.append('files', file);
		formData.append('ref', 'asset');
		formData.append('refId', assetId);
		formData.append('field', 'file');

		const data = await axios.post(route, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${token}`,
			},
		});

		if (data.errors) {
			console.error(data.errors);
			return false;
		}

		return true;
	});
};
