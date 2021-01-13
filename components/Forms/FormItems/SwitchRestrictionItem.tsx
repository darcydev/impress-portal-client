import React, { FunctionComponent, useState } from 'react';
import { Switch } from 'antd';

import ItemWrapper from './ItemWrapper';
import SelectRestrictedClients from './SelectRestrictedClients';

type ComponentProps = {
	name?: string;
	label?: string;
	required?: boolean;
	selectName?: string;
};

const SwitchRestrictionItem: FunctionComponent<ComponentProps> = ({
	name = 'restricted',
	label = 'Restricted',
	required = true,
	selectName = 'users_permissions_users',
}) => {
	const [switchChecked, setSwitchedChecked] = useState(false);

	return (
		<>
			<ItemWrapper name={name} label={label} required={required}>
				<Switch
					checkedChildren='Restricted'
					unCheckedChildren='Unrestricted'
					onChange={(e) => setSwitchedChecked(e)}
				/>
			</ItemWrapper>
			{switchChecked && (
				<SelectRestrictedClients
					name={selectName}
					label='Restricted to Clients'
					required={switchChecked}
				/>
			)}
		</>
	);
};

export default SwitchRestrictionItem;

/* export default function SwitchRestrictionItem({
	name = 'restricted',
	label = 'Restricted',
	required = true,
}) {
	const [switchChecked, setSwitchedChecked] = useState(false);

	return (
		<>
			<ItemWrapper name={name} label={label} required={required}>
				<Switch
					checkedChildren='Restricted'
					unCheckedChildren='Unrestricted'
					onChange={(e) => setSwitchedChecked(e)}
				/>
			</ItemWrapper>
			{switchChecked && (
				<SelectRestrictedClients
					name='users_permissions_users'
					label='Restricted to Clients'
					required={switchChecked}
				/>
			)}
		</>
	);
}
 */
