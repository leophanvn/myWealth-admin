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

import Articles from 'src/containers/Articles/Articles';

const ArticlesPage = (props) => {
	// const { } = props;

	return (
		<>
			<Head title="Articles" />
			<Articles />
		</>
	);
};

ArticlesPage.propTypes = {
	// classes: PropTypes.object.isRequired,
};

ArticlesPage.defaultProps = {
	// classes: {},
};

export default ArticlesPage;
