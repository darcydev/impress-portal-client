import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Form } from 'antd';

import SelectItem from '../../FormItems/SelectItem';
import SubmitButton from '../../FormItems/SubmitButton';
import AssetsPublishedList from '../../FormLists/AssetsPublishedList';
import RichTextWrapper from '../../../RichTextWrapper';
import AssetsContainer from '../../../Assets/Container';
import { readAllAssets } from '../../../../lib/assets';

type ComponentProps = {
	brief: object;
};

const Animation: FunctionComponent<ComponentProps> = ({ brief }) => {
	const [formValues, setFormValues] = useState({});
	const [additionalNotes, setAdditionalNotes] = useState(undefined);
	const [form] = Form.useForm();

	const assetsQuery = useQuery('assetsQuery', readAllAssets);

	const onFormFinish = async (values) => {
		values = {
			...values,
			brief_additionalNotes: additionalNotes,
		};

		console.log('values :>> ', values);
	};

	return (
		<StyledForm
			form={form}
			name='edit_brief_manager_form'
			scrollToFirstError
			onFinish={onFormFinish}
			onFieldsChange={() => setFormValues(form.getFieldsValue())}
		>
			<h1>Animation/Video</h1>
			<SelectItem
				name='animation_video_type'
				label='Animation Video Type'
				options={[
					{ value: 'animation_only', label: 'Animation Only' },
					{ value: 'video_only', label: 'Video Only' },
					{
						value: 'combination_animation_video',
						label: 'Combination of Animation & Video',
					},
				]}
			/>
			<SelectItem
				name='new_or_update_on_previous'
				label='New or Update on Previous'
				options={[
					{ value: 'new', label: 'new' },
					{ value: 'old', label: 'Old' },
				]}
			/>
			<SelectItem
				name='expected_length'
				label='Expected Length'
				options={[
					{ value: '<15_seconds', label: '< 15 seconds' },
					{ value: '15_60_seconds', label: '15 - 60 seconds' },
					{ value: '1_2_minutes', label: '1.01 - 2 minutes' },
					{ value: '2_3_minutes', label: '2.01 - 3 minutes' },
					{ value: '3_5_minutes', label: '3.01 - 5 minutes' },
					{ value: 'other', label: 'Other' },
				]}
			/>
			<SelectItem
				name='delivery_requirements'
				label='Delivery Requirements'
				mode='multiple'
				options={[
					{
						value: 'messaging_concept_theme',
						label: 'Messaging concept/theme',
					},
					{ value: 'visual_concept', label: 'Visual concept' },
					{ value: 'full_script', label: 'Full script' },
					{ value: 'script_edit', label: 'Script edit' },
					{
						value: 'flat_artwork_storyboard',
						label: 'Flat artwork/Storyboard',
					},
					{ value: 'location_sourcing', label: 'Location scouting/Site recce' },
					{
						value: 'interviewee_participant_coordination',
						label: 'Interviewee/Participant coordination',
					},
					{ value: 'voiceover_sourcing', label: 'Voiceover sourcing' },
					{ value: 'voiceover_recording', label: 'Voiceover recording' },
					{ value: 'editing_animation', label: 'Editing/Animating' },
					{
						value: 'accessibility',
						label: 'Accessibility [SRT file/Captions]',
					},
					{ value: 'other', label: 'Other' },
				]}
			/>
			<AssetsPublishedList />
			<h2>Visual Style</h2>
			{assetsQuery.status === 'error' && <p>error...</p>}
			{assetsQuery.status === 'loading' && <p>loading...</p>}
			{assetsQuery.status === 'success' && (
				<AssetsContainer assets={assetsQuery.data} />
			)}
			<h2>Additional Notes</h2>
			<RichTextWrapper passChildData={setAdditionalNotes} defaultValue={null} />
			<SubmitButton />
		</StyledForm>
	);
};

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

export default Animation;
