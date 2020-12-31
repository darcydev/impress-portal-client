import { useState } from 'react';
import styled from 'styled-components';
import { Form, Select, Button, Upload, Input, message } from 'antd';
import { ImBin2 } from 'react-icons/im';
import { InboxOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';

import { uploadMedia, createMedia } from '../../lib/media';
import { createAsset, updateAsset } from '../../lib/assets';
import { readJobByJobCode, readAllNonNullJobCodes } from '../../lib/jobs';

const { Option } = Select;

export default function AssetUpload() {
	const [fileList, setFileList] = useState([]);

	const onFormFinish = async (values) => {
		console.log('values :>> ', values);
		console.log('fileList :>> ', fileList);

		let createdAssetBody = {};

		if (values.job_code) {
			const { id } = await readJobByJobCode(values.job_code);

			createdAssetBody = JSON.stringify({ job: id });
		}

		/* TODO check if uploaded to brief */

		const createdAsset = await createAsset(createdAssetBody);

		console.log('createdAsset :>> ', createdAsset);

		const createdMedia = await createMedia(createdAsset.id, fileList);

		console.log('createdMedia :>> ', createdMedia);

		// create the body the update the asset
		const generalTags = values.tags || [];

		fileList.forEach(async (file) => {
			console.log('file :>> ', file);
			const { uid } = file;

			const specificTags = values[`${uid}Tags`] || [];
			const assetTags = [...new Set([...generalTags, ...specificTags])];
			const assetDescription = values[`${uid}AssetDescription`];
			const serverLocation = values[`${uid}ServerLocation`];
			const externalLocation = values[`${uid}ExternalLocation`];
			const visibilityRestriction = values[`${uid}VisibilityRestriction`];

			const body = JSON.stringify({
				tags: assetTags,
				asset_description: assetDescription,
				server_location: serverLocation,
				external_location: externalLocation,
				visibility_restriction: visibilityRestriction,
				uploaded_by_client: false,
			});

			const updatedAsset = await updateAsset(createdAsset.id, body);

			console.log('updatedAsset :>> ', updatedAsset);
		});
	};

	let newFileList = [...fileList];

	const onFileAdded = (file) => {
		newFileList.push(file);
		setFileList(newFileList);
	};

	// TODO can this be refactored?
	const onFileRemoved = (file) => {
		const index = fileList.indexOf(file);
		const newFileList = fileList.slice();
		newFileList.splice(index, 1);
		setFileList(newFileList);
	};

	const jobCodesQuery = useQuery('jobCodes', readAllNonNullJobCodes);

	let jobCodeOptions = [];

	if (jobCodesQuery.status === 'success') {
		for (let i = 0; i < jobCodesQuery.data.length; i++) {
			const value = jobCodesQuery.data[i];
			jobCodeOptions.push({ value });
		}
	}

	// TODO fetch from API
	const options = [];
	for (let i = 0; i < 30; i++) {
		const value = `${i.toString(36)}${i}`;
		options.push({
			value,
			disabled: i === 10,
		});
	}

	return (
		<StyledForm name='asset_upload_form' onFinish={onFormFinish}>
			<Form.Item name='job_code' label='Job code'>
				<Select
					showSearch
					allowClear
					placeholder='Select Job Code'
					options={jobCodeOptions}
				/>
			</Form.Item>
			<Form.Item name='tags' label='Tags'>
				<Select
					mode='multiple'
					allowClear
					placeholder='Select tags'
					options={options}
				/>
			</Form.Item>
			<Form.Item name='file_list' label='File List'>
				<Upload.Dragger
					name='file'
					multiple={true}
					fileList={fileList}
					showUploadList={false}
					onRemove={(file) => onFileRemoved(file)}
					beforeUpload={(file) => onFileAdded(file)}
				>
					<p className='ant-upload-drag-icon'>
						<InboxOutlined />
					</p>
					<p className='ant-upload-text'>
						Click or drag file to this area to upload
					</p>
				</Upload.Dragger>
			</Form.Item>
			<StyledFileList>
				<ul>
					{fileList.map((file) => {
						const { uid, name, size, type } = file;

						return (
							<li key={uid}>
								<div className='file-wrp'>
									<h3>{name}</h3>
									<button onClick={(file) => onFileRemoved(file)}>
										<ImBin2 />
									</button>
								</div>
								<div className='form-item-wrp'>
									<Form.Item
										name={`${uid}Tags`}
										label='Insert tags for this specific asset'
									>
										<Select
											mode='multiple'
											placeholder='Select tags for this asset'
											options={options}
										/>
									</Form.Item>
								</div>
								<div className='form-item-wrp'>
									<Form.Item
										name={`${uid}ServerLocation`}
										label='Server location'
									>
										<Input />
									</Form.Item>
								</div>
								<div className='form-item-wrp'>
									<Form.Item
										name={`${uid}AssetDescription`}
										label='Asset Description'
									>
										<Input />
									</Form.Item>
								</div>
								<div className='form-item-wrp'>
									<Form.Item
										name={`${uid}ExternalLocation`}
										label='External location'
									>
										<Input />
									</Form.Item>
								</div>
								<div className='form-item-wrp'>
									<Form.Item
										name={`${uid}VisibilityReduction`}
										label='Visibility Restriction'
									>
										<Select
											allowClear
											placeholder='Select visibility restriction'
										>
											<Option value='unrestricted'>Unrestricted</Option>
											<Option value='restricted_to_client'>
												Restricted to client
											</Option>
											<Option value='restricted_within_client'>
												Restricted within client
											</Option>
										</Select>
									</Form.Item>
								</div>
							</li>
						);
					})}
				</ul>
			</StyledFileList>
			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Submit
				</Button>
			</Form.Item>
		</StyledForm>
	);
}

const StyledForm = styled(Form)`
	.ant-form-item {
		display: flex;
		flex-direction: column;
		margin-bottom: 20px;

		.ant-form-item-label {
			text-align: left;

			label {
				font-size: 14px;

				::after {
					display: none;
				}
			}
		}
	}
`;

const StyledFileList = styled.div`
	ul {
		li {
			.file-wrp {
				display: flex;
				align-items: center;
				justify-content: space-between;

				&:hover {
					background: #efefef;
				}

				p {
					margin: 10px 0;
				}

				button {
					cursor: pointer;
					background: inherit;
					border: none;
				}
			}
		}
	}
`;
