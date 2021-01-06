import { DatePicker, Form } from 'antd';

const { Item } = Form;

export default function DatePickerItem({ name, label }) {
	return (
		<Item name={name} label={label}>
			<DatePicker format={'DD/MM/YYYY'} />
		</Item>
	);
}
