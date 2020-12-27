import Link from 'next/link';
import styled from 'styled-components';
import { Button } from 'antd';

import { isLoggedIn, logoutUser } from '../lib/auth';

import ThemeToggler from './ThemeToggler';

export default function Header() {
	const isAuth = isLoggedIn();

	return (
		<StyledHeader>
			<div className='logo-wrp'>
				<Link href='/'>Impress Portal</Link>
			</div>
			<div className='nav-wrp'>
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
							<li>
								<ThemeToggler />
							</li>
						</ul>
					) : (
						<ul>
							<li>
								<Link href='/login'>Login</Link>
							</li>
							<li>
								<ThemeToggler />
							</li>
						</ul>
					)}
				</StyledNav>
			</div>
		</StyledHeader>
	);
}

const StyledHeader = styled.header`
	padding: 30px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: ${(props) => props.theme.colors.bg};
`;

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
