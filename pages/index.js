import Link from 'next/link';
import { Button } from 'antd';
import { useQuery } from 'react-query';

import { readUserRole } from '../lib/auth';
import NewBriefButton from '../components/Buttons/NewBriefButton';
import NewJobButton from '../components/Buttons/NewJobButton';
import NewClientButton from '../components/Buttons/NewClientButton';

export default function Home() {
	const userRoleQuery = useQuery('userRole', readUserRole);

	const { status, data } = userRoleQuery;

	if (status === 'error') {
		return <p>error...</p>;
	}

	if (status === 'loading') {
		return <p>loading...</p>;
	}

	return (
		<div>
			<h1>Home page</h1>
			{data === 'Manager' && (
				<>
					<Button type='primary'>
						<Link href='/assets/upload'>Upload Assets</Link>
					</Button>
					<NewBriefButton />
					<NewJobButton />
					<NewClientButton />
				</>
			)}
		</div>
	);
}
