/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-02-26 09:50:34
*------------------------------------------------------- */
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	children: PropTypes.any,
	title: PropTypes.any,
};

const defaultProps = {
	children: null,
	title: null,
};

const PageHeader = (props) => {
	const { children, title } = props;

	return (
		<div className="mb-3 d-flex align-items-center position-relative">
			<h2 className="mb-0 flex-1">{title}</h2>
			{
				children
			}
		</div>
	);
};

PageHeader.propTypes = propTypes;

PageHeader.defaultProps = defaultProps;

export default PageHeader;
