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

export const readAllNonNullClientCodes = async () => {
	const allClients = await readAllClients();

	return allClients
		.filter((client) => client.client_code !== null)
		.map((client) => {
			const { id, client_code } = client;

			return { id, client_code };
		});
};

export const updateClient = async (id, values) => {
	const token = Cookie.get('token');

	if (!token) {
		Router.push('/login');
		return null;
	}

	values = { ...values, client_code: values.client_code.toUpperCase() };

	const { data } = await axios.put(`${API_URL}/clients/${id}`, values, {
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
