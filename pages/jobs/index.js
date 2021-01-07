import { useState } from 'react';
import Link from 'next/link';
import { Table, Button, Space } from 'antd';
import { useQuery } from 'react-query';

import { readUserRole } from '../../lib/auth';
import { readAllJobs, readAllJobCodes } from '../../lib/jobs';

export default function JobsPage({ allJobs, preview }) {
	const [filteredInfo, setFilteredInfo] = useState({});
	const [sortedInfo, setSortedInfo] = useState({});

	const userRoleQuery = useQuery('userRole', readUserRole);
	const jobCodesQuery = useQuery('jobCodes', readAllJobCodes);

	if (userRoleQuery.status === 'error') return <p>error...</p>;
	if (userRoleQuery.status === 'loading') return <div>loading...</div>;
	if (userRoleQuery.data !== 'Manager') return <div>forbidden...</div>;

	const handleChange = (pagination, filters, sorter) => {
		console.log('Various parameters: ', pagination, filters, sorter);

		setFilteredInfo(filters);
		setSortedInfo(sorter);
	};

	const clearFilters = () => setFilteredInfo({});
	const clearSorters = () => setSortedInfo({});

	const clearAll = () => {
		clearFilters();
		clearSorters();
	};

	console.log('jobCodesQuery.data :>> ', jobCodesQuery.data);

	console.log('allJobs :>> ', allJobs);

	allJobs.forEach((jobObj) => {
		jobObj.key = jobObj.id;
	});

	console.log('allJobs :>> ', allJobs);

	// jobCodes filter
	const jobCodesFilter = [];
	jobCodesQuery.data.forEach((jobCode) => {
		jobCodesFilter.push({ text: jobCode, value: jobCode });
	});

	const columns = [
		{
			title: 'Job Code',
			dataIndex: 'job_code',
			key: 'job_code',
			filters: jobCodesFilter,
			filteredValue: filteredInfo.job_code || null,
			onFilter: (value, record) => record.job_code?.includes(value),
			sortOrder: sortedInfo.columnKey === 'job_code' && sortedInfo.order,
			ellipsis: true,
		},
		{
			title: 'Brief Count',
			dataIndex: 'address',
			key: 'address',
			filters: [
				{ text: 'London', value: 'London' },
				{ text: 'New York', value: 'New York' },
			],
			filteredValue: filteredInfo.address || null,
			onFilter: (value, record) => record.address.includes(value),
			sorter: (a, b) => a.address.length - b.address.length,
			sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
			ellipsis: true,
		},
		{
			title: 'Action',
			dataIndex: '',
			key: 'x',
			render: (value, record) => <Link href={`/jobs/${value.id}`}>View</Link>,
		},
	];

	return (
		<div>
			<h2>a list of all jobs</h2>
			<Space>
				<Button onClick={clearFilters}>Clear filters</Button>
				<Button onClick={clearAll}>Clear filters and sorters</Button>
			</Space>
			<Table columns={columns} dataSource={allJobs} onChange={handleChange} />
		</div>
	);
}

export async function getStaticProps({ preview = false }) {
	const allJobs = await readAllJobs(preview);

	return {
		props: { allJobs, preview },
	};
}
