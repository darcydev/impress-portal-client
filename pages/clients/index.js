import Link from 'next/link';
import { useQuery } from 'react-query';

import ClientsTable from '../../components/Tables/ClientsTable';
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

	return <ClientsTable data={allClients} />;
}

export async function getStaticProps({ preview = false }) {
	const allClients = await readAllClients(preview);

	return {
		props: { allClients, preview },
	};
}
