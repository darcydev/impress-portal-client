import { useState } from 'react';
import styled from 'styled-components';
import { Form, Select, Button, Upload, Input, message } from 'antd';
import { ImBin2 } from 'react-icons/im';
import { InboxOutlined } from '@ant-design/icons';

import { createMedia } from '../../lib/media';
import { createAsset, updateAsset } from '../../lib/assets';
import { readJobByJobCode } from '../../lib/jobs';
import JobCodeSelect from '../Select/JobCodeSelect';

const { Option } = Select;
const { Item } = Form;

export default function AssetUpload({
	jobCodeDefined,
	jobId,
	briefId = undefined,
}) {
	const [fileList, setFileList] = useState([]);

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

	const onFormFinish = async (values) => {
		let createdAssetBody = {};

		if (jobCodeDefined && jobCode) {
			const { id } = await readJobByJobCode(jobCode);

			createdAssetBody = { ...createdAssetBody, job: id };
		} else if (values.job_code) {
			const { id } = await readJobByJobCode(values.job_code);

			createdAssetBody = { ...createdAssetBody, job: id };
		}

		if (briefId) {
			createdAssetBody = { ...createdAssetBody, brief: briefId };
		}

		createdAssetBody = JSON.stringify(createdAssetBody);
		const generalTags = values.tags || [];

		fileList.forEach(async (file) => {
			const { uid } = file;

			const createdAsset = await createAsset(createdAssetBody);
			const createdMedia = await createMedia(createdAsset.id, file);

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

			if (updatedAsset) {
				message.success(`${updatedAsset.file.name} uploaded`);
			} else {
				message.fail(`${updatedAsset.file.name} failed`);
			}
		});
	};

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
			<h2>Upload Assets</h2>
			{!jobCodeDefined && (
				<Item name='job_code' label='Job code'>
					<JobCodeSelect />
				</Item>
			)}
			<Item name='tags' label='Tags'>
				<Select
					mode='multiple'
					allowClear
					placeholder='Select tags'
					options={options}
				/>
			</Item>
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
									<Form.Item name={`${uid}Tags`}>
										<Select
											mode='multiple'
											placeholder='Select specific tags for this asset'
											options={options}
										/>
									</Form.Item>
								</div>
								<div className='form-item-wrp'>
									<Form.Item name={`${uid}ServerLocation`}>
										<Input placeholder='Server location' />
									</Form.Item>
								</div>
								<div className='form-item-wrp'>
									<Form.Item name={`${uid}AssetDescription`}>
										<Input placeholder='Asset Description' />
									</Form.Item>
								</div>
								<div className='form-item-wrp'>
									<Form.Item name={`${uid}ExternalLocation`}>
										<Input placeholder='External location (eg YouTube link)' />
									</Form.Item>
								</div>
								<div className='form-item-wrp'>
									<Form.Item name={`${uid}VisibilityRestriction`}>
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
					Upload Assets
				</Button>
			</Form.Item>
		</StyledForm>
	);
}

const StyledForm = styled(Form)`
	.ant-form-item {
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;

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
			background: #efefef;
			border-radius: 20px;
			padding: 20px;
			margin: 20px 0;

			.file-wrp {
				display: flex;
				align-items: center;
				justify-content: space-between;

				&:hover {
					background: #efefef;
				}

				h3 {
					margin: 0 0 10px 0;
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
