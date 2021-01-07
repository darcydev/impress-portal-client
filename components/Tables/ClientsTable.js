import Link from 'next/link';
import { Table } from 'antd';

import { clientCodeFilters } from './utils/filters';

export default function ClientsTable({ data }) {
	return (
		<Table
			pagination={false}
			dataSource={data}
			columns={[
				{
					title: 'Title',
					render: (record) => record.client_title,
				},
				{
					title: 'Client Code',
					render: (record) => record.client_code,
					onFilter: (value, record) => record.client_code?.includes(value),
					filters: clientCodeFilters(),
				},
				{
					title: 'Action',
					dataIndex: '',
					render: (value, record) => (
						<>
							<Link href={`/clients/${value.id}`}>View</Link>
							<Link href={`/clients/edit/${value.id}`}>Edit</Link>
						</>
					),
				},
			]}
		/>
	);
}
