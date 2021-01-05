import styled from 'styled-components';
import { Checkbox, Form } from 'antd';

const { Item } = Form;

export default function CheckBoxItem({ name, label }) {
	return (
		<StyledItem name={name} label={label}>
			<Checkbox />
		</StyledItem>
	);
}

const StyledItem = styled(Item)`
	display: flex;
	flex-direction: row !important;

	.ant-form-item-label {
		margin-right: 20px;

		label {
			font-size: 16px !important;
			font-weight: 400 !important;
		}
	}

	.ant-form-item-control {
		width: unset !important;
	}
`;
