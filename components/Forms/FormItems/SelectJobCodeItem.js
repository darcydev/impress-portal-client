import { useQuery } from 'react-query';
import { Select } from 'antd';

import ItemWrapper from './ItemWrapper';
import { readAllNonNullJobCodes } from '../../../lib/jobs';

export default function SelectJobCodeItem({
	name = 'job',
	label = 'Job',
	required = false,
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
		<ItemWrapper name={name} label={label} required={required}>
			<Select
				showSearch
				allowClear
				placeholder='Select Job Code'
				options={jobCodeOptions}
			/>
		</ItemWrapper>
	);
}
