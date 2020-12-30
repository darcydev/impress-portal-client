import Router from 'next/router';
import { Button } from 'antd';
import Cookie from 'js-cookie';

import { createBrief } from '../../lib/briefs';

export default function NewBriefButton() {
	const token = Cookie.get('token');

	const handleClick = async () => {
		const { id } = await createBrief();

		setTimeout(() => {
			Router.push(`/briefs/${id}`);
		}, 1000);
	};

	return (
		<Button type='primary' onClick={() => handleClick()}>
			Start Brief
		</Button>
	);
}
