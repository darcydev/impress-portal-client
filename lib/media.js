import Router from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';

const API_URL = process.env.PUBLIC_API_URL;

export const createMedia = async (assetId, file) => {
	const token = Cookie.get('token');

	if (!token) {
		Router.push('/login');
		return null;
	}

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

	return data;
};
