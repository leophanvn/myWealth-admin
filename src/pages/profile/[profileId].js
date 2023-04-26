/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2020-04-07 10:09:53
*------------------------------------------------------- */

import React from 'react';
// import PropTypes from 'prop-types';

import Head from 'src/components/Head';

import Profile from 'src/containers/Profile';

const propTypes = {
	// classes: PropTypes.object.isRequired,
};

const defaultProps = {
	// classes: {},
};

const ProfilePage = (props) => {
	return (
		<>
			<Head title="Profile" />
			<Profile />
		</>
	);
};

ProfilePage.propTypes = propTypes;

ProfilePage.defaultProps = defaultProps;

export default ProfilePage;
