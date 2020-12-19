import React from 'react';
import Head from 'next/head';

import Header from './Header';
import Footer from './Footer';

export default function Layout({ preview, children }) {
	return (
		<>
			<Head>
				<title>Impress Portal</title>
				<meta charSet='utf-8' />
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
}
