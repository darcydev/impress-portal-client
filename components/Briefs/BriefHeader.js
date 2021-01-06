import Link from 'next/link';
import { PageHeader, Popconfirm, Button, Row, Statistic } from 'antd';

export default function BriefHeader({ brief }) {
	return (
		<PageHeader
			onBack={() => window.history.back()}
			title={brief.brief_title}
			extra={[
				<Button key='1'>
					<Link href={`/clients/${brief.job?.client}`}>View Client</Link>
				</Button>,
				<Button key='2'>
					<Link href={`/jobs/${brief.job?.id}`}>View Job</Link>
				</Button>,
				<Button key='3' type='primary'>
					<Link href={`/briefs/edit/${brief.id}`}>Update Brief</Link>
				</Button>,
				<Popconfirm
					title='Are you sure?'
					okText='Yes, delete it'
					okType='danger'
					key='4'
				>
					<Button danger>Delete</Button>
				</Popconfirm>,
			]}
		>
			<Row>
				<Statistic title='Status' value={brief.brief_status} />
				<Statistic title='Type' value={brief.brief_type} />
				<Statistic title='Type' value={brief.brief_type} />
			</Row>
			<Row>
				<Statistic
					title='Created'
					value={new Date(brief.created_at).toLocaleDateString()}
				/>
				<Statistic
					title='Updated'
					value={new Date(brief.updated_at).toLocaleDateString()}
				/>
				<Statistic
					title='Approved'
					value={new Date(brief.approved_at).toLocaleDateString()}
				/>
			</Row>
		</PageHeader>
	);
}
