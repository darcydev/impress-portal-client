import Link from 'next/link';
import styled from 'styled-components';
import { BsCloudDownload } from 'react-icons/bs';

const API_URL = process.env.PUBLIC_API_URL;

export default function AssetThumbnail({ id, file, title, job, tags }) {
	const { thumbnail } = file.formats;

	return (
		<StyledContainer>
			<div className='img-wrp'>
				<img src={`${API_URL}${thumbnail.url}`} alt={file.alternativeText} />
			</div>
			<div className='txt-wrp'>
				<p className='job-code'>{job.job_code}</p>
				<p className='file-size'>{file.size}</p>
				<div className='tags-wrp'>
					{tags && tags.map((tag) => <div className='tag-item'>{tag}</div>)}
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

	.img-wrp {
		width: 156px;
		height: 100%;

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
