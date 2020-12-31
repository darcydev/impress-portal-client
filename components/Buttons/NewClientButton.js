import Router from 'next/router';
import { Button } from 'antd';

import { createClient } from '../../lib/clients';

export default function NewClientButton() {
	const handleClick = async () => {
		const { id } = await createClient();
		Router.push(`/clients/${id}`);
	};

	return (
		<Button type='primary' onClick={() => handleClick()}>
			New Client
		</Button>
	);
}
