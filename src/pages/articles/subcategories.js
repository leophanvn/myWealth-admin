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

import Subcategories from 'src/containers/Articles/Subcategories/';

const SubcategoriesPage = (props) => {
	// const { } = props;

	return (
		<>
			<Head title="Subcategories | Articles" />
			<Subcategories />
		</>
	);
};

SubcategoriesPage.propTypes = {
	// classes: PropTypes.object.isRequired,
};

SubcategoriesPage.defaultProps = {
	// classes: {},
};

export default SubcategoriesPage;
