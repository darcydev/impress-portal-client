import { Form, Input, Button, message } from 'antd';

import { loginUser } from '../../lib/auth';

export const LoginForm = () => {
	const onSubmit = async (values) => {
		const loggedInUser = await loginUser(values);

		if (loggedInUser) {
			message.success('Login successful');
		} else {
			message.fail('Login failed');
		}
	};

	return (
		<Form name='basic' initialValues={{ remember: true }} onFinish={onSubmit}>
			<Form.Item
				label='Email'
				name='email'
				rules={[{ required: true, message: 'Email required' }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label='Password'
				name='password'
				rules={[{ required: true, message: 'Please input your password!' }]}
			>
				<Input.Password />
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Login
				</Button>
			</Form.Item>
		</Form>
	);
};
