/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-03-07 23:55:23
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';

import { Waypoint } from 'react-waypoint';

import AuthStorage from 'src/utils/auth-storage';

import NotiItem from 'src/components/Layout/Notification/Item';

import { getNotiList, updateAllNoti } from 'src/redux/actions/notification';

import { FaBellSlash, FaBell } from 'react-icons/fa';

import classes from './style.module.less';

const propTypes = {
	onToggle: PropTypes.func.isRequired,
};

const defaultProps = {
	onToggle: f => f,
};

const NotiList = (props) => {
	const { onToggle } = props;

	const [loadingMore, setLoadingMore] = React.useState(false);

	const notiList = useSelector(state => {
		return state?.notification?.list || {};
	});

	const dispatch = useDispatch();

	const filter = React.useMemo(() => {
		return {
			limit: 6,
			skip: 0,
			page: 1,
			order: 'createdAt DESC',
			include: [
				{
					relation: 'creator',
					scope: {
						fields: ['id', 'avatar', 'fullName', 'phone', 'role'],
					},
				},
				{
					relation: 'student',
					scope: {
						fields: ['id', 'avatar', 'fullName', 'phone', 'role'],
					},
				},
				{
					relation: 'tutor',
					scope: {
						fields: ['id', 'avatar', 'fullName', 'phone', 'role'],
					},
				},
				{
					relation: 'session',
				},
			],
			where: {
				receiverId: AuthStorage.userId,
				// creatorId: { neq: AuthStorage.userId },
				// type: { nin: ['relationshipCreated', 'reachedAchievement'] },
			},
		};
	}, []);

	const { loading } = useAsyncRetry(async () => {
		return {};

		// const response = await dispatch(await getNotiList({
		// 	firstLoad: true,
		// 	filter,
		// }));

		// return response;
	}, [filter]);

	const handleLoadMore = React.useCallback(async () => {
		setLoadingMore(true);

		try {
			filter.skip = filter.limit * filter.page;

			await dispatch(await getNotiList({
				filter,
			}));
			filter.page += 1;
		} catch (error) {
			console.log('DEV ~ file: index.js ~ line 102 ~ handleLoadMore ~ error', error);
		} finally {
			setLoadingMore(false);
		}
	}, [dispatch, filter]);

	const handleReadAll = React.useCallback(async () => {
		await dispatch(await updateAllNoti({ data: { updatedAt: new Date(), read: true } }));
	}, [dispatch]);

	if (!loading && notiList.total === 0) {
		return (
			<div className={classes.content}>
				<div className={classes.title}>
					<h4><FaBell /> Notifications</h4>
					<a>Mark all as read</a>
				</div>
				<div className={classes.contentWrapper}>
					<div className={classes.notFound}>
						<FaBellSlash />
						No new notification
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={classes.content}>
			<div className={classes.title}>
				<h4><FaBell />Notifications</h4>
				<a onClick={handleReadAll}>Mark all as read</a>
			</div>
			<div className={classes.contentWrapper}>
				{
					!loading ?
						notiList?.data.map((noti) => {
							return <NotiItem key={noti.id} notiData={noti} onToggle={onToggle} />;
						}) :
						[0, 0, 0, 0].map((noti, i) => {
							return <NotiItem key={i} loading />;
						})
				}
				{
					loadingMore && [
						<NotiItem key={1} loading />,
						<NotiItem key={2} loading />,
					]
				}
				{
					!loading && !loadingMore && filter.limit * filter.page < notiList.total &&
					<Waypoint
						onEnter={handleLoadMore}
					/>
				}
			</div>

		</div>
	);
};

NotiList.propTypes = propTypes;

NotiList.defaultProps = defaultProps;

export default NotiList;
