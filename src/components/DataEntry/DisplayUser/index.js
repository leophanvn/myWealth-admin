/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-02-27 08:24:24
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { Popover } from 'antd';

import { withRouter } from 'next/router';

import formatPhone from 'src/utils/format-phone';
import buildUrl from 'src/utils/build-url';

import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlinePhone } from 'react-icons/ai';

import Avatar from 'src/components/DataEntry/Avatar';

const propTypes = {
	data: PropTypes.object.isRequired,
	router: PropTypes.object,
	style: PropTypes.object,
	className: PropTypes.number,
	sub: PropTypes.any,
};

const defaultProps = {
	data: {},
	style: {},
	router: {},
	sub: null,
};

const DisplayUser = (props) => {
	const { data, sub, style, router, className } = props;

	const { query = {} } = router || {};

	const content = React.useMemo(() => {
		return (
			<div style={style} className="d-flex align-items-start p-1">
				<Avatar
					name={data.fullName}
					src={data.avatar}
					size={60}
				/>
				<div className="ml-3 flex-1 mt-2">
					<strong className="fs-md">{data.fullName}</strong>
					{
						sub || <div className="text-muted fs-sm text-capitalize">{data.role || 'Student'}</div>
					}

					<div className="mt-3">
						<div className="d-flex align-items-center mb-1">
							<HiOutlineMail />
							<div className="flex-1 ml-2">
								{data.email || '--'}
								{data.email2 ? <div>{data.email2}</div> : ''}
							</div>
						</div>
						<div className="d-flex align-items-center">
							<AiOutlinePhone />
							<div className="flex-1 ml-2">
								{formatPhone(data.phone)}
								{data.phone2 ? <div>{formatPhone(data.phone2)}</div> : ''}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}, [data.avatar, data.email, data.email2, data.fullName, data.phone, data.phone2, data.role, style, sub]);

	if (!data.id) {
		return <strong className="text-danger">No data</strong>;
	}

	return (
		<Popover content={content}>
			<a onClick={() => router?.push?.(buildUrl({ ...query, profileId: (data.role ? 'user' : 'student') + data.id }), `/profile/${(data.role ? 'user' : 'student') + data.id}`, { shallow: true })}>
				<strong style={style} className={className + ' text-primary cursor-pointer'}>{data.fullName || '--'}</strong>
			</a>
		</Popover>
	);
};

DisplayUser.propTypes = propTypes;

DisplayUser.defaultProps = defaultProps;

export default withRouter(DisplayUser);
