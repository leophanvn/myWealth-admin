/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * Created: 2017-10-06 17:55:46
 *-------------------------------------------------------*/
import React from 'react';

import { notification } from 'antd';

import NotiPusher from 'src/components/Layout/Notification/Pusher';

export const initialState = {
	list: {
		total: 0,
		skip: 0,
		limit: 10,
		data: [],
	},
	countUnread: 0,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'RECEIVE_NOTI': {
			notification.open({
				// message: 'Notification Title',
				description: (
					<div style={{ marginTop: -20 }}>
						<NotiPusher
							notiData={action.payload}
						/>
					</div>
				),
				// duration: 0,
			});
			return {
				...state,
				countUnread: state.countUnread + 1,
				list: {
					...state.list,
					total: state.list.total + 1,
					data: [
						action.payload,
						...state.list.data,
					],
				},
			};
		}

		case 'GET_NOTI_LIST_REQUEST':
			return {
				...state,
				list: initialState.list,
			};

		case 'GET_NOTI_LIST_SUCCESS':
			return {
				...state,
				list: { ...state.list, ...action.payload, data: [...state.list.data, ...action.payload.data] },
			};

		case 'COUNT_NOTI_UNREAD':
			return {
				...state,
				countUnread: action.payload.count || 0,
			};

		case 'UPDATE_ALL_NOTI_SUCCESS':
			return {
				...state,
				list: {
					...state.list,
					data: state.list.data.map((el) => {
						return { ...el, read: true };
					}),
				},
			};

		case 'CREATE_NOTI_SUCCESS':
			return {
				...state,
				list: {
					...state.list,
					total: state.list.total + 1,
					data: [action.payload, ...state.list.data],
				},
			};

		case 'UPDATE_NOTI_SUCCESS': {
			const { list } = state;

			const i = list.data.findIndex((el) => {
				return el.id === action.payload.id;
			});

			list.data[i] = { ...list.data[i], ...action.payload }; // eslint-disable-line

			return {
				...state,
				countUnread: state.countUnread - 1,
				list,
			};
		}

		case 'DELETE_BY_ID_NOTI_SUCCESS': {
			const { list } = state;

			const i = list.data.findIndex((el) => {
				return el.id === action.payload.id;
			});

			list.data.splice(i, 1);
			const total = list.total - 1;

			return {
				...state,
				countUnread: action.payload.state === 'unread' ? state.countUnread - 1 : state.countUnread,
				list: { ...list, total },
			};
		}

		default:
			return state;
	}
};

export default reducer;
