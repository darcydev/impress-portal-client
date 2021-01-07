import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Form, message } from 'antd';

import SubmitButton from '../../../components/Forms/FormItems/SubmitButton';
import { readUserRole } from '../../../lib/auth';
import { readAllJobs, readJobById, updateJob } from '../../../lib/jobs';
import SelectClientCodeItem from '../../../components/Forms/FormItems/SelectClientCodeItem';
import SelectVisibilityRestrictionItem from '../../../components/Forms/FormItems/SelectVisibilityRestrictionItem';
import InputItem from '../../../components/Forms/FormItems/InputItem';

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
		console.log('values :>> ', values);

		const updatedJob = await updateJob(job.id, values);

		console.log('updatedJob :>> ', updatedJob);

		updatedJob
			? message.success('Success')
			: message.fail('Error: failed to update DB');
	};

	const { job_code, client } = job;

	console.log('job :>> ', job);

	return (
		<StyledForm
			name='edit_job_form'
			onFinish={onFormFinish}
			scrollToFirstError
			initialValues={{
				job_code,
				client: client?.id,
				visibility_restriction: job.visibility_restriction,
			}}
		>
			<InputItem name='job_code' label='Job code' required={true} />
			<SelectClientCodeItem required={true} />
			<SelectVisibilityRestrictionItem required={true} />
			<SubmitButton buttonText='Update Client' />
		</StyledForm>
	);
}

const StyledForm = styled(Form)``;

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
