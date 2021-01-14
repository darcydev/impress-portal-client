import { useState } from 'react';
import styled from 'styled-components';
import { Form, message } from 'antd';

import RichTextWrapper from '../../../RichTextWrapper';
import AudiencesList from '../../FormLists/AudiencesList';
import KeyMilestonesList from '../../FormLists/KeyMilestonesList';
import CheckBoxItem from '../../FormItems/CheckBoxItem';
import SubmitButton from '../../FormItems/SubmitButton';
import DatePickerItem from '../../FormItems/DatePickerItem';
import { InputItem } from '../../FormItems/InputItem';
import SelectJobCodeItem from '../../FormItems/SelectJobCodeItem';
import SelectJobTypeItem from '../../FormItems/SelectJobTypeItem';
import SelectBriefStatusItem from '../../FormItems/SelectBriefStatusItem';
import VisibleFormItem from '../../FormItems/VisibleFormItem';
import Alert from '../../../Alert';
import SwitchRestrictionItem from '../../FormItems/SwitchRestrictionItem';
import { updateBrief } from '../../../../lib/briefs';

export default function Orientation({ brief, passChildData }) {
	const [formValues, setFormValues] = useState({});
	const [form] = Form.useForm();

	// these are needed as seperate state because they contain
	// RichText values, which aren't rendered on the server
	// see 'RichTextWrapper' component
	const [projectCircumstances, setProjectCircumstances] = useState(undefined);
	const [desiredOutcomes, setDesiredOutcomes] = useState(undefined);
	const [designDirection, setDesignDirection] = useState(undefined);
	const [projectDelivery, setProjectDelivery] = useState(undefined);

	const onFormFinish = async (values) => {
		values = {
			...values,
			brief_project_circumstances: projectCircumstances,
			brief_desired_outcomes: desiredOutcomes,
			brief_design_direction: designDirection,
			brief_project_delivery: projectDelivery,
		};

		const updatedBrief = await updateBrief(brief.id, values);

		if (updatedBrief) {
			message.success('Success!');

			passChildData(formValues.brief_type);
		} else {
			message.fail('Oops! Something went wrong');
		}
	};

	const {
		job,
		brief_title,
		brief_type,
		brief_status,
		budget,
		brief_project_circumstances,
		brief_project_circumstances_visible,
		brief_desired_outcomes,
		brief_desired_outcomes_visible,
		brief_design_direction,
		brief_design_direction_visible,
		brief_project_delivery,
		brief_project_delivery_visible,
		brief_assets_style_guide_on_file,
		brief_assets_final_content_provided,
		brief_assets_follow_existing_style,
		restricted,
	} = brief;

	return (
		<StyledForm
			form={form}
			name='edit_brief_manager_form'
			scrollToFirstError
			onFinish={onFormFinish}
			onFieldsChange={() => setFormValues(form.getFieldsValue())}
			initialValues={{
				brief_title,
				job_code: job?.id,
				brief_type,
				brief_assets_style_guide_on_file,
				brief_assets_final_content_provided,
				brief_assets_follow_existing_style,
				key_milestones: [
					{ description: 'Content to be provided' },
					{ description: 'Submitted to Client' },
					{ description: 'Live/Published' },
				],
				budget,
				brief_status,
				restricted,
			}}
		>
			<h1>Orientation</h1>
			<DatePickerItem name='date_approved' label='Date Approved' />
			{formValues.date_approved && <Alert />}
			<InputItem name='brief_title' label='Brief Title' />
			<SelectJobTypeItem name='brief_type' label='Brief Type' required={true} />
			{formValues.brief_type && <Alert />}
			<SelectJobCodeItem name='job' label='Job Code' />
			{formValues.job && <Alert />}
			<AudiencesList />
			<VisibleFormItem
				name='brief_project_circumstances'
				label='Project Circumstances'
				defaultChecked={brief_project_circumstances_visible}
			>
				<RichTextWrapper
					passChildData={setProjectCircumstances}
					defaultValue={brief_project_circumstances}
				/>
			</VisibleFormItem>
			<VisibleFormItem
				name='brief_desired_outcomes'
				label='Desired Outcomes'
				defaultChecked={brief_desired_outcomes_visible}
			>
				<RichTextWrapper
					passChildData={setDesiredOutcomes}
					defaultValue={brief_desired_outcomes}
				/>
			</VisibleFormItem>
			<VisibleFormItem
				name='brief_design_direction'
				label='Design Direction'
				defaultChecked={brief_design_direction_visible}
			>
				<RichTextWrapper
					passChildData={setDesignDirection}
					defaultValue={brief_design_direction}
				/>
			</VisibleFormItem>
			<VisibleFormItem
				name='brief_project_delivery'
				label='Project Delivery Specifics'
				defaultChecked={brief_project_delivery_visible}
			>
				<RichTextWrapper
					passChildData={setProjectDelivery}
					defaultValue={brief_project_delivery}
				/>
			</VisibleFormItem>
			<KeyMilestonesList />
			<InputItem name='budget' label='Budget' required={false} />
			<h3>Client Assets</h3>
			<CheckBoxItem
				name='brief_assets_style_guide_on_file'
				label='Do we have the latest Brand Assets & Style Guide on file?'
			/>
			<CheckBoxItem
				name='brief_assets_follow_existing_style'
				label='Will this project follow those existing style guidelines?'
			/>
			<CheckBoxItem
				name='brief_assets_final_content_provided'
				label='Will the final content be provided?'
			/>
			<SelectBriefStatusItem
				name='brief_status'
				label='Brief Status'
				required={true}
			/>
			<SwitchRestrictionItem defaultChecked={restricted} />
			<SubmitButton buttonText='Update Brief' />
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
				font-size: 16px;
				font-weight: 500;

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
