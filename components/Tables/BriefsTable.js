import Link from 'next/link';
import { Table, Tag } from 'antd';

import {
	jobTypeFilters,
	briefStatusFilters,
	jobCodeFilters,
} from './utils/filters';

export default function BriefsTable({ data }) {
	return (
		<Table
			pagination={false}
			dataSource={data}
			columns={[
				{
					title: 'Title',
					render: (record) => record.brief_title,
				},
				{
					title: 'Brief Type',
					render: (record) => record.brief_type,
					onFilter: (value, record) => record.brief_type?.includes(value),
					filters: jobTypeFilters(),
				},
				{
					title: 'Job Code',
					render: (record) => record.job?.job_code,
					onFilter: (value, record) => record.job?.job_code?.includes(value),
					filters: jobCodeFilters(),
				},
				{
					title: 'Status',
					render: (record) => {
						const tag = record.brief_status.toUpperCase();

						return <Tag>{tag}</Tag>;
					},
					onFilter: (value, record) => record.brief_status?.includes(value),
					filters: briefStatusFilters(),
				},
				{
					title: 'Action',
					dataIndex: '',
					render: (value, record) => (
						<>
							<Link href={`/briefs/${value.id}`}>View</Link>
							<Link href={`/briefs/edit/${value.id}`}>Edit</Link>
						</>
					),
				},
			]}
		/>
	);
}
