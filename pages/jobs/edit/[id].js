import { useState } from 'react';
import { useQuery } from 'react-query';
import { Form, message } from 'antd';

import SubmitButton from '../../../components/Forms/FormItems/SubmitButton';
import { readUserRole } from '../../../lib/auth';
import { readAllJobs, readJobById, updateJob } from '../../../lib/jobs';
import SelectClientCodeItem from '../../../components/Forms/FormItems/SelectClientCodeItem';
import SwitchRestrictionItem from '../../../components/Forms/FormItems/SwitchRestrictionItem';
import { InputItem } from '../../../components/Forms/FormItems/InputItem';
import AssetUploadForm from '../../../components/Forms/AssetUploadForm';

export default function EditJob({ job, preview }) {
	const [formValues, setFormValues] = useState({});
	const [form] = Form.useForm();

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

		updatedJob
			? message.success('Success')
			: message.fail('Error: failed to update DB');
	};

	const { job_code, client, visibility_restriction } = job;

	return (
		<>
			<Form
				form={form}
				name='edit_job_form'
				onFinish={onFormFinish}
				onFieldsChange={() => setFormValues(form.getFieldsValue())}
				initialValues={{
					job_code,
					client: client?.id,
					visibility_restriction,
				}}
			>
				<InputItem name='job_code' label='Job code' />
				<SelectClientCodeItem required={true} />
				<SwitchRestrictionItem />
				<SubmitButton buttonText='Update Job' />
			</Form>
			<AssetUploadForm jobId={job.id} />
		</>
	);
}

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
		fallback: true,
	};
}
