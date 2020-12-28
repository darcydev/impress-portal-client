import Router from 'next/router';
import Link from 'next/link';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import NewJobModal from '../../components/Modals/NewJobModal';
import { readAllJobs } from '../../lib/jobs';
import { isLoggedIn } from '../../lib/auth';

export default function JobsPage({ preview }) {
	// process.browser makes sure that the browser is running client-side
	if (process.browser && !isLoggedIn()) {
		Router.push('/');
		return null;
	}

	const jobsQuery = useQuery('jobs', readAllJobs);

	const { status, data, isError, isFetching } = jobsQuery;

	if (status === 'error') {
		return <div>error...</div>;
	}

	if (status === 'loading') {
		return <div>loading...</div>;
	}

	if (status === 'success') {
		return (
			<div>
				<h2>list of all jobs</h2>
				<NewJobModal />
				<div className='data-container'>
					<ul>
						{data.data.map((job) => {
							const { id, job_code, job_type, tags, created_at } = job;

							return (
								<li key={id}>
									<Link href={`/jobs/update/${job_code}`}>{job_code}</Link>
								</li>
							);
						})}
					</ul>
				</div>
				{isFetching && <p>updating...</p>}
			</div>
		);
	}
}

export async function getStaticProps({ preview = false }) {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery('jobs', readAllJobs(preview));

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}
