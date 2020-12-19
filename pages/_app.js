import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Cookie from 'js-cookie';

import Layout from '../components/Layout';

import 'antd/dist/antd.css';

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
`;

const theme = {
	colors: {
		primary: '#0070f3',
	},
};

function MyApp({ Component, pageProps }) {
	const token = Cookie.get('token');

	console.log('token from _app :>> ', token);

	return (
		<>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ThemeProvider>
		</>
	);
}

export default MyApp;
