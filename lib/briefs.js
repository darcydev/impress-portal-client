import Router from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';

const API_URL = process.env.PUBLIC_API_URL;

export const readBriefs = async (route) => {
	const { data } = await axios.get(route);

	if (data.errors) {
		console.error(data.errors);
		return null;
	}

	console.log('data :>> ', data);

	return data;
};

export const readAllBriefs = async () => await readBriefs(`${API_URL}/briefs`);
export const readBriefById = async (id) =>
	await readBriefs(`${API_URL}/briefs/${id}`);

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
		console.error(data.errors);
		return null;
	}

	return data;
};
