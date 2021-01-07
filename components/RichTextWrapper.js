import dynamic from 'next/dynamic';

const RichTextWrapper = dynamic(import('./QuillEditor'), {
	loading: () => <p>rich text editor is loading...</p>,
	ssr: false,
});

export default RichTextWrapper;
