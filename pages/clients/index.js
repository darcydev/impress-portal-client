import Link from 'next/link';
import Router from 'next/router';

import { isLoggedIn } from '../../lib/auth';
import { readAllClients } from '../../lib/clients';

export default function ClientsPage({ allClients, preview }) {
	// process.browser makes sure that the browser is running client-side
	if (process.browser && !isLoggedIn()) {
		Router.push('/');
		return null;
	}

	return (
		<div>
			<h2>list of all clients</h2>
			{allClients &&
				allClients.map((client) => {
					const { id, client_code } = client;

					return (
						<div key={id}>
							<h4>Client title</h4>
							<h5>{client_code}</h5>
							<Link href={`/clients/${client_code}`}>view</Link>
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
