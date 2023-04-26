/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2020-12-01 17:03:18
*------------------------------------------------------- */

import queryString from 'query-string';

const buildUrl = (query = {}, url = '') => {
	const q = Object.keys(query).reduce((preVal, key) => {
		if (query[key] === '') {
			return preVal;
		}
		return {
			...preVal,
			[key]: query[key],
		};
	}, {});

	const link = queryString.stringifyUrl({ url, query: q });

	return link;
};
export default buildUrl;
