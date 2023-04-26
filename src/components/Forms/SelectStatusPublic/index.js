/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2021-01-25 21:46:21
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { STATUS_PUBLIC } from 'src/constants/optionsSelect';

import { Select } from 'antd';

const propTypes = {
	showalloption: PropTypes.bool,
};

const defaultProps = {
	showalloption: false,
};

const SelectStatusPublic = (props) => {
	const { showalloption, ...attr } = props;

	return (
		<Select
			style={{
				width: '100%',
				minWidth: 200,
			}}
			showSearch
			optionFilterProp="children"
			placeholder="Select..."
			{...attr}
			allowClear
		>
			{
				showalloption &&
				<Select.Option
					value="all"
				>
					ALL
				</Select.Option>
			}
			{
				STATUS_PUBLIC.map((el) => {
					return (
						<Select.Option
							value={el.value}
							key={el.value}
						>
							{el.label}
						</Select.Option>
					);
				})
			}
		</Select>
	);
};

SelectStatusPublic.propTypes = propTypes;

SelectStatusPublic.defaultProps = defaultProps;

export default SelectStatusPublic;
