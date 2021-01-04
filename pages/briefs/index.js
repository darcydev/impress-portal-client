import Link from 'next/link';
import { useQuery } from 'react-query';
import { Table, Tag, Space } from 'antd';

import { readUserRole } from '../../lib/auth';
import { readAllBriefs } from '../../lib/briefs';

const columns = [
	{
		title: 'Title',
		dataIndex: 'brief_title',
		key: 'brief_title',
	},
	{
		title: 'Job Type',
		dataIndex: 'brief_type',
		key: 'brief_type',
	},
	{
		title: 'Status',
		key: 'brief_status',
		dataIndex: 'brief_status',
		render: (brief_status) => (
			<Tag key={brief_status}>{brief_status.toUpperCase()}</Tag>
		),
	},
	{
		title: 'Action',
		key: 'action',
		render: (text, record) => <Link href={`/briefs/${record.id}`}>View</Link>,
	},
];

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
			<div>INSERT SEARCH CONTAINER</div>
			<Table columns={columns} dataSource={allBriefs} />
		</div>
	);
}

export async function getStaticProps({ preview = false }) {
	const allBriefs = await readAllBriefs(preview);

	return {
		props: { allBriefs, preview },
	};
}
