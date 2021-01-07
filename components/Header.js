import Link from 'next/link';
import styled from 'styled-components';

import { isLoggedIn } from '../lib/auth';

import LogoutButton from './Buttons/LogoutButton';

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
								<Link href='/assets'>Assets</Link>
							</li>
							<li>
								<Link href='/briefs'>Briefs</Link>
							</li>
							<li>
								<Link href='/jobs'>Jobs</Link>
							</li>
							<li>
								<Link href='/clients'>Clients</Link>
							</li>
							<li>
								<LogoutButton />
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
			</div>
		</StyledHeader>
	);
}

const StyledHeader = styled.header`
	padding: 30px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #efefef;
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
