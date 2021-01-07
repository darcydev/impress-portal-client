import { Input } from 'antd';

import ItemWrapper from './ItemWrapper';

export default function InputItem({ name, label, required }) {
	return (
		<ItemWrapper name={name} label={label} required={required}>
			<Input />
		</ItemWrapper>
	);
}
