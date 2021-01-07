import { Select } from 'antd';

import ItemWrapper from './ItemWrapper';

export default function SelectAssetTags({
	name,
	label,
	required,
	mode = 'multiple',
}) {
	// TODO fetch from API
	const options = [];
	for (let i = 0; i < 30; i++) {
		const value = `${i.toString(36)}${i}`;
		options.push({
			value,
			disabled: i === 10,
		});
	}

	return (
		<ItemWrapper name={name} label={label} required={required}>
			<Select
				showSearch
				allowClear
				placeholder='Select Job Type'
				mode={mode}
				options={options}
			/>
		</ItemWrapper>
	);
}
