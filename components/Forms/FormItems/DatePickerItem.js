import { DatePicker } from 'antd';

import ItemWrapper from './ItemWrapper';

export default function DatePickerItem({ name, label }) {
	return (
		<ItemWrapper name={name} label={label}>
			<DatePicker format={'DD/MM/YYYY'} />
		</ItemWrapper>
	);
}
