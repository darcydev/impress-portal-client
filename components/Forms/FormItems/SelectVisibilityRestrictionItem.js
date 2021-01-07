import { Select } from 'antd';

const { Option } = Select;

import ItemWrapper from './ItemWrapper';

export default function SelectVisibilityRestrictionItem({
	name = 'visibility_restriction',
	label,
	placeholder,
	required = false,
}) {
	return (
		<ItemWrapper name={name} label={label} required={required}>
			<Select placeholder={placeholder}>
				<Option value='unrestricted'>Unrestricted</Option>
				<Option value='restricted_to_client'>Restricted to Client</Option>
				<Option value='restricted_within_client'>
					Restricted within Client
				</Option>
			</Select>
		</ItemWrapper>
	);
}
