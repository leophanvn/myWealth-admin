/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2020-03-01 17:51:30
*------------------------------------------------------- */

import React from 'react';
// import PropTypes from 'prop-types';

import Head from 'src/components/Head';

import Index from 'src/containers/Index';

const IndexPage = (props) => {
	// const { } = props;

	return (
		<>
			<Head />
			<Index />
		</>
	);
};

IndexPage.propTypes = {
	// classes: PropTypes.object.isRequired,
};

IndexPage.defaultProps = {
	// classes: {},
};

export default IndexPage;
