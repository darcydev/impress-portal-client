import { useQuery } from 'react-query';
import { Select } from 'antd';

import ItemWrapper from './ItemWrapper';
import { readAllNonNullClientCodes } from '../../../lib/clients';

export default function SelectClientCodeItem({
	name = 'client',
	label = 'Client',
	required = false,
}) {
	const query = useQuery('clientCodes', readAllNonNullClientCodes);

	const { status, data } = query;

	if (status === 'loading') {
		return <p>loading...</p>;
	}

	if (status === 'error') {
		return <p>error...</p>;
	}

	let clientCodeOptions = [];

	for (let i = 0; i < data.length; i++) {
		const value = data[i];

		clientCodeOptions.push({ value: value.id, label: value.client_code });
	}

	return (
		<ItemWrapper name={name} label={label} required={required}>
			<Select
				showSearch
				allowClear
				placeholder='Select Client Code'
				options={clientCodeOptions}
			/>
		</ItemWrapper>
	);
}
