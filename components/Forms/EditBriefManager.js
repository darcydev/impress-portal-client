import { useState } from 'react';
import styled from 'styled-components';
import { DatePicker, Form, Input, Button, message, Select, Switch } from 'antd';

import AssetUpload from '../Assets/AssetUpload';
import JobCodeSelect from '../Select/JobCodeSelect';
import JobTypeSelect from '../Select/JobTypeSelect';
import Audiences from './FormLists/Audiences';
import KeyMilestones from './FormLists/KeyMilestones';
import { updateBrief } from '../../lib/briefs';

const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;

const requiredField = [{ required: true, message: 'Required' }];

export default function EditBriefManager({ brief }) {
	const [jobCode, setJobCode] = useState(undefined);
	const [jobType, setJobType] = useState(undefined);

	console.log('brief :>> ', brief);

	const onFormFinish = async (values) => {
		values = { ...values, job_code: jobCode, brief_type: jobType };

		console.log('values :>> ', values);

		const updatedBrief = await updateBrief(brief.id, values);

		if (updatedBrief) {
			message.success('Success!');
		} else {
			message.fail('Oops! Something went wrong');
		}
	};

	console.log('jobType :>> ', jobType);

	const {
		assets,
		audiences,
		brand_assets_style_guide_on_file,
		brief_audiences,
		brief_status,
		brief_title,
		brief_type,
		budget,
		created_at,
		date_approved,
		design_direction,
		desired_outcomes,
		id,
		job,
		key_contact,
		key_milestones,
		project_circumstances,
		project_delivery_specifics,
		users_permissions_user,
		visibility_restricted,
		will_final_content_be_provided,
		will_project_follow_existing_style_guidelines,
	} = brief;

	return (
		<>
			<StyledForm
				name='edit_brief_manager_form'
				onFinish={onFormFinish}
				scrollToFirstError
				initialValues={{
					brief_title,
					job_code: brief.job.id,
					brief_type,
					project_circumstances,
					desired_outcomes,
					brand_assets_style_guide_on_file,
					key_milestones: [
						{ description: 'Content to be provided' },
						{ description: 'Submitted to Client' },
						{ description: 'Live/Published' },
					],
					will_project_follow_existing_style_guidelines,
					will_final_content_be_provided,
					design_direction,
					budget,
					project_delivery_specifics,
				}}
			>
				<Item name='date_approved' label='Date Approved'>
					<DatePicker />
				</Item>
				<Item name='brief_title' label='Brief Title'>
					<Input />
				</Item>
				<Item name='brief_type' label='Brief Type'>
					<JobTypeSelect passChildData={setJobType} />
				</Item>
				<Item name='job_code' label='Job Code'>
					<JobCodeSelect passChildData={setJobCode} defaultValue={10} />
				</Item>
				<Item name='users_permissions_user' label='Key Contact'>
					<Select>
						<Option value='option_1'>Option 1</Option>
						<Option value='option_2'>Option 2</Option>
						<Option value='option_3'>Option 3</Option>
					</Select>
				</Item>
				<Item name='project_circumstances' label='Project Circumstances'>
					<TextArea rows={4} />
				</Item>
				<Audiences />
				<Item name='desired_outcomes' label='Desired Outcomes'>
					<TextArea rows={4} />
				</Item>
				<KeyMilestones />
				<Item
					name='brand_assets_style_guide_on_file'
					label='Do we have the latest Brand Assets & Style Guide on file?'
				>
					<Switch defaultChecked={true} />
				</Item>
				<Item
					name='will_project_follow_existing_style_guidelines'
					label='Will this project follow those existing style guidelines?'
				>
					<Switch defaultChecked={true} />
				</Item>
				<Item
					name='will_final_content_be_provided'
					label='Will the final content be provided?'
				>
					<Switch defaultChecked={true} />
				</Item>
				<Item name='design_direction' label='Design Direction'>
					<TextArea rows={4} />
				</Item>
				<Item name='budget' label='Budget'>
					<Input />
				</Item>
				<Item
					name='project_delivery_specifics'
					label='Project Delivery Specifics'
				>
					<TextArea rows={4} />
				</Item>
				<Item>
					<Button type='primary' htmlType='submit'>
						Update
					</Button>
				</Item>
			</StyledForm>
			<AssetUpload jobCodeDefined={true} jobCode={jobCode} briefId={brief.id} />
		</>
	);
}

const StyledForm = styled(Form)`
	.ant-form-item {
		display: flex;
		flex-direction: column;
		align-items: start;
		margin: 10px 0;
		flex: 1;

		.ant-form-item-label {
			label {
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
