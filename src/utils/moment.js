/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2020-03-23 16:47:02
*------------------------------------------------------- */

import momentTz from 'moment-timezone';

export const FORMAT_DATE = 'YYYY/MM/DD';

momentTz.updateLocale('en', {
	week: {
		dow: 1,
	},
});

momentTz.prototype.formatCustom = function (date) { // eslint-disable-line
	const diff = momentTz().diff(this, 'days');
	if (diff < 5) {
		return this.fromNow();
	}
	return this.format(FORMAT_DATE + ' HH:mm');
};

const moment = (date = null) => {
	if (date) {
		return momentTz(date).tz('Asia/Singapore');
	}
	return momentTz(new Date()).tz('Asia/Singapore');
};

export default moment;
