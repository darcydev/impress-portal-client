import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';

import Layout from '../components/Layout';
import AuthContextProvider from '../context/AuthContext';
import { GlobalStyles } from '../styles';

import 'antd/dist/antd.css';
import 'react-quill/dist/quill.snow.css';

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
	return (
		<AuthContextProvider>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<GlobalStyles />
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</Hydrate>
			</QueryClientProvider>
		</AuthContextProvider>
	);
}
