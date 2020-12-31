import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Form, Input, Button, message } from 'antd';

import { readUserRole } from '../../../lib/auth';
import { readAllJobs, readJobById, updateJob } from '../../../lib/jobs';

export default function EditJob({ job, preview }) {
	const userRoleQuery = useQuery('userRole', readUserRole);

	if (userRoleQuery.status === 'error') {
		return <div>error...</div>;
	}

	if (userRoleQuery.status === 'loading') {
		return <div>loading...</div>;
	}

	if (userRoleQuery.data !== 'Manager') {
		return <p>forbidden...</p>;
	}

	const onFormFinish = async (values) => {
		const updatedJob = await updateJob(job.id, values);

		if (updatedJob) {
			message.success('Updated');
		} else {
			message.fail('Updated failed');
		}
	};

	const { job_code } = job;

	return (
		<div>
			<h1>Edit single job page</h1>
			<StyledForm
				name='edit_job_form'
				onFinish={onFormFinish}
				scrollToFirstError
				initialValues={{
					['job_code']: job_code,
				}}
			>
				<Form.Item name='job_code' label='Job code'>
					<Input />
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Edit
					</Button>
				</Form.Item>
			</StyledForm>
		</div>
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

export async function getStaticProps({ params, preview = false }) {
	const job = await readJobById(params.id, preview);

	return {
		props: {
			job,
			preview,
		},
	};
}

export async function getStaticPaths() {
	const allJobs = await readAllJobs();

	const paths = allJobs.map((job) => ({
		params: {
			id: job.id.toString(),
		},
	}));

	return {
		paths,
		fallback: false,
	};
}
