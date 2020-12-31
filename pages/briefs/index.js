import Link from 'next/link';
import { useQuery } from 'react-query';

import { readUserRole } from '../../lib/auth';
import { readAllBriefs } from '../../lib/briefs';

export default function BriefsPage({ allBriefs, preview }) {
	const userRoleQuery = useQuery('userRole', readUserRole);

	if (userRoleQuery.status !== 'success') {
		return <div>loading...</div>;
	}

	if (userRoleQuery.data !== 'Manager') {
		return <div>Forbidden!</div>;
	}

	if (!allBriefs.length) {
		<p>loading...</p>;
	}

	console.log('allBriefs :>> ', allBriefs);

	return (
		<div>
			<h2>list of all briefs</h2>
			<div className='data-container'>
				<ul>
					{allBriefs.map((brief) => {
						const { id, brief_title, brief_status } = brief;

						return (
							<li>
								<p>Brief title: {brief_title}</p>
								<p>Brief status: {brief_status}</p>
								<Link href={`/briefs/${id}`}>View</Link>
								<Link href={`/briefs/edit/${id}`}>Edit</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

export async function getStaticProps({ preview = false }) {
	const allBriefs = await readAllBriefs(preview);

	return {
		props: { allBriefs, preview },
	};
}
