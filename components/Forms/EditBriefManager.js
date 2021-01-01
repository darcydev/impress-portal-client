import { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Alert, DatePicker, Form, Input, Button, Select, Switch } from 'antd';

import { readAllJobs } from '../../lib/jobs';
import { readAllBriefs, updateBrief } from '../../lib/briefs';
import AssetUpload from '../Assets/AssetUpload';

const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;

export default function EditBriefManager({ brief }) {
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
			<AssetUpload />
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
