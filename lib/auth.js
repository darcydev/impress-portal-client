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

	const { jwt } = data;

	if (jwt) {
		Cookie.set('token', jwt);
		// TODO set the User object in state

		Router.push('/');
		return true;
	} else {
		return false;
	}
};

export const logoutUser = () => {
	// remove token and user cookie
	Cookie.remove('token');
	delete window.__user;

	// sync logout between multiple windows
	window.localStorage.setItem('logout', Date.now());
	Router.push('/');
};
