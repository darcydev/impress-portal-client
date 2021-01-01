import { useState } from 'react';
import Router from 'next/router';
import { Button } from 'antd';

import { createJob } from '../../lib/jobs';

export default function NewJobButton() {
	const [loading, setLoading] = useState(false);

	const handleClick = async () => {
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
		}, 2000);

		const { id } = await createJob();
		Router.push(`/jobs/${id}`);
	};

	return (
		<Button type='primary' onClick={() => handleClick()} loading={loading}>
			New Job
		</Button>
	);
}
