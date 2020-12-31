import Router from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';

const API_URL = process.env.PUBLIC_API_URL;

const readClients = async (route) => {
	const { data } = await axios.get(route);

	if (data.errors) {
		throw new Error(data.errors);
	}

	return data;
};

export const readAllClients = async () => {
	return await readClients(`${API_URL}/clients`);
};
export const readClientById = async (id) => {
	return await readClients(`${API_URL}/clients/${id}`);
};

export const updateClient = async (id, values) => {
	const token = Cookie.get('token');

	if (!token) {
		Router.push('/login');
		return null;
	}

	const { client_code, client_title, client_description } = values;

	const { data } = await axios.put(
		`${API_URL}/clients/${id}`,
		{
			client_code,
			client_title,
			client_description,
		},
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

export const createClient = async () => {
	const token = Cookie.get('token');

	if (!token) {
		Router.push('/login');
		return null;
	}

	const { data } = await axios.post(
		`${API_URL}/clients`,
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
