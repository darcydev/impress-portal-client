import Link from 'next/link';
import { useQuery } from 'react-query';

import { readUserRole } from '../../lib/auth';
import { readAllJobs, readJobById } from '../../lib/jobs';

export default function Job({ job, preview }) {
	const userRoleQuery = useQuery('userRole', readUserRole);

	if (userRoleQuery.status === 'error') {
		return <div>error...</div>;
	}

	if (userRoleQuery.status === 'loading') {
		return <div>loading...</div>;
	}

	if (userRoleQuery.data !== 'Manager') {
		return <p>forbidden...</p>;
	}

	const { id, job_code, assets, briefs, clients } = job;

	return (
		<div>
			<h1>Single job page</h1>
			<p>Job code: {job_code}</p>
			<Link href={`/jobs/edit/${id}`}>Edit</Link>
		</div>
	);
}

export async function getStaticProps({ params, preview = false }) {
	const job = await readJobById(params.id, preview);

	return {
		props: {
			job,
			preview,
		},
	};
}

export async function getStaticPaths() {
	const allJobs = await readAllJobs();

	const paths = allJobs.map((job) => ({
		params: {
			id: job.id.toString(),
		},
	}));

	return {
		paths,
		fallback: false,
	};
}
