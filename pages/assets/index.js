import { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Select } from 'antd';

import { readUserRole } from '../../lib/auth';
import { readAllAssets } from '../../lib/assets';
import { readAllNonNullJobCodes } from '../../lib/jobs';
import AssetsContainer from '../../components/Assets/AssetsContainer';
import EmptyData from '../../components/EmptyData';

export default function AssetsPage({ allAssets, preview }) {
	const userRoleQuery = useQuery('userRole', readUserRole);
	const jobCodesQuery = useQuery('jobCodes', readAllNonNullJobCodes);

	const [searchFilters, setSearchFilters] = useState({
		jobCodes: [],
		tags: [],
	});

	if (!allAssets.length) {
		return <EmptyData />;
	}

	if (userRoleQuery.status !== 'success') {
		return <div>loading...</div>;
	}

	if (userRoleQuery.data !== 'Manager') {
		return <div>Forbidden!</div>;
	}

	let jobCodeOptions = [];
	if (jobCodesQuery.status === 'success') {
		for (let i = 0; i < jobCodesQuery.data.length; i++) {
			const value = jobCodesQuery.data[i];
			jobCodeOptions.push({ value });
		}
	}

	const tagOptions = [];
	for (let i = 0; i < 10; i++) {
		const value = `${i.toString(36)}${i}`;
		tagOptions.push({ value });
	}

	return (
		<div>
			<h1>all assets</h1>
			<SearchContainer>
				<div className='search-item-wrp'>
					<label>Filter by Job Code</label>
					<Select
						allowClear
						placeholder='Based on OR query'
						onChange={(e) => {
							setSearchFilters({ ...searchFilters, jobCodes: e });
						}}
						options={jobCodeOptions}
					/>
				</div>
				<div className='search-item-wrp'>
					<label>Filter by Asset Tags</label>
					<Select
						mode='multiple'
						allowClear
						placeholder='Based on AND query'
						onChange={(e) => {
							setSearchFilters({ ...searchFilters, tags: e });
						}}
						options={tagOptions}
					/>
				</div>
			</SearchContainer>
			<AssetsContainer activeFilters={searchFilters} />
		</div>
	);
}

const SearchContainer = styled.div`
	display: flex;
	background: #efefef;
	padding: 20px;
	border-radius: 10px;

	.search-item-wrp {
		flex: 1;
		margin: 0 10px;
		display: flex;
		flex-direction: column;
	}
`;

export async function getStaticProps({ preview = false }) {
	const allAssets = await readAllAssets(preview);

	return {
		props: { allAssets, preview },
	};
}
