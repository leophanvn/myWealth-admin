/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-02-23 22:24:30
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { useUpdateEffect } from 'react-use';

import { Button, Upload } from 'antd';

import { UploadOutlined } from '@ant-design/icons';

import uploadFileFunc from 'src/utils/upload';

const propTypes = {
	value: PropTypes.any,
	onChange: PropTypes.func,
	multiple: PropTypes.bool,
};

const defaultProps = {
	value: null,
	onChange: f => f,
	multiple: false,
};

const UploadFile = (props) => {
	const { value, onChange, multiple, ...attr } = props;

	const [loading, setLoading] = React.useState(false);

	const [fileList, setFileList] = React.useState(value ? (!multiple ? [value] : value).map((url, index) => {
		return { url, name: (url), uid: index, status: 'done' };
	}) : []);

	// useUpdateEffect(() => {
	// 	if (multiple) {
	// 		onChange(fileList.map((el) => {
	// 			return el.url;
	// 		}));
	// 	} else {
	// 		onChange(fileList?.[0]?.url);
	// 	}
	// }, [fileList]);

	useUpdateEffect(() => {
		setFileList(value ? (!multiple ? [value] : value).map((url, index) => {
			return { url, name: (url), uid: index, status: 'done' };
		}) : []);
	}, [value]);

	const handleChange = (e) => {
		setFileList((state) => {
			if (multiple) {
				const newList = state.filter(el => {
					return el.uid !== e.uid;
				});

				onChange(newList.map((el) => {
					return el.url;
				}));

				return newList;
			}

			onChange(null);
			return [];
		});
	};

	const handleUpload = React.useCallback(async (request) => {
		setLoading(true);
		const { file, onSuccess, onError } = request;

		try {
			const fileR = await uploadFileFunc(file, 'articles');

			setFileList((state) => {
				if (multiple) {
					const newList = [
						{
							...fileR,
							name: (fileR.url),
						},
						...state,
					];

					onChange(newList.map((el) => {
						return el.url;
					}));

					return newList;
				}
				onChange((fileR.url));
				return [{
					...fileR,
					name: (fileR.url),
				}];
			});

			onSuccess({
				...fileR,
				name: (fileR.url),
			});
		} catch (error) {
			onError(error);
		} finally {
			setLoading(false);
		}
	}, [multiple, onChange]);

	return (
		<div className="d-block">
			<Upload
				customRequest={handleUpload}
				{...attr}
				fileList={fileList}
				onRemove={handleChange}
			>
				<Button loading={loading}>
					<UploadOutlined /> Click to Upload
				</Button>
			</Upload>
		</div>
	);
};

UploadFile.propTypes = propTypes;

UploadFile.defaultProps = defaultProps;

export default UploadFile;
