import { useQuery } from 'react-query';

import AssetsContainer from '../../components/Assets/Container';
import { readUserRole } from '../../lib/auth';
import { readAllAssets } from '../../lib/assets';

export default function AssetsPage({ assets, preview }) {
	const query = useQuery('userRole', readUserRole);

	const { status, data } = query;

	if (status !== 'success') {
		return <p>loading...</p>;
	}

	if (status === 'error') {
		return <p>error...</p>;
	}

	if (data !== 'Manager') {
		return <p>forbidden...</p>;
	}

	return <AssetsContainer assets={assets} />;
}

export async function getStaticProps({ preview = false }) {
	const assets = await readAllAssets(preview);

	return {
		props: { assets, preview },
	};
}
