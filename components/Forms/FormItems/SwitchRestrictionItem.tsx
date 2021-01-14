import React, { FunctionComponent, useState } from 'react';
import { Switch } from 'antd';

import ItemWrapper from './ItemWrapper';
import SelectRestrictedClients from './SelectRestrictedClients';

type ComponentProps = {
	name?: string;
	label?: string;
	required?: boolean;
	selectName?: string;
	defaultChecked?: boolean;
};

const SwitchRestrictionItem: FunctionComponent<ComponentProps> = ({
	name = 'restricted',
	label = 'Restricted',
	required = true,
	selectName = 'users_permissions_users',
	defaultChecked = false,
}) => {
	const [switchChecked, setSwitchedChecked] = useState(false);

	return (
		<>
			<ItemWrapper name={name} label={label} required={required}>
				<Switch
					checkedChildren='Restricted'
					unCheckedChildren='Unrestricted'
					defaultChecked={defaultChecked}
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
