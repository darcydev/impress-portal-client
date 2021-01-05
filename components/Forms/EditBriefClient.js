import styled from 'styled-components';
import { Form, Input, message } from 'antd';

import { updateBrief } from '../../lib/briefs';
import SubmitButton from './FormItems/SubmitButton';

const { Item } = Form;
const { TextArea } = Input;

export default function EditBriefClient({ brief }) {
	console.log('brief :>> ', brief);

	const onFormFinish = async (values) => {
		const updatedBrief = await updateBrief(brief.id, values);

		if (updatedBrief) {
			message.success('Success!');
		} else {
			message.fail('Oops! Something went wrong');
		}
	};

	const {
		brief_project_circumstances,
		brief_project_circumstances_visible,
		brief_desired_outcomes,
		brief_desired_outcomes_visible,
		brief_design_direction,
		brief_design_direction_visible,
		brief_project_delivery,
		brief_project_delivery_visible,
	} = brief;

	return (
		<StyledForm
			name='edit_brief_client_form'
			onFinish={onFormFinish}
			initialValues={{
				brief_project_circumstances,
				brief_desired_outcomes,
				brief_design_direction,
				brief_project_delivery,
			}}
		>
			{brief_project_circumstances_visible && (
				<Item name='brief_project_circumstances' label='Project Circumstances'>
					<TextArea rows={4} />
				</Item>
			)}
			{brief_desired_outcomes_visible && (
				<Item name='brief_desired_outcomes' label='Desired Outcomes'>
					<TextArea rows={4} />
				</Item>
			)}
			{brief_design_direction_visible && (
				<Item name='brief_design_direction' label='Design Direction'>
					<TextArea rows={4} />
				</Item>
			)}
			{brief_project_delivery_visible && (
				<Item name='brief_project_delivery' label='Project Delivery Specifics'>
					<TextArea rows={4} />
				</Item>
			)}
			<SubmitButton />
		</StyledForm>
	);
}

const StyledForm = styled(Form)`
	.ant-form-item {
		display: flex;
		flex-direction: column;
		align-items: start;
		margin: 20px 0;
		flex: 1;

		.ant-form-item-label {
			label {
				font-size: 18px;
				font-weight: 600;

				::after {
					display: none;
				}
			}
		}

		.ant-form-item-control {
			width: 100%;
		}
	}
`;
