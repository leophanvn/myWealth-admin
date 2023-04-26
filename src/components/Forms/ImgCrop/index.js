/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-03-03 09:01:51
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const propTypes = {
	value: PropTypes.any,
	onChange: PropTypes.func,
};

const defaultProps = {
	value: '',
	onChange: f => f,
};

function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

function beforeUpload(file) {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('Image must smaller than 2MB!');
	}
	return isJpgOrPng && isLt2M;
}

const ImgCropper = (props) => {
	const { onChange, value, ...attrs } = props;

	const [imageUrl, setImageUrl] = React.useState(value);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		setImageUrl(value);
	}, [value]);

	const handleChange = React.useCallback(({ file }) => {
		setLoading(true);
		getBase64(file.originFileObj, (url) => {
			setImageUrl(url);
			setLoading(false);
		});
		onChange(file);
	}, [onChange]);

	const onPreview = React.useCallback(async (file) => {
		let src = file.url;
		if (!src) {
			src = await new Promise(resolve => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj);
				reader.onload = () => resolve(reader.result);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow.document.write(image.outerHTML);
	}, []);

	const uploadButton = React.useMemo(() => {
		return (
			<div>
				{loading ? <LoadingOutlined /> : <PlusOutlined />}
				<div style={{ marginTop: 8 }}>Upload</div>
			</div>
		);
	}, [loading]);

	return (
		<ImgCrop
			rotate
			shape="round"
			fillColor="white"
		>
			<Upload
				{...attrs}
				listType="picture-card"
				showUploadList={false}
				onChange={handleChange}
				onPreview={onPreview}
				beforeUpload={beforeUpload}
			>
				{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
			</Upload>
		</ImgCrop>
	);
};

ImgCropper.propTypes = propTypes;

ImgCropper.defaultProps = defaultProps;

export default ImgCropper;
