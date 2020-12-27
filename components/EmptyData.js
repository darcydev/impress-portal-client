import styled from 'styled-components';
import { Empty } from 'antd';

export default function EmptyData({ children }) {
	return (
		<StyledEmpty description={<span>No data found</span>}>
			{children}
		</StyledEmpty>
	);
}

const StyledEmpty = styled(Empty)`
	margin: 20px 0;
`;
