import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Input, Button, Select, Upload } from 'antd';

const { Option } = Select;

import { readAllJobs, readJobByJobCode } from '../../../lib/jobs';
import AssetUpload from '../../../components/Assets/AssetUpload';

export default function Brief({ job, preview }) {
	const [fileList, setFileList] = useState([]);
	const router = useRouter();

	const onFinish = (values) => {
		console.log('values :>> ', values);
	};

	console.log('job :>> ', job);

	const { id, job_code } = job;

	if (job) {
		return (
			<div>
				<h1>Brief</h1>
				<div className='form-wrp'>
					<Form name='brief_form' onFinish={onFinish} scrollToFirstError>
						<Form.Item label='Job Code' name='job_code'>
							<Input defaultValue={job_code} disabled={true} />
						</Form.Item>
						<Form.Item
							label='Job Type'
							name='job_type'
							rules={[{ required: true }]}
						>
							<Select placeholder='Job Type' allowClear>
								<Option value='job_type_1'>Job Type 1</Option>
								<Option value='job_type_2'>Job Type 2</Option>
								<Option value='job_type_3'>Job Type 3</Option>
							</Select>
						</Form.Item>
						<Form.Item
							label='Job Description'
							name='job_desc'
							rules={[{ required: true }]}
						>
							<Input />
						</Form.Item>
						<Form.Item>
							<Button type='primary' htmlType='submit'>
								Create Brief
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		);
	}
}

export async function getStaticProps({ params, preview = false }) {
	const job = await readJobByJobCode(params.jobCode, preview);

	return {
		props: { job, preview },
	};
}

export async function getStaticPaths() {
	const allJobs = await readAllJobs();

	// Get the paths we want to pre-render based on posts
	const paths = allJobs.data.map((job) => ({
		params: { jobCode: job.job_code },
	}));

	return {
		paths,
		fallback: false,
	};
}
