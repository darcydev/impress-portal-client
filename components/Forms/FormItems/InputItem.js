import { Input } from 'antd';

import ItemWrapper from './ItemWrapper';

const { TextArea } = Input;

export default function InputItem({
	name,
	label,
	placeholder = label,
	required,
	textarea = false,
}) {
	return (
		<ItemWrapper name={name} label={label} required={required}>
			{textarea ? (
				<TextArea placeholder={label} autoSize={{ minRows: 4, maxRows: 12 }} />
			) : (
				<Input placeholder={placeholder} />
			)}
		</ItemWrapper>
	);
}
