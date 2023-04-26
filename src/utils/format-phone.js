/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-02-27 01:25:59
*------------------------------------------------------- */
const formatPhone = (phone) => {
	if (!phone) {
		return '--';
	}
	const cleaned = ('' + phone).replace(/\D/g, '');

	// eslint-disable-next-line prefer-regex-literals
	const phoneTest = new RegExp(/^((\+1)|1)? ?\(?(\d{4})\)?[ .-]?(\d{3})[ .-]?(\d{3})( ?(ext\.? ?|x)(\d*))?$/);

	const results = phoneTest.exec(cleaned);
	if (results !== null && results.length > 8) {
		return '(' + results[3] + ') ' + results[4] + '-' + results[5] + (typeof results[8] !== 'undefined' ? ' x' + results[8] : '');
	}

	return phone;
};

export default formatPhone;
