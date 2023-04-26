/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-02-26 11:19:45
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { Tag } from 'antd';

import { USER_STATUS } from 'src/constants/optionsSelect';

import getLabel from 'src/utils/get-label';

const propTypes = {
	value: PropTypes.string.isRequired,
};

const defaultProps = {
	value: null,
};

const UserStatus = (props) => {
	const { value } = props;

	let color = '#808080';
	if (value === 'active') {
		color = '#87d068';
	}
	if (value === 'inactive') {
		color = 'red';
	}
	return (
		<Tag
			color={color}
			key={value}
			style={{
				fontSize: '10px',
				borderRadius: '2px',
				padding: '0 7px',
				lineHeight: '14px',
				textTransform: 'capitalize',
			}}
		>
			{getLabel(USER_STATUS, value)}
		</Tag>
	);
};

UserStatus.propTypes = propTypes;

UserStatus.defaultProps = defaultProps;

export default UserStatus;
