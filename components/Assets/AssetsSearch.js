import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Select, Input } from 'antd';

import { readAllNonNullJobCodes } from '../../lib/jobs';

export default function AssetsSearch({ assets, setFilteredData }) {
	const [searchFilters, setSearchFilters] = useState({
		jobCodes: [],
		tags: [],
		description: '',
	});

	useEffect(() => {
		setFilteredData(tempData);
	}, [searchFilters]);

	const jobCodesQuery = useQuery('jobCodes', readAllNonNullJobCodes);

	const { status, data } = jobCodesQuery;

	if (status === 'loading') {
		return <p>loading...</p>;
	}

	if (status === 'error') {
		return <p>error...</p>;
	}

	let jobCodeOptions = [];
	for (let i = 0; i < data.length; i++) {
		const value = data[i];
		jobCodeOptions.push({ value: value.id, label: value.job_code });
	}

	const tagOptions = [];
	for (let i = 0; i < 10; i++) {
		const value = `${i.toString(36)}${i}`;
		tagOptions.push({ value });
	}

	/* FILTERING */
	let tempData = assets;

	const { description, jobCodes, tags } = searchFilters;

	if (jobCodes.length) {
		tempData = tempData.filter(
			(asset) => asset.job && jobCodes.includes(asset.job.id)
		);
	}

	if (tags.length) {
		// TODO: REFACTOR -> ASK STACK OVERFLOW HOW TO REFACTOR THIS
		tempData = tempData.filter((asset) => {
			let assetIncluded = true;

			tags.forEach((tag) => {
				const searchTagInAssetTagArray = asset.tags?.includes(tag);

				if (!searchTagInAssetTagArray) assetIncluded = false;
			});

			return asset.tags && assetIncluded;
		});
	}

	if (description) {
		tempData = tempData.filter(
			(asset) =>
				asset.asset_description && asset.asset_description.includes(description)
		);
	}

	return (
		<StyledContainer>
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
		</StyledContainer>
	);
}

const StyledContainer = styled.div`
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
