import { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Alert, DatePicker, Form, Input, Button, Select, Switch } from 'antd';

import { readAllJobs } from '../../lib/jobs';
import { readAllBriefs, updateBrief } from '../../lib/briefs';

const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;

export default function EditBriefManager({ brief }) {
	const [fileList, setFileList] = useState([]);
	const [formValues, setFormValues] = useState({
		jobType: undefined,
		jobDesc: '',
	});

	const jobsQuery = useQuery('jobs', readAllJobs);

	console.log('jobsQuery :>> ', jobsQuery);

	const jobCodeOptions =
		jobsQuery.status === 'success'
			? jobsQuery.data
					.filter((job) => job.job_code !== null)
					.map((job) => job.job_code)
			: [];

	console.log('jobCodeOptions :>> ', jobCodeOptions);

	const onFormFinish = (values) => {
		const formValues = { ...values, job_code: job.job_code };
		console.log('formValues :>> ', formValues);

		// updateJob(formValues);
	};

	return (
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
				<Select allowClear>
					<Option value='option_1'>Option 1</Option>
					<Option value='option_2'>Option 2</Option>
					<Option value='option_3'>Option 3</Option>
				</Select>
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
			<Item>
				<Button type='primary' htmlType='submit'>
					Update
				</Button>
			</Item>
		</StyledForm>
	);

	/* 	return (
		<StyledForm
			name='edit_brief_manager_form'
			onFinish={onFormFinish}
			scrollToFirstError
		>
			{jobCodeOptions.length && (
				<div className='form-item-wrp'>
					<Item label='Job Code' name='job_code'>
						<Select
							placeholder='Job Code'
							allowClear
							defaultValue={job.job_code}
						>
							{jobCodeOptions.map((jobCode) => (
								<Option value={jobCode}>{jobCode}</Option>
							))}
						</Select>
					</Item>
					<Switch
						checkedChildren='Visible'
						unCheckedChildren='Hidden'
						defaultUnChecked
						disabled
					/>
				</div>
			)}
			<div className='form-item-wrp'>
				<Item
					label='Job Type'
					name='job_type'
					rules={[{ required: true, message: 'Required' }]}
				>
					<Select
						placeholder='Job Type'
						allowClear
						defaultValue={job.job_type}
						onChange={(e) => setFormValues({ ...formValues, jobType: e })}
					>
						<Option value='job_type_1'>Job Type 1</Option>
						<Option value='job_type_2'>Job Type 2</Option>
						<Option value='job_type_3'>Job Type 3</Option>
					</Select>
				</Item>
				<Item name='job_type_visible'>
					<Switch
						checkedChildren='Visible'
						unCheckedChildren='Hidden'
						defaultChecked={job.job_type_visible}
					/>
				</Item>
			</div>
			{formValues.jobType === 'job_type_1' && (
				<Alert
					message='Informational Notes about Job Type 1'
					description='Additional description and information about this job type.'
					type='info'
					showIcon
					closable
				/>
			)}
			<div className='form-item-wrp'>
				<Item label='Job Description' name='job_desc'>
					<Input.TextArea
						rows={6}
						allowClear
						defaultValue={job.job_description}
						onChange={(e) =>
							setFormValues({ ...formValues, jobDesc: e.target.value })
						}
					/>
				</Item>
				<Item name='job_desc_visible'>
					<Switch
						checkedChildren='Visible'
						unCheckedChildren='Hidden'
						defaultChecked={job.job_description_visible}
					/>
				</Item>
			</div>
			<Item>
				<Button type='primary' htmlType='submit'>
					Update
				</Button>
			</Item>
		</StyledForm> 
	);*/
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
