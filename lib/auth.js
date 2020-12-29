import Router from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';

const API_URL = process.env.PUBLIC_API_URL;

export const isLoggedIn = () => (Cookie.get('token') ? true : false);

export const loginUser = async (values) => {
	// prevent function from being run on the server
	if (typeof window === 'undefined') return;

	const { email, password } = values;
	const URL = `${API_URL}/auth/local`;

	const { data } = await axios.post(URL, {
		identifier: email,
		password: password,
	});

	const { jwt, user } = data;

	if (jwt) {
		Cookie.set('token', jwt);
		Router.push('/');
		return user;
	} else {
		return false;
	}
};
