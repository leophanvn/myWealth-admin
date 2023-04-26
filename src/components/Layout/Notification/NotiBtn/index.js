/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-02-10 23:07:52
*------------------------------------------------------- */

import React from 'react';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { Popover, Badge } from 'antd';

import { FaBell } from 'react-icons/fa';

import NotiList from 'src/components/Layout/Notification/List';

import classes from './style.module.less';

const propTypes = {
	// classes: PropTypes.object.isRequired,
};

const defaultProps = {
	// classes: {},
};

const Noti = (props) => {
	// const { } = props;
	const notiUnread = useSelector(state => state.notification.countUnread);

	const [visible, setVisible] = React.useState(false);

	React.useEffect(() => {
		if (visible) {
			document.body.classList.add('overflow-hidden');
		} else {
			document.body.classList.remove('overflow-hidden');
		}
	}, [visible]);

	const content = (
		<div className={classes.content}>
			<NotiList
				onToggle={setVisible}
			/>
		</div>
	);

	const title = null;

	return (
		<Popover content={content} title={title} trigger="click" placement="bottomRight" visible={visible} onVisibleChange={setVisible}>
			<div className={classes.wrapper}>
				<Badge count={notiUnread} className={classes.badge}>
					<FaBell
						style={{
							fontSize: 20,
						}}
					/>
				</Badge>
			</div>
		</Popover>
	);
};

Noti.propTypes = propTypes;

Noti.defaultProps = defaultProps;

export default Noti;
