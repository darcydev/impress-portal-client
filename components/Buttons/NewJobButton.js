import { useState } from 'react';
import Router from 'next/router';
import { Button } from 'antd';

import { createJob } from '../../lib/jobs';

export default function NewJobButton() {
	const [loading, setLoading] = useState(false);

	const handleClick = async () => {
		setLoading(true);

		const { id } = await createJob();

		setTimeout(() => {
			setLoading(false);
			Router.push(`/jobs/edit/${id}`);
		}, 2000);
	};

	return (
		<Button type='primary' onClick={() => handleClick()} loading={loading}>
			New Job
		</Button>
	);
}
