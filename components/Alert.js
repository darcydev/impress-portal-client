import { Alert } from 'antd';

export default function AlertComponent({
	message = 'Lorem ipsum',
	description = 'Ea consequat veniam culpa enim.',
	type = 'info',
	showIcon = true,
	closable = true,
}) {
	return (
		<Alert
			message={message}
			description={description}
			type={type}
			showIcon={showIcon}
			closable={closable}
		/>
	);
}
