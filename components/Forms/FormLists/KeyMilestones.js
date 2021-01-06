import { useState } from 'react';
import styled from 'styled-components';
import { DatePicker, Form, Input, Button, Space, Statistic } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { calculateWorkingDaysFromToday } from '../../../utils/calculateWorkingDays';

const { Item, List } = Form;
const { TextArea } = Input;

const requiredField = [{ required: true, message: 'Required' }];

export default function KeyMilestones() {
	const [workingDays, setWorkingDays] = useState([]);

	const handleDateChange = (fieldKey, endDate) => {
		const today = new Date();
		const workingDaysRemaining = calculateWorkingDaysFromToday(today, endDate);

		setWorkingDays({ ...workingDays, [fieldKey]: workingDaysRemaining });
	};

	return (
		<>
			<h2>Key Milestones</h2>
			<List name='key_milestones'>
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
									<TextArea autoSize placeholder='Description' />
								</Item>
								<Item
									{...field}
									name={[field.name, 'due_date']}
									fieldKey={[field.fieldKey, 'due_date']}
									rules={requiredField}
								>
									<DatePicker
										placeholder='Due date'
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
									<TextArea autoSize placeholder='Comments' />
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
			</List>
		</>
	);
}
