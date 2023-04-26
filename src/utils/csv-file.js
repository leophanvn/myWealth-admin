/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-02-27 09:59:16
*------------------------------------------------------- */
import { Modal } from 'antd';

import moment, { FORMAT_DATE } from 'src/utils/moment';

import download from 'downloadjs';
// import papaparse from 'papaparse';

const convertArrayOfObjectsToCSV = (args) => {
	let result;

	const data = args.data || null;
	if (data == null || !data.length) {
		return null;
	}

	const columnDelimiter = args.columnDelimiter || ',';
	const lineDelimiter = args.lineDelimiter || '\n';

	const titles = args.fields ?
		args.fields.map((el) => {
			return el.name;
		}) :
		Object.keys(data[0]);

	result = '';
	result += titles.join(columnDelimiter);
	result += lineDelimiter;

	data.forEach((item) => {
		let ctr = 0;
		args.fields.forEach((field) => {
			if (ctr > 0) result += columnDelimiter;

			const [primary, sub] = field.key.split('.');
			if (sub) {
				if (item[primary] && item[primary][sub]) {
					if (field.type === 'date') {
						result += '"' + (item[primary][sub] ? moment(item[primary][sub].replace(/"/g, '').replace(/'/g, '')).format(FORMAT_DATE + ' HH:mm') : '') + '"';
					} else {
						result += '"' + (item[primary][sub] ? (item[primary][sub] + '').replace(/"/g, '').replace(/'/g, '') : '') + '"';
					}
				} else if (item[primary] && item[primary][sub] === 0) {
					result += '0';
				} else {
					result += '';
				}
			} else {
				if (item[primary]) {
					if (field.type === 'date') {
						result += '"' + (item[primary] ? moment(item[primary].replace(/"/g, '').replace(/'/g, '')).format(FORMAT_DATE + ' HH:mm') : '') + '"';
					} else {
						result += '"' + (item[primary] ? (item[primary] + '').replace(/"/g, '').replace(/'/g, '') : '') + '"';
					}
				} else if (item[primary] === 0) {
					result += '0';
				} else {
					result += '';
				}
			}
			ctr++;
		});
		result += lineDelimiter;
	});

	return result;
};

const downloadCSV = ({ dataRaw, filename = 'Export.csv', fields }, next = f => f) => {
	if (dataRaw.length === 0) {
		Modal.error({
			title: 'Lỗi',
			content: 'Không có dữ liệu để xuất file.',
		});
		return next();
	}

	// let csv = papaparse.unparse(dataRaw);

	let csv = convertArrayOfObjectsToCSV({
		data: dataRaw,
		fields,
	});

	if (csv == null) return;

	if (!csv.match(/^data:text\/csv/i)) {
		csv = 'data:text/csv;charset=utf-8,\uFEFF' + csv;
	}

	const data = encodeURI(csv);

	// const link = document.createElement('a');
	// link.setAttribute('href', data);
	// link.setAttribute('download', filename);
	// link.click();

	download(data, filename);

	if (next && typeof next === 'function') {
		next();
	}
};

export default downloadCSV;
