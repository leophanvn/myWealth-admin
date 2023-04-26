/* --------------------------------------------------------
*
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-02-14 22:17:33
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

let timeout = null;
const handleSearch = (e, search, isPressEnter) => {
	e.persist();
	clearTimeout(timeout);
	if (isPressEnter) return search(e.target.value);
	timeout = setTimeout(() => {
		search(e.target.value);
	}, 500);
};

const InputSearch = (props) => {
	const { onChange, value, ...rest } = props;

	return (
		<Input.Search
			placeholder="Input search text"
			{...rest}
			defaultValue={value}
			onChange={(e) => handleSearch(e, onChange)}
			onPressEnter={(e) => handleSearch(e, onChange, true)}
			allowClear
		/>
	);
};

InputSearch.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string,
};

InputSearch.defaultProps = {
	onChange: f => f,
};

export default InputSearch;
