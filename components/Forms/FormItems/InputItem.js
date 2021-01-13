import { Input } from 'antd';

import ItemWrapper from './ItemWrapper';

const { TextArea, Password } = Input;

export const InputItem = ({
	name,
	label,
	placeholder = label,
	required = true,
}) => (
	<ItemWrapper name={name} label={label} required={required}>
		<Input placeholder={placeholder} />
	</ItemWrapper>
);

export const PasswordItem = ({ name, label, required = true }) => (
	<ItemWrapper name={name} label={label} required={required}>
		<Password />
	</ItemWrapper>
);

export const TextAreaItem = ({
	name,
	label,
	placeholder = label,
	required,
}) => (
	<ItemWrapper name={name} label={label} required={required}>
		<TextArea
			placeholder={placeholder}
			autoSize={{ minRows: 4, maxRows: 12 }}
		/>
	</ItemWrapper>
);
