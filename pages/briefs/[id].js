import { useContext, useState } from 'react';
import Router from 'next/router';
import styled from 'styled-components';

import { readAllBriefs, readBriefById } from '../../lib/briefs';

export default function Brief({ brief, preview }) {
	console.log('brief :>> ', brief);

	return (
		<div>
			<h1>Brief</h1>
		</div>
	);
}

export async function getStaticProps({ params, preview = false }) {
	const brief = await readBriefById(params.id, preview);

	return {
		props: { brief, preview },
	};
}

export async function getStaticPaths() {
	const allBriefs = await readAllBriefs();

	// Get the paths we want to pre-render based on posts
	const paths = allBriefs.map((brief) => ({
		params: { id: brief.id.toString() },
	}));

	return {
		paths,
		fallback: false,
	};
}
