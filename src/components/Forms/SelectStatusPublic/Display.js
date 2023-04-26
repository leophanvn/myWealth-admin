/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-02-26 15:44:12
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { STATUS_PUBLIC } from 'src/constants/optionsSelect';

import { Tag } from 'antd';

import getLabel from 'src/utils/get-label';

const propTypes = {
	value: PropTypes.string.isRequired,
};

const defaultProps = {
	value: null,
};

const StatusDisplay = (props) => {
	const { value } = props;

	let color = '#808080';
	if (value === 'published') {
		color = '#87d068';
	}
	if (value === 'archive') {
		color = 'red';
	}
	return (
		<Tag color={color} key={value} className="text-capitalize">
			{getLabel(STATUS_PUBLIC, value)}
		</Tag>
	);
};

StatusDisplay.propTypes = propTypes;

StatusDisplay.defaultProps = defaultProps;

export default StatusDisplay;
