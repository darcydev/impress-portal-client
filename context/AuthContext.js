import React, { createContext, useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';

const API_URL = process.env.PUBLIC_API_URL;

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState({});
	const token = Cookie.get('token');

	useEffect(() => {
		if (token) {
			axios
				.get(`${API_URL}/users/me`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					console.log('res fetched from AuthContext: ', res);

					setUser(res.data);
				})
				.catch((err) => console.error(err));
		} else {
			setUser({});
		}
	}, []);

	const setUserReducer = (user) => {
		setUser(user);
	};

	const value = { user, setUserReducer };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
