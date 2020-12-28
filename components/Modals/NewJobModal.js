import { useState } from 'react';
import Router from 'next/router';
import { Modal, Button, Form, Input } from 'antd';

import { createJob } from '../../lib/jobs';

export default function NewJobModal() {
	const [visible, setVisible] = useState(false);
	const [form] = Form.useForm();

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	const handleOk = () => {
		form
			.validateFields()
			.then((values) => createJob(values.jobCode))
			.then((job) => {
				console.log('job :>> ', job);

				return job.job_code;
			})
			.then((job_code) => {
				console.log('job_code :>> ', job_code);

				if (job_code) {
					Router.push(`/jobs/update/${job_code}`);
				} else {
					throw new Error('job code not defined');
				}
			})
			.catch((info) => {
				console.log('Validate Failed:', info);
			});
	};

	return (
		<>
			<Button type='primary' onClick={showModal}>
				Create New Job
			</Button>
			<Modal
				title='Create Job Code'
				okText='Create'
				cancelText='Cancel'
				visible={visible}
				onOk={handleOk}
				onCancel={hideModal}
			>
				<Form form={form} name='job_code_form'>
					<Form.Item
						label='Job Code'
						name='jobCode'
						rules={[{ required: true, message: 'Enter job code' }]}
					>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}
