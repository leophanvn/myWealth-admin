/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-06 10:59:53
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

import { Menu, Dropdown } from 'antd';

import Router from 'next/router';

import { IoMdMore } from 'react-icons/io';

import { updateNoti, deleteNoti } from 'src/redux/actions/notification';

import NotiItemContent from './Content';

import classes from './style.module.less';

const NotiItem = ({ loading, notiData = {}, onToggle }) => {
	const dispatch = useDispatch();

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

	const handleSelectMenu = async ({ key }) => {
		if (key === 'read') {
			await dispatch(await updateNoti({ id: notiData.id, updatedAt: new Date(), read: true }));
		}
		if (key === 'delete') {
			await dispatch(await deleteNoti({ id: notiData.id }));
		}
	};

	const menu = (
		<Menu onClick={handleSelectMenu}>
			{
				!notiData.read &&
				<Menu.Item key="read">
					Mark as read
				</Menu.Item>
			}
			<Menu.Item key="delete">
				Hide this notification
			</Menu.Item>
		</Menu>
	);

	const handleItemClick = async (url) => {
		if (!notiData.read) {
			await dispatch(await updateNoti({ id: notiData.id, updatedAt: new Date(), read: true }));
		}
		Router.push(url);
		onToggle(false);
	};

	const { data = {} } = notiData;

	const notiSend = {
		...notiData,
		creator: { ...data.creator, ...notiData.creator },
		question: { ...data.question, ...notiData.question },
		answer: { ...data.answer, ...notiData.answer },
	};

	return (
		<div
			className={
				classNames(classes.item, {
					[classes.unread]: !notiData.read,
				})
			}
		>
			<NotiItemContent
				notiData={notiSend}
				onRead={handleItemClick}
			/>
			<div className={classes.itemAction}>
				<Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
					<a className="ant-dropdown-link" href="#">
						<IoMdMore style={{ fontSize: 22 }} />
					</a>
				</Dropdown>
			</div>
		</div>
	);
};

NotiItem.propTypes = {
	notiData: PropTypes.object,
	loading: PropTypes.bool,
	onToggle: PropTypes.func,
};

NotiItem.defaultProps = {
	notiData: {},
	loading: false,
	onToggle: f => f,
};

export default NotiItem;
