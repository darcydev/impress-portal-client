import { useQuery } from 'react-query';

import { readAllNonNullClientCodes } from '../../../lib/clients';
import { readAllNonNullJobCodes } from '../../../lib/jobs';

import { JOB_TYPES } from '../../../constants/jobTypes';
import { BRIEF_STATUS } from '../../../constants/briefStatus';

export const jobTypeFilters = () => {
	const filters = JOB_TYPES;

	filters.forEach((obj) => {
		obj.text = obj.label;
	});

	return filters;
};

export const briefStatusFilters = () => {
	const filters = BRIEF_STATUS;

	filters.forEach((obj) => {
		obj.text = obj.label;
	});

	return filters;
};

export const jobCodeFilters = () => {
	const query = useQuery('jobCodes', readAllNonNullJobCodes);

	const { status, data } = query;

	if (status !== 'success') {
		return null;
	}

	const filters = data.map((job) => {
		return {
			text: job.job_code,
			value: job.job_code,
		};
	});

	return filters;
};

export const clientCodeFilters = () => {
	const query = useQuery('clientCodes', readAllNonNullClientCodes);

	const { status, data } = query;

	if (status !== 'success') {
		return null;
	}

	const filters = data.map((client) => {
		return {
			text: client.client_code,
			value: client.client_code,
		};
	});

	return filters;
};
