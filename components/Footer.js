import styled from 'styled-components';

export default function Footer() {
	return (
		<StyledFooter>
			<div className='logo-wrp'>Impress Portal</div>
			<div className='nav-wrp'></div>
		</StyledFooter>
	);
}

const StyledFooter = styled.footer`
	padding: 50px 25px;
	background: #efefef;
`;
