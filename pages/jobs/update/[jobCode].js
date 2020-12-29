import Cookie from 'js-cookie';
import BriefingFormClient from '../../../components/Forms/BriefingFormClient';

import BriefingFormStudio from '../../../components/Forms/BriefingFormStudio';
import { readAllJobs, readJobByJobCode } from '../../../lib/jobs';

export default function Brief({ job, preview }) {
	if (!job) {
		return <div>error! no job found</div>;
	}

	const token = Cookie.get('token');

	console.log('token :>> ', token);

	return (
		<div>
			<h1>Brief</h1>
			<div className='form-wrp'>
				{/* TODO change this be based on user's role (Studio or Client) */}
				{token ? <BriefingFormStudio job={job} /> : <BriefingFormClient />}
			</div>
		</div>
	);
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
