import { Select } from 'antd';

import ItemWrapper from './ItemWrapper';

export default function JobTypeSelect({ name, label, required }) {
	let jobTypeOptions = [
		{ value: 'Campaign Creative', label: 'Campaign Creative' },
		{ value: 'Branding & Identity', label: 'Branding & Identity' },
		{ value: 'Community Update', label: 'Community Update' },
		{ value: 'Brochure/Report', label: 'Brochure/Report' },
		{ value: 'Print Collateral', label: 'Print Collateral' },
		{ value: 'Video/Animation', label: 'Video/Animation' },
		{ value: 'Web Development', label: 'Web Development' },
		{ value: 'Environmental Graphics', label: 'Environmental Graphics' },
		{ value: 'Powerpoint/Word', label: 'Powerpoint/Word' },
		{ value: 'Accessibility', label: 'Accessibility' },
	];

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
