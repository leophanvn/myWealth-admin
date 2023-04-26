/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-06 10:59:53
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import Router from 'next/router';

import NotiItemContent from 'src/components/Layout/Notification/Item/Content';

import classes from './style.module.less';

const NotiItem = ({ loading, notiData = {} }) => {
	const { data = {} } = notiData;

	if (loading) {
		return (
			<div className={classes.item}>
				<div className="loading-block" style={{ width: 50, height: 50, borderRadius: 50, margin: 0 }} />
				<div className={classes.text}>
					<div className="loading-block" />
					<div className="loading-block" />
					<div className="loading-block" style={{ width: '50%' }} />
				</div>
			</div>
		);
	}

	const handleItemClick = (url) => {
		// if (!notiData.read) {
		// 	action.updateNoti({ id: notiData.id, updatedAt: new Date(), read: true });
		// }
		Router.push(url);
	};

	return (
		<div
			className={classes.item}
		>
			<NotiItemContent
				notiData={{ ...notiData, ...data }}
				onRead={handleItemClick}
			/>
		</div>
	);
};

NotiItem.propTypes = {
	notiData: PropTypes.object,
	loading: PropTypes.bool,
};

NotiItem.defaultProps = {
	notiData: {},
	loading: false,
};

export default NotiItem;
