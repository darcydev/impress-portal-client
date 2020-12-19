import styled from 'styled-components';

import { LoginForm } from '../components/Forms/LoginForm';

export default function LoginPage() {
	return (
		<div>
			<Title>Login</Title>
			<LoginForm />
		</div>
	);
}

const Title = styled.h1`
	font-size: 50px;
	color: ${({ theme }) => theme.colors.primary};
`;
