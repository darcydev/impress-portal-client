import { Form, Input, Button, Rate } from 'antd';
import styled from 'styled-components';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Item, List } = Form;
const { TextArea } = Input;

const requiredField = [{ required: true, message: 'Required' }];

export default function Audiences() {
	return (
		<>
			<StyledHeader>Audiences</StyledHeader>
			<List name='audiences'>
				{(fields, { add, remove }, { errors }) => (
					<>
						{fields.map((field, index) => (
							<StyledFormListItem key={field.key}>
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
							</StyledFormListItem>
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
							<Form.ErrorList errors={errors} />
						</Item>
					</>
				)}
			</List>
		</>
	);
}

const StyledHeader = styled.h3`
	font-size: 16px;
	font-weight: 500;
`;

const StyledFormListItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	.ant-form-item {
		text-align: center;
	}
`;
