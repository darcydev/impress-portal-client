import ReactQuill from 'react-quill';

export default function QuillEditor({ passChildData, defaultValue }) {
	const handleChange = (e) => {
		passChildData(e);
	};

	return (
		<ReactQuill
			theme='snow'
			onChange={(e) => handleChange(e)}
			defaultValue={defaultValue}
		/>
	);
}
