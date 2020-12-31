import Link from 'next/link';
import { useQuery } from 'react-query';

import { readUserRole } from '../../lib/auth';
import { readAllClients } from '../../lib/clients';

export default function ClientsPage({ allClients, preview }) {
	const userRoleQuery = useQuery('userRole', readUserRole);

	if (userRoleQuery.status !== 'success') {
		return <div>loading...</div>;
	}

	if (userRoleQuery.data !== 'Manager') {
		return <div>Forbidden!</div>;
	}

	return (
		<div>
			<h2>list of all clients</h2>
			{allClients &&
				allClients.map((client) => {
					const { id, client_title, client_code } = client;

					return (
						<div key={id}>
							<h4>Client title: {client_title}</h4>
							<h5>Client code: {client_code}</h5>
							<Link href={`/clients/${id}`}>view</Link>
							<Link href={`/clients/edit/${id}`}>edit</Link>
						</div>
					);
				})}
		</div>
	);
}

export async function getStaticProps({ preview = false }) {
	const allClients = await readAllClients(preview);

	return {
		props: { allClients, preview },
	};
}
