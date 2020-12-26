import styled from 'styled-components';

import AssetThumbnail from './AssetThumbnail';

export default function AssetsContainer({ query, activeFilters }) {
	const { isError, isLoading, data } = query;

	if (isError)
		return (
			<div>
				<h1>Error!</h1>
			</div>
		);

	if (isLoading)
		return (
			<div>
				<p>Loading...</p>
			</div>
		);

	if (!data) {
		return (
			<div>
				<p>Oops something went wrong: no data found!</p>
			</div>
		);
	}

	/* FILTERING */
	let filteredData = data;

	const { jobCodes, tags } = activeFilters;

	if (jobCodes.length) {
		filteredData = filteredData.filter((asset) =>
			jobCodes.includes(asset.job.job_code)
		);
	}

	if (tags.length) {
		filteredData = filteredData.filter((asset) => {
			for (let i = 0; i < tags.length; i++) {
				return asset.tags.includes(tags[i]);
			}
		});
	}

	if (!filteredData.length) {
		return (
			<div>
				<p>Oops no data found! Try expanding your search terms</p>
			</div>
		);
	}

	return (
		<StyledContainer>
			{filteredData.map((asset) => {
				const { id, tags, used_by_client, file, job } = asset;

				return (
					<AssetThumbnail
						key={id}
						id={id}
						file={file}
						title={file.name}
						job={job}
						tags={tags}
						usedByClient={used_by_client}
					/>
				);
			})}
		</StyledContainer>
	);
}

const StyledContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;
