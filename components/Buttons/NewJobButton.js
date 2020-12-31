import Router from 'next/router';
import { Button } from 'antd';

import { createJob } from '../../lib/jobs';

export default function NewJobButton() {
	const handleClick = async () => {
		const { id } = await createJob();
		Router.push(`/jobs/${id}`);
	};

	return (
		<Button type='primary' onClick={() => handleClick()}>
			New Job
		</Button>
	);
}
