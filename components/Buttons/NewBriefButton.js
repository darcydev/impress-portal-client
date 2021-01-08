import { useState } from 'react';
import Router from 'next/router';
import { Button } from 'antd';

import { createBrief } from '../../lib/briefs';

export default function NewBriefButton() {
	const [loading, setLoading] = useState(false);

	const handleClick = async () => {
		setLoading(true);

		const { id } = await createBrief();

		setTimeout(() => {
			setLoading(false);
			Router.push(`/briefs/edit/${id}`);
		}, 2000);
	};

	return (
		<Button type='primary' onClick={() => handleClick()} loading={loading}>
			New Brief
		</Button>
	);
}
