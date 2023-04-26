/* eslint-disable no-nested-ternary */
/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2020-03-01 17:38:42
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import AuthStorage from 'src/utils/auth-storage';
import { useRouter } from 'next/router';

const propTypes = {
	children: PropTypes.any,
};

const defaultProps = {
	children: null,
};

const LayoutUnauthenticated = (props) => {
	const { children } = props;
	const router = useRouter();

	const { query = {} } = router;

	React.useEffect(() => {
		if (AuthStorage.loggedIn) {
			router.replace(query.asPath ? decodeURIComponent(query.asPath) : '/');
		}
	}, [query.asPath, router]);

	return children;
};

LayoutUnauthenticated.propTypes = propTypes;
LayoutUnauthenticated.defaultProps = defaultProps;

LayoutUnauthenticated.getInitialProps = (ctx) => {
	if (AuthStorage.loggedIn) {
		if (ctx.res) {
			const { query = {} } = ctx;

			ctx.res.writeHead(302, { Location: query.asPath ? decodeURIComponent(query.asPath) : '/' });
			ctx.res.end();
		}
	}

	return {}; // You can pass some custom props to the component from here
};

export default LayoutUnauthenticated;
