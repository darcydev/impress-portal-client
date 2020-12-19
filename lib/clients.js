import Router from 'next/router';
import Cookie from 'js-cookie';

const API_URL = process.env.PUBLIC_API_URL;

const readClients = async (route) => {
	const res = await fetch(route, {
		method: 'GET',
	});

	const data = await res.json();

	if (data.errors) throw new Error('Failed to fetch API');
	else return data;
};

export const readAllClients = () => readClients(`${API_URL}/clients`);
