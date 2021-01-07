import { Form } from 'antd';

const { Item } = Form;
const requiredField = [{ required: true, message: 'Required' }];

export default function ItemWrapper({ name, label, required, children }) {
	return (
		<Item name={name} label={label} rules={required ? requiredField : null}>
			{children}
		</Item>
	);
}
