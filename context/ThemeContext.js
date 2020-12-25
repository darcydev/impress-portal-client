import React, { createContext, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { themes } from '../styles';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState('light');

	const setThemeReducer = () => {
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	const activeTheme = themes[theme];
	const value = { theme, setThemeReducer };

	return (
		<ThemeContext.Provider value={value}>
			<StyledThemeProvider theme={activeTheme}>{children}</StyledThemeProvider>
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
