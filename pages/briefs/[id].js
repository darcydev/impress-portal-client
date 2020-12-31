import { useQuery } from 'react-query';

import { readUserRole } from '../../lib/auth';
import { readAllBriefs, readBriefById } from '../../lib/briefs';
import BriefingFormManager from '../../components/Forms/BriefingFormManager';
import BriefingFormClient from '../../components/Forms/BriefingFormClient';

export default function Brief({ brief, preview }) {
	const userRoleQuery = useQuery('userRole', readUserRole);

	if (userRoleQuery.status === 'error') {
		return <div>error...</div>;
	}

	if (userRoleQuery.status === 'loading') {
		return <div>loading...</div>;
	}

	if (userRoleQuery.data !== 'Manager') {
		return <BriefingFormManager job={brief} />;
	}

	if (userRoleQuery.data === 'Client') {
		return <BriefingFormClient job={brief} />;
	}

	return <div>error: no user found</div>;
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
