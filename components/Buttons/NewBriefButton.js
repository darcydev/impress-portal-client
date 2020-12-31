import Router from 'next/router';
import { Button } from 'antd';

import { createBrief } from '../../lib/briefs';

export default function NewBriefButton() {
	const handleClick = async () => {
		const { id } = await createBrief();
		Router.push(`/briefs/${id}`);
	};

	return (
		<Button type='primary' onClick={() => handleClick()}>
			New Brief
		</Button>
	);
}
