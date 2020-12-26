import { GrDocumentPdf } from 'react-icons/gr';
import { AiOutlineFileJpg } from 'react-icons/ai';

export default function AssetFormat({ assetFormat }) {
	switch (assetFormat) {
		case 'pdf':
			return <GrDocumentPdf size={30} />;
		case 'jpeg':
			return <AiOutlineFileJpg size={30} />;
		default:
			return <span />;
	}
}
