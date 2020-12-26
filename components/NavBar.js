import Link from 'next/link';
import styled from 'styled-components';
import { Button } from 'antd';

import { isLoggedIn, logoutUser } from '../lib/auth';

export const NavBar = () => {
	const isAuth = isLoggedIn();

	return (
		<StyledNav>
			{isAuth ? (
				<ul>
					<li>
						<Link href='/clients'>Clients</Link>
					</li>
					<li>
						<Link href='/assets'>Assets</Link>
					</li>
					<li>
						<Link href='/assets/upload'>Upload Assets</Link>
					</li>
					<li>
						<Button type='primary' onClick={() => logoutUser()}>
							Logout
						</Button>
					</li>
				</ul>
			) : (
				<ul>
					<li>
						<Link href='/login'>Login</Link>
					</li>
				</ul>
			)}
		</StyledNav>
	);
};

const StyledNav = styled.nav`
	ul {
		list-style: none;
		display: flex;
		align-items: center;
		padding: 0;
		margin: 0;

		li {
			margin: 0 15px;
		}
	}
`;
