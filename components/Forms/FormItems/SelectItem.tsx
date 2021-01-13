import React, { FunctionComponent } from 'react';
import { Select } from 'antd';

import ItemWrapper from './ItemWrapper';

type ComponentProps = {
	name: string;
	label: string;
	placeholder?: string;
	required?: boolean;
	mode?: 'multiple' | 'tags';
	options: { label; value }[];
};

const SelectItem: FunctionComponent<ComponentProps> = ({
	name,
	label,
	placeholder = label,
	required = true,
	mode,
	options,
}) => (
	<ItemWrapper name={name} label={label} required={required}>
		<Select
			placeholder={placeholder}
			mode={mode ? mode : null}
			options={options}
		/>
	</ItemWrapper>
);

export default SelectItem;
