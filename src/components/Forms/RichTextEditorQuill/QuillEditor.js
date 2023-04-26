/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-02-26 20:55:28
*------------------------------------------------------- */
import React from 'react';
import PropTypes from 'prop-types';
import TextEditor from 'react-quill';
import uploadFileFunc from 'src/utils/upload';

// import AuthStorage from 'src/utils/auth-storage';
// import URL from 'src/constants/urls';

// const { API_URL } = URL;

function imageHandler() {
	const input = document.createElement('input');
	input.setAttribute('type', 'file');
	input.setAttribute('accept', 'image/*');
	input.click();
	input.onchange = async () => {
		const file = input.files[0];

		const fileR = await uploadFileFunc(file, 'articles');

		if (fileR.url) {
			const range = this.quill.getSelection();

			// this part the image is inserted
			// by 'image' option below, you just have to put src(link) of img here.
			this.quill.insertEmbed(range.index, 'image', fileR.url);
		}
	};
}

const propTypes = {
	onBlur: PropTypes.func,
	onFocus: PropTypes.func,
};

const defaultProps = {
	onBlur: f => f,
	onFocus: f => f,
};

const QuillEditor = (props) => {
	const { onBlur, onFocus, ...rest } = props;

	const Font = TextEditor.Quill.import('formats/font'); // <<<< TextEditor exports it
	Font.whitelist = ['Times New Roman', 'monospace', 'roboto']; // allow ONLY these fonts and the default
	TextEditor.Quill.register(Font, true);

	return (
		<TextEditor
			theme="snow"
			{...rest}
			modules={{
				toolbar: {
					container: [
						[{ 'font': Font.whitelist }, { 'size': ['small', false, 'large', 'huge'] }, { 'header': [1, 2, 3, 4, 5, 6, false] }],
						['bold', 'italic', 'underline', 'strike'],
						['blockquote', 'code-block'],
						['link', 'image', 'video'],
						['link'],
						[{ 'color': [] }, { 'background': [] }],
						[{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }, { 'indent': '-1' }, { 'indent': '+1' }],
						[{ 'script': 'sub' }, { 'script': 'super' }],
						// [{ 'direction': 'rtl' }],
						['clean'],
					],
					handlers: {
						image: imageHandler,
					},
				},
				// handlers: {
				// 	// handlers object will be merged with default handlers object
				// 	'image': (value) => {
				// 		console.log('value', value);
				// 		this.quill.format('image', value);
				// 	},
				// },
			}}
		/>
	);
};

QuillEditor.propTypes = propTypes;

QuillEditor.defaultProps = defaultProps;

export default QuillEditor;
