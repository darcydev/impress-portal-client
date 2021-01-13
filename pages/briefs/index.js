import { useQuery } from 'react-query';

import { readUserRole } from '../../lib/auth';
import { readAllBriefs } from '../../lib/briefs';
import BriefsTable from '../../components/Tables/BriefsTable';

export default function BriefsPage({ allBriefs, preview }) {
	const userRoleQuery = useQuery('userRole', readUserRole);

	const { status, data } = userRoleQuery;

	if (status === 'error') {
		return <p>error...</p>;
	}

	if (status === 'loading') {
		return <p>loading...</p>;
	}

	if (data !== 'Manager') {
		return <p>Forbidden!</p>;
	}

	return <BriefsTable data={allBriefs} />;
}

export async function getStaticProps({ preview = false }) {
	const allBriefs = await readAllBriefs(preview);

	return {
		props: { allBriefs, preview },
	};
}
