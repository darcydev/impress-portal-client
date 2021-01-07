import { useQuery } from 'react-query';

import JobsTable from '../../components/Tables/JobsTable';
import { readUserRole } from '../../lib/auth';
import { readAllJobs } from '../../lib/jobs';

export default function JobsPage({ allJobs, preview }) {
	const userRoleQuery = useQuery('userRole', readUserRole);

	if (userRoleQuery.status === 'error') {
		return <p>error...</p>;
	}

	if (userRoleQuery.status === 'loading') {
		return <div>loading...</div>;
	}

	if (userRoleQuery.data !== 'Manager') {
		return <div>forbidden...</div>;
	}

	console.log('allJobs :>> ', allJobs);

	return (
		<div>
			<JobsTable allJobs={allJobs} />
		</div>
	);
}

export async function getStaticProps({ preview = false }) {
	const allJobs = await readAllJobs(preview);

	return {
		props: { allJobs, preview },
	};
}
