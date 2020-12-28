import Router from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';

const API_URL = process.env.PUBLIC_API_URL;

const readJobs = async (route) => {
	const data = await axios.get(
		route,
		{},
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);

	if (data.errors) {
		throw new Error('Failed to fetch API');
	} else {
		return data;
	}
};

export const readAllJobs = async () => await readJobs(`${API_URL}/jobs`);

export const readJobById = async (id) =>
	await readJobs(`${API_URL}/jobs/${id}`);

export const readJobByJobCode = async (jobCode) => {
	if (!jobCode) {
		throw new Error('Job Code undefined');
	}

	// fetch all jobs
	const allJobs = await readAllJobs();

	// check if job existing by filtering only jobs which equal jobCode
	const job = allJobs.data.filter((job) => job.job_code == jobCode);

	// if one job found, return it. Otherwise, return null
	return job.length === 1 ? job[0] : null;
};

/**
 * Will check whether that jobCode already exists. If so, it will return that
 * existing job
 * Function is currently used in upload media function
 * @param {String} jobCode
 */
export const createJob = async (jobCode) => {
	const token = Cookie.get('token');

	if (!token) {
		Router.push('/login');
		return null;
	}

	if (!jobCode) {
		throw new Error('Job Code undefined');
	}

	// check if job already exists with that job code
	const existingJob = await readJobByJobCode(jobCode);
	// if so, simply return that job
	if (existingJob) {
		return existingJob;
	}

	const data = await axios.post(
		`${API_URL}/jobs`,
		{
			job_code: jobCode,
		},
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (data.errors) {
		throw new Error('Failed to fetch API');
	} else {
		return data.data;
	}
};
