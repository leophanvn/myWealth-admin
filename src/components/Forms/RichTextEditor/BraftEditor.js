/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2021-03-03 14:51:00
*------------------------------------------------------- */

import React from 'react';
import BraftEditor from 'braft-editor';

import { message } from 'antd';

import uploadFileFunc from 'src/utils/upload';

const propTypes = {
	// classes: PropTypes.object.isRequired,
};

const defaultProps = {
	// classes: {},
};

const RichTextEditor = (props) => {
	const { value, onChange = f => f, ...attr } = props;

	const handleEditorChange = (val) => {
		onChange(val);
	};

	return (
		<div className="" suppressHydrationWarning>
			<BraftEditor
				value={BraftEditor.createEditorState(value)}
				className="rich-editor ant-input w-100"
				language="en"
				controls={[
					'font-family', 'font-size', 'headings', 'separator',
					'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
					'superscript', 'subscript', 'remove-styles', 'separator', 'text-indent', 'text-align', 'separator',
					'list-ul', 'list-ol', 'blockquote', 'code', 'link', 'separator', 'media', 'separator',
					'clear', 'fullscreen', 'undo', 'redo',
				]}
				media={{
					language: 'en',
					accepts: {
						image: 'image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg',
						video: 'video/mp4',
						audio: 'audio/mp3',
					},
					validateFn: (file) => {
						const maxSize = 2;
						if (file.size >= 1024 * 1024 * maxSize) {
							message.error('Not allowed to add files larger than ' + maxSize + 'MB');
						}
						return file.size < 1024 * 1024 * maxSize;
					},
					uploadFn: async (param) => {
						try {
							const fileR = await uploadFileFunc(param.file);

							param.success({
								url: fileR.url,
								meta: {
									id: (+new Date()),
									title: param.file?.name || 'img',
									alt: param.file?.name || '#',
									loop: true,
									autoPlay: true,
									controls: true,
									poster: fileR.url,
								},
							});
						} catch (error) {
							param.error({
								msg: error.message || error,
							});
						}
					},
				}}
				imageResizable
				{...attr}
				onChange={handleEditorChange}
				handlePastedText={handleEditorChange}
			/>
		</div>
	);
};

RichTextEditor.propTypes = propTypes;

RichTextEditor.defaultProps = defaultProps;

export default RichTextEditor;
