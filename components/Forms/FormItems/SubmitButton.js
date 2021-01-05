import { Form, Button } from 'antd';

const { Item } = Form;

export default function SubmitButton({
	buttonType = 'primary',
	buttonText = 'Submit',
}) {
	return (
		<Item>
			<Button type={buttonType} htmlType='submit'>
				{buttonText}
			</Button>
		</Item>
	);
}
