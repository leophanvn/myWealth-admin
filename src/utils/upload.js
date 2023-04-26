/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-09-18 10:09:32
*------------------------------------------------------- */

import fetchApi from 'src/utils/fetch-api';

const upload = async (file, folder, next = f => f) => {
	const { name, renameFile, type } = file;

	if (!file) {
		next(new Error('File not found'));
		throw new Error('File not found');
	}

	const data = await fetchApi({
		url: '/containers/get-signed-url',
		options: {
			method: 'POST',
		},
		payload: {
			fileName: (folder ? folder + '/' : '') + (renameFile || (+new Date()) + '-' + name),
			contentType: type,
		},
	});

	const optionsS3 = {
		method: 'PUT',
		body: file,
		headers: {
			'Content-Type': type,
		},
	};

	const a = await fetch(data?.singedUrl, optionsS3);
	await a.text();

	next(null, data || {});
	return data || {};
};

export default upload;
