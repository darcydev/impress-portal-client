import Router from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';

const API_URL = process.env.PUBLIC_API_URL;

const readUsers = async (route: string) => {
	const token = Cookie.get('token');

	if (!token) {
		Router.push('/login');
		return null;
	}

	const { data } = await axios.get(route, {
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

export const readAllUsers = async () => {
	return await readUsers(`${API_URL}/users`);
};

export const readAllClients = async () => {
	const allUsers = await readAllUsers();

	return allUsers.filter((user) => user.role.name === 'Client');
};
