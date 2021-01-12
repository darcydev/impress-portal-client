import Router from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';

const API_URL = process.env.PUBLIC_API_URL;

export const readBriefs = async (route) => {
	const { data } = await axios.get(route);

	if (data.errors) {
		throw new Error(data.errors);
	}

	return data;
};

export const readAllBriefs = async () => {
	return await readBriefs(`${API_URL}/briefs`);
};

export const readBriefById = async (id) => {
	return await readBriefs(`${API_URL}/briefs/${id}`);
};

export const updateBrief = async (id, values) => {
	const token = Cookie.get('token');

	if (!token) {
		Router.push('/login');
		return null;
	}

	const { data } = await axios.put(`${API_URL}/briefs/${id}`, values, {
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

export const createBrief = async () => {
	const token = Cookie.get('token');

	if (!token) {
		Router.push('/login');
		return null;
	}

	const { data } = await axios.post(
		`${API_URL}/briefs`,
		{},
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (data.errors) {
		throw new Error(data.errors);
	}

	return data;
};
