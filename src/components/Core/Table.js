/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-02-26 09:50:49
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'antd';

const propTypes = {
	columns: PropTypes.array,
	onChange: PropTypes.func,
	limit: PropTypes.number,
	total: PropTypes.number,
	skip: PropTypes.any,
};

const defaultProps = {
	columns: [],
	onChange: f => f,
	limit: 0,
	total: 0,
	skip: 0,
};

const TableC = (props) => {
	const { columns, limit, total, skip, onChange, ...attrs } = props;

	const handleChangeTable = React.useCallback((val) => {
		onChange(((val.current - 1) * limit) || '', val);
	}, [limit, onChange]);

	return (
		<Table
			rowKey="id"
			size="middle"
			columns={columns}
			pagination={{
				current: (skip / limit) + 1,
				total,
				pageSize: limit,
				showTotal: (t, range) => `${range[0]}-${range[1]} of ${t} items`,
				showSizeChanger: false,
			}}
			{...attrs}
			onChange={handleChangeTable}
		/>
	);
};

TableC.propTypes = propTypes;

TableC.defaultProps = defaultProps;

export default TableC;
