import { useState } from 'react';
import { Switch } from 'antd';

import ItemWrapper from './ItemWrapper';
import SelectRestrictedClients from './SelectRestrictedClients';

export default function SwitchRestrictionItem({
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
