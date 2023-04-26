/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2020-12-01 17:03:18
*------------------------------------------------------- */

import moment, { FORMAT_DATE } from 'src/utils/moment';

const formatDate = (date, format = FORMAT_DATE + ' HH:mm', utc = true) => {
	if (!date) {
		return '--';
	}

	// eslint-disable-next-line no-unsafe-optional-chaining
	return (moment(date).format(format) + (utc ? ' (UTC' + moment(date).format('Z')?.split(':')?.[0] + ')' : '')).toUpperCase();
};

export const formatCustom = (date) => {
	if (!date) {
		return '';
	}
	const diff = moment().diff(date, 'days');
	if (diff < 5) {
		return moment(date).fromNow();
	}
	return formatDate(date);
};

export default formatDate;
