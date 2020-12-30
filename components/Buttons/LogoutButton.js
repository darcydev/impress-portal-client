import Router from 'next/router';
import { Button } from 'antd';
import Cookie from 'js-cookie';

export default function LogoutButton() {
	const handleLogout = () => {
		// remove token and user cookie
		Cookie.remove('token');
		delete window.__user;

		// sync logout between multiple windows
		window.localStorage.setItem('logout', Date.now());
		Router.push('/');
	};

	return (
		<Button type='danger' onClick={() => handleLogout()}>
			Logout
		</Button>
	);
}
