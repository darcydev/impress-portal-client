import { useState } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { Select } from 'antd';

import { isLoggedIn } from '../../lib/auth';
import { readAllAssets } from '../../lib/assets';
import { readAllJobs } from '../../lib/jobs';
import AssetsContainer from '../../components/Assets/AssetsContainer';

const { Option } = Select;

export default function AssetsPage({ preview }) {
	const [searchFilters, setSearchFilters] = useState({
		jobCodes: [],
		tags: [],
	});

	// process.browser makes sure that the browser is running client-side
	if (process.browser && !isLoggedIn()) {
		Router.push('/');
		return null;
	}

	const assetsQuery = useQuery('assets', readAllAssets);
	const jobsQuery = useQuery('jobs', readAllJobs);

	const tagOptions = [];
	for (let i = 0; i < 100; i++) {
		const value = `${i.toString(36)}${i}`;
		tagOptions.push(<Option key={value}>{value}</Option>);
	}

	return (
		<>
			<h1>ALL ASSETS</h1>
			<SearchContainer>
				{/* JOB CODE SEARCH BAR */}
				{jobsQuery.status === 'success' && (
					<div className='search-item-wrp'>
						<Select
							mode='multiple'
							allowClear
							style={{ width: '100%' }}
							placeholder='Job Code: search based on OR query'
							onChange={(e) => {
								setSearchFilters({ ...searchFilters, jobCodes: e });
							}}
						>
							{jobsQuery.data.data.map((job) => (
								<Select.Option key={job.job_code}>{job.job_code}</Select.Option>
							))}
						</Select>
					</div>
				)}
				{/* TAGS SEARCH BAR */}
				<div className='search-item-wrp'>
					<Select
						mode='multiple'
						allowClear
						style={{ width: '100%' }}
						placeholder='Tags: search based on AND query'
						onChange={(e) => {
							setSearchFilters({ ...searchFilters, tags: e });
						}}
					>
						{tagOptions}
					</Select>
				</div>
			</SearchContainer>
			<AssetsContainer query={assetsQuery} activeFilters={searchFilters} />
		</>
	);
}

const SearchContainer = styled.div``;

export async function getStaticProps({ preview = false }) {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery('assets', readAllAssets(preview));

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}
