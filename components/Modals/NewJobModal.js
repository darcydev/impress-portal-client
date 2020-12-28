import { useState } from 'react';
import Router from 'next/router';
import { Modal, Button, Form, Input } from 'antd';

import { createJob } from '../../lib/jobs';

export default function NewJobModal({ modalBtnTxt = 'Create New Job' }) {
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [form] = Form.useForm();

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	const handleOk = () => {
		setLoading(true);

		form
			.validateFields()
			.then((values) => createJob(values.jobCode))
			.then((job) => job.job_code)
			.then((job_code) => {
				if (job_code) {
					setTimeout(() => {
						setLoading(false);
						Router.push(`/jobs/update/${job_code}`);
						form.resetFields();
						setVisible(false);
					}, 1000);
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
				{modalBtnTxt}
			</Button>
			<Modal
				title='Create Job Code'
				okText='Create Job'
				cancelText='Cancel'
				visible={visible}
				onOk={handleOk}
				onCancel={hideModal}
				confirmLoading={loading}
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
