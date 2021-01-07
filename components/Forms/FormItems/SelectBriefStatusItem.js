import { Select } from 'antd';

import ItemWrapper from './ItemWrapper';

export default function SelectBriefStatusItem({ name, label, required }) {
	const options = [
		{
			value: 'draft',
			label: 'Draft',
		},
		{
			value: 'approved',
			label: 'Approved',
		},
		{ value: 'in_progress', label: 'In progress' },
		{ value: 'completed', label: 'Completed' },
		{ value: 'archived', label: 'Archived' },
	];

	return (
		<ItemWrapper name={name} label={label} required={required}>
			<Select
				showSearch
				allowClear
				placeholder='Select Brief Status'
				options={options}
			/>
		</ItemWrapper>
	);
}
