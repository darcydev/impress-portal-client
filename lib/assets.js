import Router from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';

const API_URL = process.env.PUBLIC_API_URL;

export const readAssets = async (route) => {
	const { data } = await axios.get(route);

	if (data.errors) {
		throw new Error(data.errors);
	}

	return data;
};

export const readAllAssets = async () => {
	return await readAssets(`${API_URL}/assets`);
};

export const createAsset = async (body) => {
	const token = Cookie.get('token');

	if (!token) {
		Router.push('/login');
		return null;
	}

	const { data } = await axios.post(`${API_URL}/assets`, body, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	if (data.errors) {
		throw new Error(data.errors);
	}

	return data;
};

export const updateAsset = async (assetId, body) => {
	const token = Cookie.get('token');

	if (!token) {
		Router.push('/login');
		return null;
	}

	const { data } = await axios.put(`${API_URL}/assets/${assetId}`, body, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	if (data.errors) {
		throw new Error(data.errors);
	}

	return data;
};
