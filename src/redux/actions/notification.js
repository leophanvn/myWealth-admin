/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-08-18 15:12:37
*------------------------------------------------------- */

import AuthStorage from 'src/utils/auth-storage';

import { SINGLE_API } from 'src/redux/actions/types';

import URL from 'src/constants/urls';

import applyURIFilter from 'src/utils/apply-url-filter';

const { API_URL } = URL;

let connected = false;

export const addNotiListener = (dispatch) => {
	if (!connected) {
		if (typeof (EventSource) !== 'undefined') {
			const urlToChangeStream = API_URL + '/notifications/change-stream?_format=event-stream';
			const src = new EventSource(urlToChangeStream); // eslint-disable-line

			src.addEventListener('data', (msg) => {
				const data = JSON.parse(msg.data);

				if (data.type === 'create' && data.data.receiverId === AuthStorage.userId) {
					const noti = data.data;

					dispatch({
						type: 'RECEIVE_NOTI',
						payload: noti,
					});
				}
			});

			connected = true;
		} else {
			alert('Sorry, your browser does not support server-sent events...'); // eslint-disable-line
		}
	}
};

export const getNotiList = (payload, next) => {
	const { filter, firstLoad } = payload;

	return {
		type: SINGLE_API,
		payload: {
			url: `/notifications${applyURIFilter(filter)}`,
			beforeCallType: firstLoad ? 'GET_NOTI_LIST_REQUEST' : '',
			successType: 'GET_NOTI_LIST_SUCCESS',
			next,
		},
	};
};

export const countNotiUnread = (payload = {}, next) => {
	const { where = {
		receiverId: AuthStorage.userId,
		// creatorId: { neq: AuthStorage.userId },
		// type: { nin: ['relationshipCreated', 'reachedAchievement'] },
		read: false,
	} } = payload;

	return {
		type: SINGLE_API,
		payload: {
			url: `/notifications/count?where=${JSON.stringify(where)}`,
			successType: 'COUNT_NOTI_UNREAD',
			next,
		},
	};
};

export const updateNoti = (payload, next) => {
	const { id, ...params } = payload;
	return {
		type: SINGLE_API,
		payload: {
			url: `/notifications/${id}`,
			options: { method: 'PATCH' },
			payload: params,
			successType: 'UPDATE_NOTI_SUCCESS',
			next,
		},
	};
};

export const updateAllNoti = (payload, next) => {
	const {
		where = {
			receiverId: AuthStorage.userId,
			// type: { nin: ['relationshipCreated', 'reachedAchievement'] },
			read: false,
		},
		data,
	} = payload;
	return {
		type: SINGLE_API,
		payload: {
			url: `/notifications/update?where=${JSON.stringify(where)}`,
			options: { method: 'POST' },
			payload: data,
			successType: 'UPDATE_ALL_NOTI_SUCCESS',
			next,
		},
	};
};

export const deleteNoti = (payload, next) => {
	const { id } = payload;
	return {
		type: SINGLE_API,
		payload: {
			url: `/notifications/${id}`,
			options: { method: 'DELETE' },
			payload,
			successType: 'DELETE_BY_ID_NOTI_SUCCESS',
			next,
		},
	};
};
