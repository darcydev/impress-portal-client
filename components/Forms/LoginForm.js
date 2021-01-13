import { Form, message } from 'antd';

import { InputItem, PasswordItem } from './FormItems/InputItem';
import SubmitButton from './FormItems/SubmitButton';
import { loginUser } from '../../lib/auth';

export const LoginForm = () => {
	const [form] = Form.useForm();

	const onSubmit = async (values) => {
		const loggedInUser = await loginUser(values);

		if (loggedInUser) {
			message.success('Login successful');
		} else {
			message.error('Login failed');
		}
	};

	return (
		<Form form={form} name='login_form' onFinish={onSubmit}>
			<InputItem
				name='email'
				label='Email'
				placeholder='Email'
				required={true}
			/>
			<PasswordItem
				name='password'
				label='Password'
				placeholder='Password'
				required={true}
			/>
			<SubmitButton />
		</Form>
	);
};
