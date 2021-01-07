import Router from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';

const API_URL = process.env.PUBLIC_API_URL;

const readJobs = async (route) => {
	const { data } = await axios.get(route);

	if (data.errors) {
		throw new Error(data.errors);
	}

	return data;
};

export const readAllJobs = async () => {
	return await readJobs(`${API_URL}/jobs`);
};

export const readJobById = async (id) => {
	return await readJobs(`${API_URL}/jobs/${id}`);
};

export const readAllJobCodes = async () => {
	const allJobs = await readAllJobs();
	const allJobCodes = allJobs.map((job) => job.job_code);
	// remove duplicates
	return [...new Set(allJobCodes)];
};

export const readAllNonNullJobCodes = async () => {
	const allJobs = await readAllJobs();

	return allJobs
		.filter((job) => job.job_code !== null)
		.map((job) => {
			const { id, job_code } = job;

			return { id, job_code };
		});
};

export const readJobByJobCode = async (jobCode) => {
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

	values = { ...values, job_code: values.job_code.toUpperCase() };

	const { data } = await axios.put(`${API_URL}/jobs/${id}`, values, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	if (data.errors) {
		throw new Error(data.errors);
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
