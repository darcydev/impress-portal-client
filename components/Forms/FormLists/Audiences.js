import { Form, Input, Button, Rate, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Item, List } = Form;
const { TextArea } = Input;

const requiredField = [{ required: true, message: 'Required' }];

export default function Audiences() {
	return (
		<List name='audiences'>
			{(fields, { add, remove }) => (
				<>
					{fields.map((field) => (
						<Space key={field.key} align='center'>
							<Item
								{...field}
								name={[field.name, 'priority']}
								fieldKey={[field.fieldKey, 'priority']}
								rules={requiredField}
							>
								<Rate />
							</Item>
							<Item
								{...field}
								name={[field.name, 'description']}
								fieldKey={[field.fieldKey, 'description']}
								rules={requiredField}
							>
								<TextArea autoSize placeholder='Description' />
							</Item>
							<Item
								{...field}
								name={[field.name, 'comments']}
								fieldKey={[field.fieldKey, 'comments']}
								rules={requiredField}
							>
								<TextArea autoSize placeholder='Comments' />
							</Item>
							<MinusCircleOutlined
								onClick={() => {
									remove(field.name);
								}}
							/>
						</Space>
					))}
					<Item>
						<Button
							type='dashed'
							onClick={() => add()}
							block
							icon={<PlusOutlined />}
						>
							Add audience
						</Button>
					</Item>
				</>
			)}
		</List>
	);
}
