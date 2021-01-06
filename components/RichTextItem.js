import dynamic from 'next/dynamic';

const RichTextItem = dynamic(import('./QuillEditor'), {
	loading: () => <p>rich text editor is loading...</p>,
	ssr: false,
});

export default RichTextItem;
