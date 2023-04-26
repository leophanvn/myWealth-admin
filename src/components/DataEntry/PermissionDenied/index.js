/* --------------------------------------------------------
*
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-02-11 15:48:20
*------------------------------------------------------- */

import React from 'react';
// import PropTypes from 'prop-types';

import Image from 'next/image';

const PermissionDenied = (props) => {
	return (
		<div
			style={{
				textAlign: 'center',
				padding: '100px 0',
				fontSize: '30px',
				color: '#868686',
			}}
		>
			<Image
				src="/assets/images/denied.jpg"
				height={300}
				width={300}
				alt="#"
			/>
			<p>Error: Permission denied</p>
		</div>
	);
};

PermissionDenied.propTypes = {
	// classes: PropTypes.object.isRequired,
};

PermissionDenied.defaultProps = {
	// classes: {},
};

export default PermissionDenied;
