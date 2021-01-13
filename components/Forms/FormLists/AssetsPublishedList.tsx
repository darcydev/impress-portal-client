import React, { FunctionComponent } from 'react';
import { Form, Input, Button, Select, Space } from 'antd';
import styled from 'styled-components';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Item, List } = Form;
const requiredField = [{ required: true, message: 'Required' }];

type ComponentProps = {};

const AssetsPublishedList: FunctionComponent<ComponentProps> = ({}) => (
	<>
		<StyledHeader>How will the assets be published?</StyledHeader>
		<List name='how_assets_be_published'>
			{(fields, { add, remove }, { errors }) => (
				<>
					{fields.map((field, index) => (
						<Space key={field.key} align='center'>
							<Item
								{...field}
								name={[field.name, 'asset_name']}
								fieldKey={[field.fieldKey, 'asset_name']}
								rules={requiredField}
							>
								<Input placeholder='Asset name' />
							</Item>
							<Item
								{...field}
								name={[field.name, 'asset_source']}
								fieldKey={[field.fieldKey, 'asset_source']}
								rules={requiredField}
							>
								<Select
									options={[
										{ value: 'youtube', label: 'YouTube' },
										{ value: 'other', label: 'Other' },
									]}
								/>
							</Item>
							<Item
								{...field}
								name={[field.name, 'comments']}
								fieldKey={[field.fieldKey, 'comments']}
								rules={requiredField}
							>
								<Input placeholder='Specs' />
							</Item>
							<MinusCircleOutlined
								onClick={() => {
									remove(field.name);
								}}
							/>
						</Space>
					))}
					<Item>
						<Button
							type='dashed'
							onClick={() => add()}
							block
							icon={<PlusOutlined />}
						>
							Add asset
						</Button>
						<Form.ErrorList errors={errors} />
					</Item>
				</>
			)}
		</List>
	</>
);

const StyledHeader = styled.h3`
	font-size: 16px;
	font-weight: 500;
`;

export default AssetsPublishedList;
