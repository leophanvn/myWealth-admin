/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2021-09-18 09:29:03
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import classes from './style.module.less';

const propTypes = {
	children: PropTypes.any.isRequired,
	actions: PropTypes.any,
	title: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.object,
	footer: PropTypes.any,
	noPadding: PropTypes.bool,
};

const defaultProps = {
	children: null,
	actions: null,
	footer: null,
	title: '',
	className: '',
	style: {},
	noPadding: false,
};

const Card = (props) => {
	const { children, footer, title, actions, className, style, noPadding } = props;

	return (
		<div style={style} className={classes.box + ' ' + className}>
			{
				(title || actions) &&
				<div className={classes.header}>
					<h3>{title}</h3>
					<div className="ml-4">
						{actions}
					</div>
				</div>
			}
			<div className={classes.body + (noPadding ? ' p-0' : '')}>
				{children}
			</div>
			{
				footer &&
				<div className={classes.footer}>
					{footer}
				</div>
			}
		</div>
	);
};

Card.propTypes = propTypes;

Card.defaultProps = defaultProps;

export default Card;
