import { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { isLoggedIn } from '../lib/auth';
import { AuthContext } from '../context/AuthContext';

import ThemeToggler from './ThemeToggler';
import NewJobModal from './Modals/NewJobModal';
import LogoutButton from './Buttons/LogoutButton';

export default function Header() {
	const { user } = useContext(AuthContext);
	const isAuth = isLoggedIn();

	const userRole = user.role?.name || undefined;

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
								<Link href='/jobs'>Jobs</Link>
							</li>
							<li>
								<Link href='/assets'>Assets</Link>
							</li>
							{(userRole === 'Authenticated' || userRole === 'Manager') && (
								<li>
									<Link href='/assets/upload'>Upload Assets</Link>
								</li>
							)}
							{(userRole === 'Authenticated' || userRole === 'Manager') && (
								<li>
									<NewJobModal modalBtnTxt='Start New Brief' />
								</li>
							)}
							<li>
								<LogoutButton />
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
