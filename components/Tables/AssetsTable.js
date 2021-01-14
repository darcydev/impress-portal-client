import styled from 'styled-components';
import { Table, Switch, message } from 'antd';
import { BsCloudDownload } from 'react-icons/bs';

import { updateAsset } from '../../lib/assets';

const API_URL = process.env.PUBLIC_API_URL;

export default function AssetsTable({ data }) {
	const handleSwitchChange = async (assetId, restricted) => {
		await updateAsset(assetId, { restricted });

		if (!restricted) {
			message.success('Asset visible to Client');
		}
	};

	return (
		<StyledTable
			dataSource={data}
			columns={[
				{
					title: 'Asset',
					render: (record) => (
						<img src={`${API_URL}${record.file?.formats?.thumbnail?.url}`} />
					),
				},
				{
					title: 'Job Code',
					render: (record) => record.job?.job_code,
				},
				{
					title: 'Created',
					render: (record) => record.created_at,
				},
				{
					title: 'Actions',
					dataIndex: '',
					render: (value, record) => (
						<>
							<a href={`${API_URL}${record.file?.url}`} target='_blank'>
								<BsCloudDownload />
							</a>
							<Switch
								checkedChildren='Visible'
								unCheckedChildren='Hidden'
								defaultChecked={value.restricted}
								onChange={(e) => {
									handleSwitchChange(value.id, e);
								}}
							/>
						</>
					),
				},
			]}
		/>
	);
}

const StyledTable = styled(Table)`
	.ant-table-cell {
		img {
			width: 50px;
			height: auto;
			border-radius: 50%;
		}
	}
`;
