import Router from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';

const API_URL = process.env.PUBLIC_API_URL;

const readJobs = async (route) => {
	const { data } = await axios.get(route);

	if (data.errors) {
		throw new Error('Failed to fetch API');
	}

	return data;
};

export const readAllJobs = async () => {
	return await readJobs(`${API_URL}/jobs`);
};

export const readJobById = async (id) => {
	return await readJobs(`${API_URL}/jobs/${id}`);
};

export const readAllNonNullJobCodes = async () => {
	const allJobs = await readAllJobs();

	return allJobs
		.filter((job) => job.job_code !== null)
		.map((job) => job.job_code);
};

export const readJobByJobCode = async (jobCode) => {
	if (!jobCode) {
		throw new Error('Job Code undefined');
	}

	const allJobs = await readAllJobs();
	const job = allJobs.filter((job) => job.job_code == jobCode);

	// if one job found, return it. Otherwise, return null
	return job.length === 1 ? job[0] : null;
};

export const updateJob = async (id, values) => {
	const token = Cookie.get('token');

	if (!token) {
		Router.push('/login');
		return null;
	}

	const { job_code } = values;

	const { data } = await axios.put(
		`${API_URL}/jobs/${id}`,
		{
			job_code,
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
	}

	return data;
};

export const createJob = async () => {
	const token = Cookie.get('token');

	if (!token) {
		Router.push('/login');
		return null;
	}

	const { data } = await axios.post(
		`${API_URL}/jobs`,
		{},
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (data.errors) {
		throw new Error(data.errors);
	}

	return data;
};

/**
 * Will check whether that jobCode already exists. If so, it will return that
 * existing job
 * Function is currently used in upload media function
 * @param {String} jobCode
 */
/* export const createJob = async (jobCode) => {
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

	const { data } = await axios.post(
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
	}

	return data;
};
 */
