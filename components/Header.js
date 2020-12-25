import styled from 'styled-components';
import Link from 'next/link';

import { NavBar } from './NavBar';

import ThemeToggler from './ThemeToggler';

export default function Header() {
	return (
		<StyledHeader>
			<div className='logo-wrp'>
				<Link href='/'>Impress Portal</Link>
				<ThemeToggler />
			</div>
			<div className='nav-wrp'>
				<NavBar />
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
