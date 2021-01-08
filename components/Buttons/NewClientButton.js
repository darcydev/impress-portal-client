import { useState } from 'react';
import Router from 'next/router';
import { Button } from 'antd';

import { createClient } from '../../lib/clients';

export default function NewClientButton() {
	const [loading, setLoading] = useState(false);

	const handleClick = async () => {
		setLoading(true);

		const { id } = await createClient();

		setTimeout(() => {
			setLoading(false);
			Router.push(`/clients/edit/${id}`);
		}, 2000);
	};

	return (
		<Button type='primary' onClick={() => handleClick()} loading={loading}>
			New Client
		</Button>
	);
}
