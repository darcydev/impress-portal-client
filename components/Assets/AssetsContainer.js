import styled from 'styled-components';
import { useQuery } from 'react-query';

import { readAllAssets } from '../../lib/assets';
import AssetThumbnail from './AssetThumbnail';
import EmptyData from '../EmptyData';

export default function AssetsContainer({ activeFilters }) {
	const assetsQuery = useQuery('allAssets', readAllAssets);

	const { status, data } = assetsQuery;

	if (status === 'error') {
		return <p>error...</p>;
	}

	if (status === 'loading') {
		return <p>loading...</p>;
	}

	if (!data) {
		return <EmptyData />;
	}

	/* FILTERING */
	let filteredData = data;

	const { description, jobCodes, tags } = activeFilters;

	if (jobCodes.length) {
		filteredData = filteredData.filter(
			(asset) => asset.job && jobCodes.includes(asset.job.id)
		);
	}

	if (tags.length) {
		// TODO: REFACTOR -> ASK STACK OVERFLOW HOW TO REFACTOR THIS
		filteredData = filteredData.filter((asset) => {
			let assetIncluded = true;

			tags.forEach((tag) => {
				const searchTagInAssetTagArray = asset.tags?.includes(tag);

				if (!searchTagInAssetTagArray) assetIncluded = false;
			});

			return asset.tags && assetIncluded;
		});
	}

	if (description) {
		filteredData = filteredData.filter(
			(asset) =>
				asset.asset_description && asset.asset_description.includes(description)
		);
	}

	if (!filteredData.length) {
		return <EmptyData />;
	}

	return (
		<StyledContainer>
			{filteredData.map((asset) => {
				const { id, tags, used_by_client, file, job } = asset;

				if (!file) return null;

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
