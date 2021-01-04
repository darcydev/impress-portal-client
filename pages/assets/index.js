import { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Select, Input } from 'antd';

import { readUserRole } from '../../lib/auth';
import { readAllAssets } from '../../lib/assets';
import { readAllNonNullJobCodes } from '../../lib/jobs';
import AssetsContainer from '../../components/Assets/AssetsContainer';
import EmptyData from '../../components/EmptyData';

export default function AssetsPage({ allAssets, preview }) {
	const [searchFilters, setSearchFilters] = useState({
		jobCodes: [],
		tags: [],
		description: '',
	});

	const userRoleQuery = useQuery('userRole', readUserRole);
	const jobCodesQuery = useQuery('jobCodes', readAllNonNullJobCodes);

	if (!allAssets.length) {
		return <EmptyData />;
	}

	if (userRoleQuery.status !== 'success') {
		return <div>loading...</div>;
	}

	if (userRoleQuery.data !== 'Manager') {
		return <div>Forbidden!</div>;
	}

	if (jobCodesQuery.status === 'error') {
		return <p>error...</p>;
	}

	if (jobCodesQuery.status === 'loading') {
		return <p>loading...</p>;
	}

	let jobCodeOptions = [];

	for (let i = 0; i < jobCodesQuery.data.length; i++) {
		const value = jobCodesQuery.data[i];

		jobCodeOptions.push({ value: value.id, label: value.job_code });
	}

	const tagOptions = [];
	for (let i = 0; i < 10; i++) {
		const value = `${i.toString(36)}${i}`;
		tagOptions.push({ value });
	}

	console.log('allAssets :>> ', allAssets);
	console.log('searchFilters :>> ', searchFilters);

	return (
		<>
			<SearchContainer>
				<div className='search-item-wrp'>
					<label>Filter by Job Code</label>
					<Select
						mode='multiple'
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
				<div className='search-item-wrp'>
					<label>Filter by Asset Description</label>
					<Input
						onChange={(e) => {
							setSearchFilters({
								...searchFilters,
								description: e.target.value,
							});
						}}
					/>
				</div>
			</SearchContainer>
			<AssetsContainer activeFilters={searchFilters} />
		</>
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
