import Link from 'next/link';
import { Table } from 'antd';

export default function JobsTable({ allJobs }) {
	return (
		<Table
			pagination={false}
			dataSource={allJobs}
			columns={[
				{
					title: 'Job Code',
					render: (record) => record.job_code,
				},
				{
					title: 'Brief Count',
					render: (record) => record.briefs.length,
				},
				{
					title: 'Action',
					dataIndex: '',
					render: (value, record) => (
						<>
							<Link href={`/jobs/${value.id}`}>View</Link>
							<Link href={`/jobs/edit/${value.id}`}>Edit</Link>
						</>
					),
				},
			]}
		/>
	);
}
