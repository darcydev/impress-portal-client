import { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Alert, Form, Input, Button, Select, Switch } from 'antd';

import { updateJob, readAllJobs } from '../../lib/jobs';

const { Option } = Select;

export default function BriefingFormStudio({ job }) {
	const [fileList, setFileList] = useState([]);
	const [formValues, setFormValues] = useState({
		jobType: undefined,
		jobDesc: '',
	});

	const jobsQuery = useQuery('jobs', readAllJobs);

	const jobCodeOptions =
		jobsQuery.status === 'success'
			? jobsQuery.data.data.map((job) => job.job_code)
			: [];

	const onFinish = (values) => {
		const formValues = { ...values, job_code: job.job_code };
		console.log('formValues :>> ', formValues);

		// updateJob(formValues);
	};

	return (
		<StyledForm name='brief_form' onFinish={onFinish} scrollToFirstError>
			{jobCodeOptions.length && (
				<div className='form-item-wrp'>
					<Form.Item label='Job Code' name='job_code'>
						<Select
							placeholder='Job Code'
							allowClear
							defaultValue={job.job_code}
						>
							{jobCodeOptions.map((jobCode) => (
								<Option value={jobCode}>{jobCode}</Option>
							))}
						</Select>
					</Form.Item>
					<Switch
						checkedChildren='Visible'
						unCheckedChildren='Hidden'
						defaultUnChecked
						disabled
					/>
				</div>
			)}
			<div className='form-item-wrp'>
				<Form.Item
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
				</Form.Item>
				<Form.Item name='job_type_visible'>
					<Switch
						checkedChildren='Visible'
						unCheckedChildren='Hidden'
						defaultChecked={job.job_type_visible}
					/>
				</Form.Item>
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
				<Form.Item label='Job Description' name='job_desc'>
					<Input.TextArea
						rows={6}
						allowClear
						defaultValue={job.job_description}
						onChange={(e) =>
							setFormValues({ ...formValues, jobDesc: e.target.value })
						}
					/>
				</Form.Item>
				<Form.Item name='job_desc_visible'>
					<Switch
						checkedChildren='Visible'
						unCheckedChildren='Hidden'
						defaultChecked={job.job_description_visible}
					/>
				</Form.Item>
			</div>
			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Update
				</Button>
			</Form.Item>
		</StyledForm>
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
