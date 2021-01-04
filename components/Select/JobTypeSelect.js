import { Select } from 'antd';

export default function JobTypeSelect({ passChildData }) {
	let jobTypeOptions = [
		{ value: 'campaign_creative', label: 'Campaign Creative' },
		{ value: 'branding_and_identity', label: 'Branding & Identity' },
		{ value: 'community_update', label: 'Community Update' },
		{ value: 'brochure_report', label: 'Brochure/Report' },
		{ value: 'print_collateral', label: 'Print Collateral' },
		{ value: 'video_animation', label: 'Video/Animation' },
		{ value: 'web_development', label: 'Web Development' },
		{ value: 'environmental_graphics', label: 'Environmental Graphics' },
		{ value: 'powerpoint_word', label: 'Powerpoint/Word' },
		{ value: 'accessibility', label: 'Accessibility' },
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
