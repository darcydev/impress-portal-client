import Layout from '../components/Layout';
import ThemeContextProvider from '../context/ThemeContext';
import { GlobalStyles } from '../styles';

import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
	return (
		<ThemeContextProvider>
			<GlobalStyles />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ThemeContextProvider>
	);
}

export default MyApp;
