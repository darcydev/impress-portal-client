import { useQuery } from 'react-query';
import { Select } from 'antd';

import { readAllNonNullJobCodes } from '../../lib/jobs';

export default function JobCodeSelect({
	passChildData,
	defaultValue = undefined,
}) {
	const query = useQuery('jobCodes', readAllNonNullJobCodes);

	const { status, data } = query;

	if (status === 'loading') {
		return <p>loading...</p>;
	}

	if (status === 'error') {
		return <p>error...</p>;
	}

	let jobCodeOptions = [];

	for (let i = 0; i < data.length; i++) {
		const value = data[i];

		jobCodeOptions.push({ value: value.id, label: value.job_code });
	}

	return (
		<Select
			showSearch
			allowClear
			defaultValue={defaultValue}
			placeholder='Select Job Code'
			options={jobCodeOptions}
			onChange={(e) => passChildData(e)}
		/>
	);
}
