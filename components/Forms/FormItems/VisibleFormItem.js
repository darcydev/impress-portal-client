import styled from 'styled-components';
import { Switch, Form } from 'antd';

const { Item } = Form;

export default function VisibleFormItem({ name, label, children }) {
	return (
		<StyledContainer>
			<div className='input-wrp'>
				<Item name={name} label={label}>
					{children}
				</Item>
			</div>
			<div className='switch-wrp'>
				<Item name={`${name}_visible`}>
					<Switch checkedChildren='Visible' unCheckedChildren='Hidden' />
				</Item>
			</div>
		</StyledContainer>
	);
}

const StyledContainer = styled.div`
	display: flex;
	align-items: center;

	.input-wrp {
		flex: 1;
		margin-right: 20px;
	}

	.switch-wrp {
		.ant-form-item {
			.ant-form-item-label {
				label {
					font-size: 16px;
					font-weight: 400;
				}
			}
		}
	}
`;
