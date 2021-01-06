import { useState } from 'react';
import styled from 'styled-components';
import { Alert, Form, Input, message } from 'antd';

import AssetUpload from '../Assets/AssetUpload';
import JobCodeSelect from '../Select/JobCodeSelect';
import JobTypeSelect from '../Select/JobTypeSelect';
import Audiences from './FormLists/Audiences';
import KeyMilestones from './FormLists/KeyMilestones';
import VisibleFormItem from './FormItems/VisibleFormItem';
import CheckBoxItem from './FormItems/CheckBoxItem';
import SubmitButton from './FormItems/SubmitButton';
import DatePickerItem from './FormItems/DatePickerItem';
import { updateBrief } from '../../lib/briefs';

const { Item } = Form;
const { TextArea } = Input;

export default function EditBriefManager({ brief }) {
	const [jobId, setJobId] = useState(undefined);
	const [jobType, setJobType] = useState(undefined);

	const onFormFinish = async (values) => {
		values = { ...values, job: jobId, brief_type: jobType };

		console.log('values :>> ', values);

		const updatedBrief = await updateBrief(brief.id, values);

		updatedBrief
			? message.success('Success!')
			: message.fail('Oops! Something went wrong');
	};

	const {
		brief_title,
		brief_type,
		budget,
		brand_assets_style_guide_on_file,
		key_milestones,
		brief_project_circumstances,
		brief_project_circumstances_visible,
		brief_desired_outcomes,
		brief_desired_outcomes_visible,
		brief_assets_style_guide_on_file,
		brief_assets_final_content_provided,
		brief_assets_follow_existing_style,
	} = brief;

	console.log('brief :>> ', brief);

	return (
		<>
			<StyledForm
				name='edit_brief_manager_form'
				onFinish={onFormFinish}
				initialValues={{
					brief_title,
					job_code: brief.job?.id,
					brief_type,
					brief_project_circumstances,
					brief_project_circumstances_visible,
					brief_desired_outcomes,
					brief_desired_outcomes_visible,
					brand_assets_style_guide_on_file,
					brief_assets_style_guide_on_file,
					brief_assets_final_content_provided,
					brief_assets_follow_existing_style,
					key_milestones: [
						{ description: 'Content to be provided' },
						{ description: 'Submitted to Client' },
						{ description: 'Live/Published' },
					],
					budget,
				}}
			>
				<DatePickerItem name='date_approved' label='Date Approved' />
				<Item name='brief_title' label='Brief Title'>
					<Input />
				</Item>
				<Item name='brief_type' label='Brief Type'>
					<JobTypeSelect passChildData={setJobType} />
				</Item>
				{jobType && (
					<Alert
						message='Lorem ipsum'
						description='Ea consequat veniam culpa enim.'
						type='info'
						showIcon
						closable
					/>
				)}
				<Item name='job_code' label='Job Code'>
					<JobCodeSelect passChildData={setJobId} />
				</Item>
				{jobId && (
					<Alert
						message='Lorem ipsum'
						description='Ea consequat veniam culpa enim.'
						type='info'
						showIcon
						closable
					/>
				)}
				<VisibleFormItem
					name='brief_project_circumstances'
					label='Project Circumstances'
				>
					<TextArea rows={4} />
				</VisibleFormItem>
				<Audiences />
				<VisibleFormItem name='brief_desired_outcomes' label='Desired Outcomes'>
					<TextArea rows={4} />
				</VisibleFormItem>
				<VisibleFormItem name='brief_design_direction' label='Design Direction'>
					<TextArea rows={4} />
				</VisibleFormItem>
				<VisibleFormItem
					name='brief_project_delivery'
					label='Project Delivery Specifics'
				>
					<TextArea rows={4} />
				</VisibleFormItem>
				<KeyMilestones />
				<Item name='budget' label='Budget'>
					<Input />
				</Item>
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
				<SubmitButton buttonText='Update Brief' />
			</StyledForm>
			<AssetUpload jobCodeDefined={true} jobCode={jobId} briefId={brief.id} />
		</>
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
