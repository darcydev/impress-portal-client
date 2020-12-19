import Router from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';

const API_URL = process.env.PUBLIC_API_URL;

export const createAsset = async (jobId) => {
	const token = Cookie.get('token');

	if (!token) {
		Router.push('/login');
		return null;
	}

	const data = await axios.post(
		`${API_URL}/assets`,
		{ job: jobId },
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (data.errors) {
		console.error(data.errors);
		return null;
	}

	return data;
};

export const updateAsset = async (assetId, body) => {
	const token = Cookie.get('token');

	if (!token) {
		Router.push('/login');
		return null;
	}

	const data = await axios.put(`${API_URL}/assets/${assetId}`, body, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	if (data.errors) {
		console.error(data.errors);
		return null;
	}

	return data;
};
