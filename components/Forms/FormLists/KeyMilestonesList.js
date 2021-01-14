import { useState } from 'react';
import styled from 'styled-components';
import { DatePicker, Form, Input, Button, Statistic } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { getWorkingDays } from '../../../utils/getWorkingDays';

const { Item, List } = Form;
const { TextArea } = Input;

const requiredField = [{ required: true, message: 'Required' }];

export default function KeyMilestonesList() {
	const [workingDays, setWorkingDays] = useState([]);

	const handleDateChange = (fieldKey, endDate) => {
		const today = new Date();

		const workingDaysFromNewDate = getWorkingDays(today, endDate);

		setWorkingDays({ ...workingDays, [fieldKey]: workingDaysFromNewDate });
	};

	return (
		<>
			<StyledHeader>Key Milestones</StyledHeader>
			<List name='key_milestones'>
				{(fields, { add, remove }) => (
					<>
						{fields.map((field) => (
							<StyledFormListItem key={field.key}>
								<div className='milestone-item'>
									<Item
										{...field}
										name={[field.name, 'description']}
										fieldKey={[field.fieldKey, 'description']}
										rules={requiredField}
									>
										<TextArea autoSize placeholder='Description' />
									</Item>
								</div>
								<div className='milestone-item'>
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
								</div>
								<div className='milestone-item'>
									<Item
										{...field}
										name={[field.name, 'comments']}
										fieldKey={[field.fieldKey, 'comments']}
										rules={requiredField}
									>
										<TextArea autoSize placeholder='Comments' />
									</Item>
								</div>
								<div className='milestone-item'>
									<Statistic
										title='Business days'
										value={workingDays[field.fieldKey]}
									/>
								</div>
								<div className='milestone-item'>
									<MinusCircleOutlined
										onClick={() => {
											remove(field.name);
										}}
									/>
								</div>
							</StyledFormListItem>
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

const StyledHeader = styled.h3`
	font-size: 16px;
	font-weight: 500;
`;

const StyledFormListItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	.milestone-item {
		.ant-form-item {
			.ant-form-item-control-input {
				width: 300px;
			}

			.ant-picker {
				width: 100%;
			}
		}

		.ant-statistic {
			text-align: center;

			.ant-statistic-title {
				margin: 0;
			}
		}
	}
`;
