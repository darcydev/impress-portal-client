import styled from 'styled-components';

import AssetThumbnail from './AssetThumbnail';
import ClientThumbnail from './ClientThumbnail';
import EmptyData from '../EmptyData';

export default function AssetsResults({ data, client = false }) {
	if (!data || !data.length) {
		return <EmptyData />;
	}

	return (
		<StyledContainer>
			{data.map((asset) => {
				const { id, tags, used_by_client, file, job } = asset;

				if (!file) return null;

				if (client) {
					return (
						<ClientThumbnail
							key={id}
							id={id}
							file={file}
							title={file.name}
							job={job}
							tags={tags}
							usedByClient={used_by_client}
						/>
					);
				} else {
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
				}
			})}
		</StyledContainer>
	);
}

const StyledContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;
