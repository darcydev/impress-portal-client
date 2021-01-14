import styled from 'styled-components';
import { useQuery } from 'react-query';

import BriefHeader from '../../components/Briefs/BriefHeader';
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

	return (
		<StyledContainer>
			<BriefHeader brief={brief} />
		</StyledContainer>
	);
}

const StyledContainer = styled.div``;

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
		fallback: true,
	};
}
