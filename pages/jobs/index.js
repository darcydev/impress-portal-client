import Link from 'next/link';
import { useQuery } from 'react-query';

import { readUserRole } from '../../lib/auth';
import { readAllJobs } from '../../lib/jobs';

export default function JobsPage({ allJobs, preview }) {
	const userRoleQuery = useQuery('userRole', readUserRole);

	if (userRoleQuery.status !== 'success') {
		return <div>loading...</div>;
	}

	if (userRoleQuery.data !== 'Manager') {
		return <div>Forbidden!</div>;
	}

	if (!allJobs.length) {
		<p>loading...</p>;
	}

	return (
		<div>
			<h2>a list of all jobs</h2>
			<div className='data-container'>
				<ul>
					{allJobs.map((job) => {
						const { id, job_code } = job;

						return (
							<li key={id}>
								<p>Job Code: {job_code}</p>
								<Link href={`/jobs/${id}`}>view</Link>
								<Link href={`/jobs/edit/${id}`}>edit</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

export async function getStaticProps({ preview = false }) {
	const allJobs = await readAllJobs(preview);

	return {
		props: { allJobs, preview },
	};
}
