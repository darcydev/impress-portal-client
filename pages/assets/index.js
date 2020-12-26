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

export default function AssetsPage({ allAssets, preview }) {
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

	// 2) tags

	// BUG: NOT WORKING
	// FIXME: search for tags not working
	// need to use Array.prototype.every to check two arrays against each other
	// assetTags = ["foo", "bar", "horse"];
	// searchTags = ["foo"];
	// remove any asset for which EVERY search tag is contained in assetTags array
	/* 	if (searchFilters.tags.length) {
		allAssets.filter((asset) => {
			searchFilters.tags.forEach((searchTag) => {
				console.log('searchTag :>> ', searchTag);

				return asset.tags.includes(searchTag);
			});
		}); */

	/* 		allAssets = allAssets.filter((asset) => {
			console.log('asset :>> ', asset.tags);
			console.log('searchFilters.tags :>> ', searchFilters.tags);

			// return searchFilters.tags.every(searchFilters.tags.includes(asset.tags));
		});
	} */

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
							placeholder='Job Code'
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
						placeholder='Tags'
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
