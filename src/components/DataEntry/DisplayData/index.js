/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-02-14 13:25:36
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import classes from './style.module.less';

const propTypes = {
	icon: PropTypes.node,
	label: PropTypes.any,
	value: PropTypes.any,
};

const defaultProps = {
	icon: null,
	label: null,
	value: null,
};

const DisplayData = (props) => {
	const { icon, label, value } = props;

	return (
		<div className={classes.infoItem}>
			<div className={classes.label}>
				{
					icon &&
					<div className={classes.icon}>
						{icon}
					</div>
				}
				{label}
			</div>
			<div className={classes.value}>
				{value || '--'}
			</div>
		</div>
	);
};

DisplayData.propTypes = propTypes;

DisplayData.defaultProps = defaultProps;

export default DisplayData;
