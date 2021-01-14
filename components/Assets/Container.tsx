import React, { FunctionComponent, useState } from 'react';
import { useQuery } from 'react-query';

import AssetsSearch from './AssetsSearch';
import AssetsResults from './AssetsResults';
import { readAllAssets } from '../../lib/assets';

type ComponentProps = {
	assets?: any;
};

const AssetsContainer: FunctionComponent<ComponentProps> = ({ assets }) => {
	const [filteredData, setFilteredData] = useState(assets);
	const query = useQuery('assetsQuery', readAllAssets);

	const { status, data } = query;

	if (status === 'error') return <p>error...</p>;
	if (status === 'loading') return <p>loading...</p>;
	if (!data) return <p>no data...</p>;

	return (
		<div>
			<AssetsSearch assets={assets} setFilteredData={setFilteredData} />
			<AssetsResults data={filteredData} />
		</div>
	);
};

export default AssetsContainer;
