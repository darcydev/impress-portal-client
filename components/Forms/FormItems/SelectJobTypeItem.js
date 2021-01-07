import { Select } from 'antd';

import ItemWrapper from './ItemWrapper';
import { JOB_TYPES } from '../../../constants/jobTypes';

export default function JobTypeSelect({ name, label, required }) {
	const jobTypeOptions = JOB_TYPES;

	return (
		<ItemWrapper name={name} label={label} required={required}>
			<Select
				showSearch
				allowClear
				placeholder='Select Job Type'
				options={jobTypeOptions}
			/>
		</ItemWrapper>
	);
}
