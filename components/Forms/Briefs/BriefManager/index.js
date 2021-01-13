import { useState } from 'react';
import { Button } from 'antd';

import Orientation from './Orientation';
import Animation from './Animation';
import AssetUploadForm from '../../AssetUploadForm';

export default function BriefManager({ brief }) {
	const [formType, setFormType] = useState('Orientation');

	console.log('formType :>> ', formType);
	console.log('brief :>> ', brief);

	const showRelevantForm = () => {
		switch (formType) {
			case 'Orientation':
				return <Orientation brief={brief} passChildData={setFormType} />;
			case 'Video/Animation':
				return <Animation brief={brief} />;
			default:
				return (
					<div>
						<p>{formType} form not built yet...</p>
						<Button type='primary' onClick={() => setFormType('Orientation')}>
							Go back to Orientation form
						</Button>
					</div>
				);
		}
	};

	const relevantForm = showRelevantForm();

	return (
		<div>
			{relevantForm}
			<AssetUploadForm briefId={brief.id} jobId={brief.job?.id} />
		</div>
	);
}
