/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-02-25 08:53:36
*------------------------------------------------------- */

import isEqual from 'lodash/isEqual';
import reduce from 'lodash/reduce';

const diff = (a, b) => {
	const d = reduce(a, (result, value, key) => {
		return !b[key] || isEqual(value, b[key]) ? result : result.concat(key);
	}, []);

	return d.length;
};

export default diff;
