import { useState, useEffect } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { Select } from 'antd';

import { isLoggedIn } from '../../lib/auth';
import { readAllAssets } from '../../lib/assets';
import { readAllJobs } from '../../lib/jobs';
import AssetThumbnail from '../../components/Assets/AssetThumbnail';

const { Option } = Select;

export default function AssetsPage({ allAssets, preview }) {
	const [jobCodes, setJobCodes] = useState([]);
	const [searchFilters, setSearchFilters] = useState({
		jobCodes: [],
		tags: [],
	});

	// process.browser makes sure that the browser is running client-side
	if (process.browser && !isLoggedIn()) {
		Router.push('/');
		return null;
	}

	useEffect(async () => {
		const jobs = await readAllJobs();
		setJobCodes(jobs.data.map((job) => job.job_code));
	}, []);

	const jobCodeOptions = [];
	for (let i = 0; i < jobCodes.length; i++) {
		jobCodeOptions.push(<Option key={jobCodes[i]}>{jobCodes[i]}</Option>);
	}

	const tagOptions = [];
	for (let i = 0; i < 100; i++) {
		const value = `${i.toString(36)}${i}`;
		tagOptions.push(<Option key={value}>{value}</Option>);
	}

	// DO FILTERING
	// 1) job codes
	console.log('allAssets before filter :>> ', allAssets);
	if (searchFilters.jobCodes.length) {
		allAssets = allAssets.filter((asset) => {
			return searchFilters.jobCodes.includes(asset.job.job_code);
		});
	}

	// 2) tags

	// BUG: NOT WORKING
	// FIXME: search for tags not working
	// need to use Array.prototype.every to check two arrays against each other
	// assetTags = ["foo", "bar", "horse"];
	// searchTags = ["foo"];
	// remove any asset for which EVERY search tag is contained in assetTags array
	if (searchFilters.tags.length) {
		allAssets.filter((asset) => {
			searchFilters.tags.forEach((searchTag) => {
				console.log('searchTag :>> ', searchTag);

				return asset.tags.includes(searchTag);
			});
		});

		/* 		allAssets = allAssets.filter((asset) => {
			console.log('asset :>> ', asset.tags);
			console.log('searchFilters.tags :>> ', searchFilters.tags);

			// return searchFilters.tags.every(searchFilters.tags.includes(asset.tags));
		}); */
	}
	console.log('allAssets after filter :>> ', allAssets);

	return (
		<div>
			<h1>ALL ASSETS</h1>
			<SearchContainer>
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
						{jobCodeOptions}
					</Select>
				</div>
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
			<AssetsContainer>
				{allAssets &&
					allAssets.map((asset) => {
						const { id, tags, used_by_client, file, job } = asset;

						// TODO: legacy assets were uploaded without a file; can be removed later
						if (asset.file) {
							return (
								<AssetThumbnail
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
			</AssetsContainer>
		</div>
	);
}

const SearchContainer = styled.div``;

const AssetsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

export async function getStaticProps({ preview = false }) {
	const allAssets = await readAllAssets(preview);

	return {
		props: { allAssets, preview },
	};
}
