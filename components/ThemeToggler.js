import { useContext } from 'react';
import styled from 'styled-components';
import { Switch } from 'antd';
import { IoMdMoon as Moon, IoMdSunny as Sun } from 'react-icons/io';

import { ThemeContext } from '../context/ThemeContext';

export default function ThemeToggler() {
	const { theme, setThemeReducer } = useContext(ThemeContext);

	return (
		<StyledSwitch
			checkedChildren={<Moon />}
			unCheckedChildren={<Sun />}
			defaultChecked
			onChange={() => setThemeReducer()}
		/>
	);
}

const StyledSwitch = styled(Switch)`
	.ant-switch-inner {
		display: flex;
		align-items: center;
	}
`;
