import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Form, Input, Button, message } from 'antd';

import { readUserRole } from '../../../lib/auth';
import {
	readAllClients,
	readClientById,
	updateClient,
} from '../../../lib/clients';

export default function EditClient({ client, preview, params }) {
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
		const updatedClient = await updateClient(client.id, values);

		if (updatedClient) {
			message.success('Updated');
		} else {
			message.fail('Updated failed');
		}
	};

	const { client_code, client_description, client_title, jobs } = client;

	return (
		<div>
			<h1>Edit single client page</h1>
			<StyledForm
				name='edit_client_form'
				onFinish={onFormFinish}
				scrollToFirstError
				initialValues={{
					['client_code']: client_code,
					['client_name']: client_title,
					['client_description']: client_description,
				}}
			>
				<Form.Item name='client_code' label='Client code'>
					<Input />
				</Form.Item>
				<Form.Item name='client_name' label='Client name'>
					<Input />
				</Form.Item>
				<Form.Item name='client_description' label='Client description'>
					<Input.TextArea autoSize={{ minRows: 2, maxRows: 8 }} />
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
	const client = await readClientById(params.id, preview);

	return {
		props: {
			client,
			preview,
		},
	};
}

export async function getStaticPaths() {
	const allClients = await readAllClients();

	const paths = allClients.map((client) => ({
		params: {
			id: client.id.toString(),
		},
	}));

	return {
		paths,
		fallback: false,
	};
}
