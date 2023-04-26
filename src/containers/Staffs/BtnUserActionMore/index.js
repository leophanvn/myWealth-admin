/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-02-26 11:41:05
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import AuthStorage from 'src/utils/auth-storage';

import { Menu, Dropdown, message, Modal } from 'antd';

import { SettingOutlined, LoadingOutlined } from '@ant-design/icons';

import { update, resendInvitation } from 'src/redux/actions/users';

const propTypes = {
	userData: PropTypes.object.isRequired,
	children: PropTypes.any,
	onRefresh: PropTypes.func,
};

const defaultProps = {
	userData: {},
	children: null,
	onRefresh: f => f,
};

const BtnUserActionMore = (props) => {
	const { userData, children, onRefresh } = props;

	const [loading, setLoading] = React.useState(false);

	const dispatch = useDispatch();

	const handleSelectMenu = React.useCallback(({ key }) => {
		Modal.confirm({
			title: 'Are you sure?',
			onOk: async () => {
				const { id, status, email } = userData;

				if (key === 'resendInvitation') {
					setLoading(true);
					try {
						await dispatch(await resendInvitation({ email }));
						message.success('Resend account success!');
						onRefresh();
					} finally {
						setLoading(false);
					}
				} else {
					if (id && status !== 'pending') {
						setLoading(true);
						try {
							await dispatch(await update({ id, status: key, updatedAt: new Date() }));

							message.success((key === 'inactive' ? 'Deactivate' : 'Activate') + ' account success!');
							onRefresh();
						} finally {
							setLoading(false);
						}
					}
				}
			},
		});
	}, [dispatch, onRefresh, userData]);

	const menu = React.useMemo(() => {
		return (
			<Menu onClick={handleSelectMenu}>
				{
					userData.status === 'active' &&
					<Menu.Item key="inactive">
						Deactivate Account
					</Menu.Item>
				}
				{
					userData.status === 'inactive' &&
					<Menu.Item key="active">
						Active Account
					</Menu.Item>
				}
				{
					userData.status === 'pending' &&
					<Menu.Item key="resendInvitation">
						Resend Invitation
					</Menu.Item>
				}
			</Menu>
		);
	}, [handleSelectMenu, userData.status]);

	if (AuthStorage.role !== 'admin' || AuthStorage.userId === userData.id || userData.role === 'admin') {
		return null;
	}

	return (
		<Dropdown overlay={menu} trigger={['click']}>
			{
				loading ?
					<LoadingOutlined /> :
					<a className="ant-dropdown-link">
						{
							children || <SettingOutlined />
						}
					</a>
			}
		</Dropdown>
	);
};

BtnUserActionMore.propTypes = propTypes;

BtnUserActionMore.defaultProps = defaultProps;

export default BtnUserActionMore;
