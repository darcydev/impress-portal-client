import { useState } from 'react';
import styled from 'styled-components';
import { Form, Select, Button, Upload, Input, message } from 'antd';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { ImBin2 } from 'react-icons/im';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { InboxOutlined } from '@ant-design/icons';

import { uploadMedia } from '../../lib/media';

export default function AssetUpload() {
	const [fileList, setFileList] = useState([]);

	const onFinish = (values) => {
		uploadMedia(values, fileList);
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

	// TODO fetch from API
	const options = [];
	for (let i = 0; i < 100; i++) {
		const value = `${i.toString(36)}${i}`;
		options.push({
			value,
			disabled: i === 10,
		});
	}

	return (
		<StyledForm name='media_upload' onFinish={onFinish}>
			<Form.Item
				name='job_code'
				label='Job code'
				rules={[{ required: true, message: 'Required' }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name='tags'
				label='Tags'
				rules={[{ required: true, message: 'Required' }]}
			>
				<Select mode='multiple' placeholder='Select tags' options={options} />
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
					<p className='ant-upload-hint'>
						Support for a single or bulk upload. Strictly prohibit from
						uploading company data or other band files
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
									<p>{name}</p>
									<button onClick={(file) => onFileRemoved(file)}>
										<ImBin2 />
									</button>
								</div>
								<div className='form-item-wrp'>
									<Form.Item
										name={uid}
										label='Insert tags for this specific asset'
									>
										<Select
											mode='multiple'
											placeholder='Select tags for this asset'
											options={options}
										/>
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
				font-size: 16px;
				font-weight: 600;

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
