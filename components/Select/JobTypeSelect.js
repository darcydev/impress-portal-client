import { Select } from 'antd';

export default function JobTypeSelect({ passChildData }) {
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
		<Select
			showSearch
			allowClear
			placeholder='Select Job Type'
			options={jobTypeOptions}
			onChange={(e) => passChildData(e)}
		/>
	);
}
