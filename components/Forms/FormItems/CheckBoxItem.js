import { Checkbox, Form } from 'antd';

const { Item } = Form;

export default function CheckBoxItem({ name, label }) {
	return (
		<Item valuePropName='checked' name={name}>
			<Checkbox>{label}</Checkbox>
		</Item>
	);
}
