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

import Categories from 'src/containers/Articles/Categories/';

const CategoriesPage = (props) => {
	// const { } = props;

	return (
		<>
			<Head title="Categories | Articles" />
			<Categories />
		</>
	);
};

CategoriesPage.propTypes = {
	// classes: PropTypes.object.isRequired,
};

CategoriesPage.defaultProps = {
	// classes: {},
};

export default CategoriesPage;
