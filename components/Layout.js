import styled from 'styled-components';

import Head from './Head';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ preview, children }) {
	return (
		<>
			<Head />
			<Header />
			<StyledMain>{children}</StyledMain>
			<Footer />
		</>
	);
}

const StyledMain = styled.main`
	width: 1200px;
	max-width: 90%;
	margin: 50px auto;
`;
