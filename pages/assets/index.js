import { useState } from 'react';
import { useQuery } from 'react-query';

import AssetsSearch from '../../components/Assets/AssetsSearch';
import AssetsContainer from '../../components/Assets/AssetsContainer';
import EmptyData from '../../components/EmptyData';
import { readUserRole } from '../../lib/auth';
import { readAllAssets } from '../../lib/assets';

export default function AssetsPage({ allAssets, preview }) {
	const [searchFilters, setSearchFilters] = useState({
		jobCodes: [],
		tags: [],
		description: '',
	});

	const query = useQuery('userRole', readUserRole);

	const { status, data } = query;

	if (!allAssets.length) {
		return <EmptyData />;
	}

	if (status !== 'success') {
		return <p>loading...</p>;
	}

	if (status === 'error') {
		return <p>error...</p>;
	}

	if (data !== 'Manager') {
		return <p>forbidden...</p>;
	}

	return (
		<>
			<AssetsSearch assets={allAssets} passChildData={setSearchFilters} />
			<AssetsContainer activeFilters={searchFilters} />
		</>
	);
}

export async function getStaticProps({ preview = false }) {
	const allAssets = await readAllAssets(preview);

	return {
		props: { allAssets, preview },
	};
}
