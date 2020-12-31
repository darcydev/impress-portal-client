import { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Button } from 'antd';

import { AuthContext } from '../context/AuthContext';
import NewBriefButton from '../components/Buttons/NewBriefButton';
import NewClientButton from '../components/Buttons/NewClientButton';

export default function Home() {
	const { user } = useContext(AuthContext);

	const userRole = user.role?.name || undefined;

	return (
		<div>
			<h1>Home page</h1>
			{userRole === 'Manager' && (
				<>
					<Button type='primary'>
						<Link href='/assets/upload'>Upload Assets</Link>
					</Button>
					<NewBriefButton />
					<Button type='primary'>New Job</Button>
					<NewClientButton />
				</>
			)}
		</div>
	);
}
