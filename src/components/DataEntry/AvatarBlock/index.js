/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-02-27 08:24:24
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import Avatar from 'src/components/DataEntry/Avatar';

const propTypes = {
	fullName: PropTypes.string.isRequired,
	avatar: PropTypes.string,
	email: PropTypes.string,
	role: PropTypes.string,
	size: PropTypes.number,
	style: PropTypes.object,
	className: PropTypes.number,
	sub: PropTypes.any,
};

const defaultProps = {
	fullName: null,
	avatar: null,
	role: null,
	email: null,
	style: {},
	size: 40,
	sub: null,
};

const AvatarBlock = (props) => {
	const { fullName, sub, style, className, avatar, role, email, size } = props;

	return (
		<div style={style} className={'d-flex align-items-center ' + className}>
			<Avatar
				name={fullName}
				src={avatar}
				size={size}
			/>
			<div className="ml-2">
				<strong>{fullName}</strong>
				{
					sub || <div className="text-muted line-height-1 fs-xs">{role || email}</div>
				}
			</div>
		</div>
	);
};

AvatarBlock.propTypes = propTypes;

AvatarBlock.defaultProps = defaultProps;

export default AvatarBlock;
