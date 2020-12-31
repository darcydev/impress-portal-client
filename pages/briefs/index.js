import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import { readUserRole } from '../../lib/auth';
import { readAllBriefs } from '../../lib/briefs';

export default function BriefsPage({ preview }) {
	const userRoleQuery = useQuery('userRole', readUserRole);

	if (userRoleQuery.status !== 'success') {
		return <div>loading...</div>;
	}

	if (userRoleQuery.data !== 'Manager') {
		return <div>Forbidden!</div>;
	}

	const briefsQuery = useQuery('briefs', readAllBriefs);

	const { status, data, isError, isFetching } = briefsQuery;

	if (status === 'error') {
		return <div>error...</div>;
	}

	if (status === 'loading') {
		return <div>loading...</div>;
	}

	return (
		<div>
			<h2>list of all briefs</h2>
			<div className='data-container'>insert all briefs here</div>
			{isFetching && <p>updating...</p>}
		</div>
	);
}

export async function getStaticProps({ preview = false }) {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery('briefs', readAllBriefs(preview));

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}
