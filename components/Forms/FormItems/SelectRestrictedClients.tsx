import { Select } from 'antd';
import { useQuery } from 'react-query';

import ItemWrapper from './ItemWrapper';
import { readAllClients } from '../../../lib/users';

type ComponentProps = { name: string; label: string; required: boolean };

export default function SelectRestrictedClients({
	name,
	label,
	required,
}: ComponentProps) {
	const query = useQuery('users', readAllClients);

	const { status, data } = query;

	if (status === 'loading') {
		return <p>loading...</p>;
	}

	if (status === 'error') {
		return <p>error...</p>;
	}

	let clientOptions: any[] = [];

	for (let i = 0; i < data.length; i++) {
		const ele = data[i];

		clientOptions.push({ value: ele.id, label: ele.email });
	}

	return (
		<ItemWrapper name={name} label={label} required={required}>
			<Select
				mode='multiple'
				showSearch
				allowClear
				placeholder='Select Restricted Clients'
				options={clientOptions}
			/>
		</ItemWrapper>
	);
}
