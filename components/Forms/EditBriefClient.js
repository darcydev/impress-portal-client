import { useState } from 'react';
import styled from 'styled-components';
import {
	Alert,
	Form,
	Input,
	Button,
	Select,
	Switch,
	Upload,
	message,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { ImBin2 } from 'react-icons/im';

import { updateJob } from '../../lib/jobs';

const { Option } = Select;

export default function EditBriefClient({ job }) {
	const [fileList, setFileList] = useState([]);
	const {
		job_type,
		job_type_visible,
		job_description,
		job_description_visible,
	} = job;

	const onFinish = (values) => {
		console.log('values :>> ', values);
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

	// console.log('fileList :>> ', fileList);

	return (
		<StyledForm name='edit_brief_client_form' onFinish={onFinish}>
			{job_type_visible && (
				<div className='form-item-wrp'>
					<h2>Job Type:</h2>
					<p>{job_type}</p>
				</div>
			)}
			{job_description_visible && (
				<div className='form-item-wrp'>
					<h2>Description:</h2>
					<p>{job_description}</p>
				</div>
			)}
			<Form.Item name='file_list' label='File List'>
				<Upload.Dragger
					name='file'
					multiple={true}
					fileList={fileList}
					showUploadList={true}
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
		</StyledForm>
	);
}

const StyledForm = styled(Form)`
	.form-item-wrp {
		display: flex;
		flex-direction: column;
		margin: 10px 0;

		.ant-form-item {
			margin: 0 10px 0 0;
			flex: 1;
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
