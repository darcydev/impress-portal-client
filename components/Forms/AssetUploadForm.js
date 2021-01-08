import { useState } from 'react';
import styled from 'styled-components';
import { Form, Upload, message } from 'antd';
import { ImBin2 } from 'react-icons/im';
import { InboxOutlined } from '@ant-design/icons';

import SubmitButton from './FormItems/SubmitButton';
import InputItem from './FormItems/InputItem';
import SelectVisibilityRestrictionItem from './FormItems/SelectVisibilityRestrictionItem';
import SelectAssetTags from './FormItems/SelectAssetTags';
import SelectJobCodeItem from './FormItems/SelectJobCodeItem';
import { createMedia } from '../../lib/media';
import { createAsset, updateAsset } from '../../lib/assets';
import { readJobByJobCode } from '../../lib/jobs';

const { Item } = Form;

export default function AssetUploadForm({
	jobId = null,
	briefId = null,
	showJobId = false,
}) {
	const [fileList, setFileList] = useState([]);
	const [form] = Form.useForm();

	let newFileList = [...fileList];

	const onFileAdded = (file) => {
		newFileList.push(file);
		setFileList(newFileList);
	};

	const onFileRemoved = (removedFile) => {
		const newFileList = fileList.filter((file) => file.uid !== removedFile.uid);
		setFileList(newFileList);
	};

	const onFormFinish = async (values) => {
		let createdAssetBody = {};

		if (jobId) {
			createdAssetBody = { ...createdAssetBody, job: jobId };
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

			console.log('updatedAsset :>> ', updatedAsset);

			updatedAsset
				? message.success(`${updatedAsset.file.name} uploaded`)
				: message.fail(`${updatedAsset.file.name} failed to upload`);
		});
	};

	return (
		<StyledForm form={form} name='asset_upload_form' onFinish={onFormFinish}>
			<h2>Upload Assets</h2>
			{showJobId && <SelectJobCodeItem />}
			<SelectAssetTags name='tags' label='Tags' />
			<Item name='file_list' label='File List'>
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
			</Item>
			<StyledFileList>
				<ul>
					{fileList.map((file) => {
						const { uid, name } = file;

						return (
							<li key={uid}>
								<div className='file-wrp'>
									<h3>{name}</h3>
									<button
										onClick={(e) => {
											e.preventDefault();
											onFileRemoved(file);
										}}
									>
										<ImBin2 />
									</button>
								</div>
								<div className='form-items-wrp'>
									<SelectAssetTags name={`${uid}Tags`} />
									<InputItem
										name={`${uid}ServerLocation`}
										placeholder='Server location'
									/>
									<InputItem
										name={`${uid}AssetDescription`}
										placeholder='Asset Description'
									/>
									<InputItem
										name={`${uid}ExternalLocation`}
										placeholder='External location (eg YouTube link)'
									/>
									<SelectVisibilityRestrictionItem
										name={`${uid}VisibilityRestriction`}
										placeholder='Select visibility restriction'
									/>
								</div>
							</li>
						);
					})}
				</ul>
			</StyledFileList>
			<SubmitButton buttonText='Upload Assets' />
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
