import { useRouter } from 'next/router';

import { readAllJobs, readJobByJobCode } from '../../../lib/jobs';

export default function Brief({ job, preview }) {
	const router = useRouter();

	console.log('job :>> ', job);

	const { id, job_code } = job;

	if (job) {
		return (
			<div>
				<h1>{job_code}</h1>
			</div>
		);
	}
}

export async function getStaticProps({ params, preview = false }) {
	const job = await readJobByJobCode(params.jobCode, preview);

	return {
		props: { job, preview },
	};
}

export async function getStaticPaths() {
	const allJobs = await readAllJobs();

	// Get the paths we want to pre-render based on posts
	const paths = allJobs.data.map((job) => ({
		params: { jobCode: job.job_code },
	}));

	return {
		paths,
		fallback: false,
	};
}
