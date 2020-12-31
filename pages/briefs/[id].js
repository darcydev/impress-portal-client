import Link from 'next/link';
import { useQuery } from 'react-query';

import { readUserRole } from '../../lib/auth';
import { readAllBriefs, readBriefById } from '../../lib/briefs';

export default function Brief({ brief, preview }) {
	const userRoleQuery = useQuery('userRole', readUserRole);

	if (userRoleQuery.status === 'error') {
		return <div>error...</div>;
	}

	if (userRoleQuery.status === 'loading') {
		return <div>loading...</div>;
	}

	if (userRoleQuery.data !== 'Manager') {
		return <p>forbidden...</p>;
	}

	console.log('brief :>> ', brief);

	const {
		id,
		brief_title,
		assets,
		brand_assets_style_guide_on_file,
		brief_audiences,
		brief_status,
		brief_type,
		budget,
		created_at,
		updated_at,
		date_approved,
	} = brief;

	return (
		<div>
			<p>Brief title: {brief_title}</p>
			<Link href={`/briefs/edit/${id}`}>Edit</Link>
		</div>
	);
}

export async function getStaticProps({ params, preview = false }) {
	const brief = await readBriefById(params.id, preview);

	return {
		props: { brief, preview },
	};
}

export async function getStaticPaths() {
	const allBriefs = await readAllBriefs();

	const paths = allBriefs.map((brief) => ({
		params: { id: brief.id.toString() },
	}));

	return {
		paths,
		fallback: false,
	};
}
