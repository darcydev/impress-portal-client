import { useQuery } from 'react-query';

import { readUserRole } from '../../../lib/auth';
import { readAllBriefs, readBriefById } from '../../../lib/briefs';
import EditBriefManager from '../../../components/Forms/EditBriefManager';
import EditBriefClient from '../../../components/Forms/EditBriefClient';

export default function EditBrief({ brief, preview }) {
	const userRoleQuery = useQuery('userRole', readUserRole);

	if (userRoleQuery.status === 'error') {
		return <div>error...</div>;
	}

	if (userRoleQuery.status === 'loading') {
		return <div>loading...</div>;
	}

	if (userRoleQuery.data === 'Manager') {
		return <EditBriefManager brief={brief} />;
	}

	if (userRoleQuery.data === 'Client') {
		return <EditBriefClient brief={brief} />;
	}

	return <p>Something went wrong...</p>;
}

export async function getStaticProps({ params, preview = false }) {
	const brief = await readBriefById(params.id, preview);

	return {
		props: {
			brief,
			preview,
		},
	};
}

export async function getStaticPaths() {
	const allBriefs = await readAllBriefs();

	const paths = allBriefs.map((brief) => ({
		params: {
			id: brief.id.toString(),
		},
	}));

	return {
		paths,
		fallback: false,
	};
}
