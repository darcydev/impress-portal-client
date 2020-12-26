import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';

import Layout from '../components/Layout';
import ThemeContextProvider from '../context/ThemeContext';
import { GlobalStyles } from '../styles';

import 'antd/dist/antd.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
	return (
		<ThemeContextProvider>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<GlobalStyles />
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</Hydrate>
			</QueryClientProvider>
		</ThemeContextProvider>
	);
}

export default MyApp;
