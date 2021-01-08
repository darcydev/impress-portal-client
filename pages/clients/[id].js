import Link from 'next/link';
import { useQuery } from 'react-query';

import { readUserRole } from '../../lib/auth';
import { readAllClients, readClientById } from '../../lib/clients';

export default function Client({ client, preview }) {
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

	const {
		id,
		client_code,
		client_description,
		client_title,
		jobs,
		created_at,
	} = client;

	return (
		<div>
			<h1>Single client page</h1>
			<p>Client code: {client_code}</p>
			<p>Client title: {client_title}</p>
			<p>Client description: {client_description}</p>
			<Link href={`/clients/edit/${id}`}>Edit</Link>
		</div>
	);
}

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
		fallback: true,
	};
}
