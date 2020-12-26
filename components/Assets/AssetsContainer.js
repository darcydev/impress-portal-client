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
		// 1) filter out all assets with empty tags
		filteredData = filteredData.filter((asset) => asset.tags);

		// 2) filter out all assets with do not have all of the tags in their tags array
		// ['foo', 'bar', 'cherry', 'apple'];

		// check if EVERY one is in array
		// ['foo'] => TRUE
		// ['foo', 'bar'] => TRUE
		// ['foo', 'cherry', 'banana'] => FALSE

		// the below function is working, but very messy
		// TODO: REFACTOR -> ASK STACK OVERFLOW HOW TO REFACTOR THIS
		filteredData = filteredData.filter((asset) => {
			console.log('tags :>> ', tags);
			console.log('asset.tags :>> ', asset.tags);

			let assetIncluded = true;

			tags.forEach((tag) => {
				const searchTagInAssetTagArray = asset.tags.includes(tag);

				if (!searchTagInAssetTagArray) assetIncluded = false;
			});

			return assetIncluded;
		});
	}

	console.log('filteredData :>> ', filteredData);

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
