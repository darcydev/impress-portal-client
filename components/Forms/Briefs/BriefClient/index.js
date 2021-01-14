import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Form, message } from 'antd';

import AssetsResults from '../../../Assets/AssetsResults';
import RichTextWrapper from '../../../RichTextWrapper';
import SubmitButton from '../../FormItems/SubmitButton';
import ItemWrapper from '../../FormItems/ItemWrapper';
import { updateBrief } from '../../../../lib/briefs';
import { readAllAssets } from '../../../../lib/assets';
import { filterViewableAssetsForClient } from '../../../../utils/filterViewableAssetsForClient';

export default function BriefClient({ brief }) {
	const [richTextValues, setRichTextValues] = useState({});
	const allAssetsQuery = useQuery('allAssets', readAllAssets);

	const onFormFinish = async (values) => {
		// TODO is there a way to pass the rich text data in
		// TODO ...the form data (to avoid having to store them in state and them pass them into values as below?)
		// INCLUDE THE RICH TEXT DATA IN VALUES BODY
		values = {
			...values,
			brief_project_circumstances: richTextValues.brief_project_circumstances,
			brief_desired_outcomes: richTextValues.brief_desired_outcomes,
			brief_design_direction: richTextValues.brief_design_direction,
			brief_project_delivery: richTextValues.brief_project_delivery,
		};

		const updatedBrief = await updateBrief(brief.id, values);

		if (updatedBrief) {
			message.success('Success!');
		} else {
			message.error('Oops! Something went wrong');
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
		<StyledForm name='edit_brief_client_form' onFinish={onFormFinish}>
			{brief_project_circumstances_visible && (
				<ItemWrapper
					name='brief_project_circumstances'
					label='Project Circumstances'
				>
					<RichTextWrapper
						defaultValue={brief_project_circumstances}
						passChildData={(e) => {
							setRichTextValues({
								...richTextValues,
								brief_project_circumstances: e,
							});
						}}
					/>
				</ItemWrapper>
			)}
			{brief_desired_outcomes_visible && (
				<ItemWrapper name='brief_desired_outcomes' label='Desired Outcomes'>
					<RichTextWrapper
						defaultValue={brief_desired_outcomes}
						passChildData={(e) => {
							setRichTextValues({
								...richTextValues,
								brief_desired_outcomes: e,
							});
						}}
					/>
				</ItemWrapper>
			)}
			{brief_design_direction_visible && (
				<ItemWrapper name='brief_design_direction' label='Design Direction'>
					<RichTextWrapper
						defaultValue={brief_design_direction}
						passChildData={(e) => {
							setRichTextValues({
								...richTextValues,
								brief_design_direction: e,
							});
						}}
					/>
				</ItemWrapper>
			)}
			{brief_project_delivery_visible && (
				<ItemWrapper
					name='brief_project_delivery'
					label='Project Delivery Specifics'
				>
					<RichTextWrapper
						defaultValue={brief_project_delivery}
						passChildData={(e) => {
							setRichTextValues({
								...richTextValues,
								brief_project_delivery: e,
							});
						}}
					/>
				</ItemWrapper>
			)}
			<h2>Visual Library</h2>
			{allAssetsQuery.status === 'success' && (
				<AssetsResults
					data={filterViewableAssetsForClient(allAssetsQuery.data)}
					client={true}
				/>
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
