import { useState } from 'react';
import Router from 'next/router';
import { Button } from 'antd';

import { createClient } from '../../lib/clients';

export default function NewClientButton() {
	const [loading, setLoading] = useState(false);

	const handleClick = async () => {
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
		}, 2000);

		const { id } = await createClient();
		Router.push(`/clients/${id}`);
	};

	return (
		<Button type='primary' onClick={() => handleClick()} loading={loading}>
			New Client
		</Button>
	);
}
