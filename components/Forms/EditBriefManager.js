import { useState } from 'react';
import styled from 'styled-components';
import {
	DatePicker,
	Form,
	Input,
	Button,
	Select,
	Space,
	Statistic,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import AssetUpload from '../Assets/AssetUpload';
import JobCodeSelect from '../Select/JobCodeSelect';
import { calculateWorkingDaysFromToday } from '../../utils/calculateWorkingDays';

const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;

const requiredField = [{ required: true, message: 'Required' }];

export default function EditBriefManager({ brief }) {
	const [workingDays, setWorkingDays] = useState([]);

	const onFormFinish = (values) => {
		console.log('values :>> ', values);
	};

	const handleDateChange = (fieldKey, endDate) => {
		const today = new Date();
		const workingDaysRemaining = calculateWorkingDaysFromToday(today, endDate);

		setWorkingDays({ ...workingDays, [fieldKey]: workingDaysRemaining });
	};

	return (
		<>
			<StyledForm
				name='edit_brief_manager_form'
				onFinish={onFormFinish}
				scrollToFirstError
			>
				<Item name='date_approved' label='Date Approved'>
					<DatePicker />
				</Item>
				<Item name='brief_title' label='Brief Title'>
					<Input />
				</Item>
				<Item name='job_code' label='Job Code'>
					<JobCodeSelect />
				</Item>
				<Item name='users_permissions_user' label='Key Contact'>
					<Select allowClear>
						<Option value='option_1'>Option 1</Option>
						<Option value='option_2'>Option 2</Option>
						<Option value='option_3'>Option 3</Option>
					</Select>
				</Item>
				<Item name='project_circumstances' label='Project Circumstances'>
					<TextArea autoSize />
				</Item>
				<Item name='audiences' label='Audiences'>
					INSERT TABLE THAT CONVERTS INTO JSON FORMAT
				</Item>
				<Item name='desired_outcomes' label='Desired Outcomes'>
					<TextArea autoSize />
				</Item>
				<Form.List name='key_milestones'>
					{(fields, { add, remove }) => (
						<>
							{fields.map((field) => (
								<Space key={field.key} align='baseline'>
									<Item
										{...field}
										name={[field.name, 'description']}
										fieldKey={[field.fieldKey, 'description']}
										rules={requiredField}
									>
										<Input placeholder='Description' />
									</Item>
									<Item
										{...field}
										name={[field.name, 'due_date']}
										fieldKey={[field.fieldKey, 'due_date']}
										rules={requiredField}
									>
										<DatePicker
											placeholder='Due date'
											allowClear={false}
											format={['DD/MM/YYYY']}
											onChange={(e) => handleDateChange(field.fieldKey, e)}
										/>
									</Item>
									<Item
										{...field}
										name={[field.name, 'comments']}
										fieldKey={[field.fieldKey, 'comments']}
										rules={requiredField}
									>
										<Input placeholder='Comments' />
									</Item>
									<Statistic
										title='Business days'
										value={workingDays[field.fieldKey]}
									/>
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
									Add milestone
								</Button>
							</Item>
						</>
					)}
				</Form.List>
				<Item>
					<Button type='primary' htmlType='submit'>
						Update
					</Button>
				</Item>
			</StyledForm>
			<AssetUpload briefId={brief.id} />
		</>
	);
}

const StyledForm = styled(Form)`
	.form-item-wrp {
		display: flex;
		align-items: center;
		margin: 10px 0;

		.ant-form-item {
			margin: 0 10px 0 0;
			flex: 1;
		}
	}
`;
