import Router from 'next/router';
import { useQuery } from 'react-query';

import EditBriefManager from '../../../components/Forms/Briefs/BriefManager';
import EditBriefClient from '../../../components/Forms/Briefs/BriefClient';
import { readUserRole } from '../../../lib/auth';
import { readAllBriefs, readBriefById } from '../../../lib/briefs';

export default function EditBrief({ brief, preview }) {
	const userRoleQuery = useQuery('userRole', readUserRole);

	const { status, data } = userRoleQuery;

	if (status === 'error') {
		return <div>error...</div>;
	}

	if (status === 'loading') {
		return <div>loading...</div>;
	}

	if (!data) {
		Router.push('/login');
		return null;
	}

	if (data === 'Manager') {
		return <EditBriefManager brief={brief} />;
	}

	if (data === 'Client') {
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
