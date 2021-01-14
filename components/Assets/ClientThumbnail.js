import styled from 'styled-components';
import { Checkbox, message } from 'antd';
import { BsCloudDownload } from 'react-icons/bs';
import { GrDocumentPdf } from 'react-icons/gr';
import { AiOutlineFileJpg } from 'react-icons/ai';

const API_URL = process.env.PUBLIC_API_URL;

const FileIcon = (format) => {
	switch (format) {
		case 'pdf':
			return <GrDocumentPdf size={30} />;
		case 'jpeg':
			return <AiOutlineFileJpg size={30} />;
		default:
			return <span />;
	}
};

export default function ClientThumbnail({ id, file, restricted }) {
	let fileUrl;

	if (!file.formats) {
		fileUrl = file.url;
	} else {
		fileUrl = file.formats.thumbnail.url;
	}

	const handleCheckChanged = (value) => {
		if (value) {
			message.success('Selected for brief');
		} else {
			message.error('Unselected from brief');
		}
	};

	return (
		<StyledContainer>
			<div className='img-wrp'>
				<img src={`${API_URL}${file.url}`} alt={file.alternativeText} />
			</div>
			<div className='txt-wrp'>
				<p className='file-format'>
					File format: <FileIcon format={file.mime.split('/')[1]} />
				</p>
				<p className='file-size'>{file.size}KB</p>
				<div className='cta-wrp'>
					<div className='download-wrp'>
						<a href={`${API_URL}${file.url}`} target='_blank'>
							<BsCloudDownload />
						</a>
						<Checkbox onChange={(e) => handleCheckChanged(e.target.checked)} />
					</div>
				</div>
			</div>
		</StyledContainer>
	);
}

const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	box-shadow: 1px 1px 5px 2px rgba(1, 1, 1, 0.25);
	margin: 20px;
	flex: 0 0 18%;

	.img-wrp {
		width: 100%;
		height: auto;

		img {
			width: 100%;
			height: auto;
		}
	}

	.txt-wrp {
		padding: 10px;

		p.job-code {
			margin: 0;
		}

		p.file-format {
			display: flex;
			align-items: center;
		}

		p.file-size {
			margin: 0;
			color: #808080;
			font-size: 14px;
		}

		.tags-wrp {
			display: flex;
			flex-wrap: wrap;

			.tag-item {
				margin: 0 2px;
				background: #fbfbfb;
				border: 1px solid #efefef;
			}
		}

		.cta-wrp {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
`;
