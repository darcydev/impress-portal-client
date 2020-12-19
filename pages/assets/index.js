import Link from 'next/link';
import Router from 'next/router';

import { isLoggedIn } from '../../lib/auth';
import { readAllAssets } from '../../lib/assets';

export default function AssetsPage({ allAssets, preview }) {
	// process.browser makes sure that the browser is running client-side
	if (process.browser && !isLoggedIn()) {
		Router.push('/');
		return null;
	}

	return (
		<div>
			<h2>list of all assets</h2>
			{allAssets &&
				allAssets.map((asset) => {
					const {
						id,
						tags,
						created_at,
						updated_at,
						used_by_client,
						file,
						job,
					} = asset;

					if (asset.file) {
						return (
							<div key={id}>
								<h3>Asset thumbnail</h3>
								<p>{file.name}</p>
							</div>
						);
					}
				})}
		</div>
	);
}

export async function getStaticProps({ preview = false }) {
	const allAssets = await readAllAssets(preview);

	return {
		props: { allAssets, preview },
	};
}
