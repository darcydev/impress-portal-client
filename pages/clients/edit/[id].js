import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Form, message } from 'antd';

import SubmitButton from '../../../components/Forms/FormItems/SubmitButton';
import { readUserRole } from '../../../lib/auth';
import {
	readAllClients,
	readClientById,
	updateClient,
} from '../../../lib/clients';
import InputItem from '../../../components/Forms/FormItems/InputItem';

export default function EditClient({ client, preview }) {
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

		const updatedClient = await updateClient(client.id, values);

		console.log('updatedClient :>> ', updatedClient);

		if (updatedClient) {
			message.success('Updated');
		} else {
			message.fail('Updated failed');
		}
	};

	const { client_code, client_description, client_title } = client;

	console.log('client :>> ', client);

	return (
		<StyledForm
			name='edit_client_form'
			onFinish={onFormFinish}
			initialValues={{
				client_code,
				client_title,
				client_description,
			}}
		>
			<InputItem name='client_code' label='Client code' required={true} />
			<InputItem name='client_title' label='Client full name' required={true} />
			<InputItem
				name='client_description'
				label='Client description'
				textarea={true}
			/>
			<SubmitButton buttonText='Update Client' />
		</StyledForm>
	);
}

const StyledForm = styled(Form)``;

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
