import Link from 'next/link';
import styled from 'styled-components';
import { BsCloudDownload } from 'react-icons/bs';

import AssetFormat from './AssetFormat';

const API_URL = process.env.PUBLIC_API_URL;

export default function AssetThumbnail({ id, file, title, job, tags }) {
	/* 	console.log('file :>> ', file); */

	let fileUrl;

	if (!file.formats) {
		fileUrl = file.url;
	} else {
		fileUrl = file.formats.thumbnail.url;
	}

	/* 	console.log('fileUrl :>> ', fileUrl); */

	return (
		<StyledContainer>
			<div className='img-wrp'>
				<img src={`${API_URL}${fileUrl}`} alt={file.alternativeText} />
			</div>
			<div className='txt-wrp'>
				<p className='job-code'>Job code: {job.job_code}</p>
				<p className='file-format'>
					File format: <AssetFormat assetFormat={file.mime.split('/')[1]} />
				</p>
				<p className='file-size'>{file.size}KB</p>
				<div className='tags-wrp'>
					<p>Tags:</p>
					{tags &&
						tags.map((tag, i) => {
							return (
								<div key={`${tag}-${i}`} className='tag-item'>
									{tag}
								</div>
							);
						})}
				</div>
				<div className='cta-wrp'>
					<Link href={`/assets/${id}`}>View more</Link>
					<div className='download-wrp'>
						<a href={`${API_URL}${file.url}`} download>
							<BsCloudDownload />
						</a>
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
