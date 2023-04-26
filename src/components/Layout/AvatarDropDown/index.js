/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2020-03-01 17:15:11
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { Menu, Dropdown, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import buildUrl from 'src/utils/build-url';

import Router, { useRouter } from 'next/router';
import Link from 'next/link';

import { FaUserAlt, FaKey } from 'react-icons/fa';
import { RiLogoutBoxRFill } from 'react-icons/ri';

import {
	ExclamationCircleOutlined,
} from '@ant-design/icons';

import Avatar from 'src/components/DataEntry/Avatar';

import { actionLogout } from 'src/redux/actions/auth';

import classes from './style.module.less';

const propTypes = {
	style: PropTypes.object,
};

const defaultProps = {
	style: {},
};

const AvatarDropDown = (props) => {
	const { style } = props;

	const router = useRouter();
	const { query = {} } = router;

	const auth = useSelector(state => state.auth);

	const dispatch = useDispatch();

	const handleLogout = React.useCallback(async () => {
		Modal.confirm({
			title: 'Are you sure?',
			icon: <ExclamationCircleOutlined />,
			// content: 'Are you sure?',
			onOk: async () => {
				await dispatch(await actionLogout(() => {
					Router.push('/login');
				}));
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	}, [dispatch]);

	const menu = (
		<Menu className={classes.menuDropdown}>
			<div className={classes.name}>
				<Avatar
					size={50}
					src={auth.avatar}
					name={auth.fullName}
				/>
				<div className={classes.fullName}>
					<strong>{auth.fullName}</strong>
					<div className="text-small">{auth.email}</div>
				</div>
			</div>
			<Menu.Divider />
			<Menu.Item>
				<Link
					href={buildUrl({ ...query, profileId: 'user' + auth.id })}
					as={`/profile/${'user' + auth.id}`}
					shallow
				>
					<a className={classes.item}>
						<FaUserAlt />
						<span>Profile</span>
					</a>
				</Link>
			</Menu.Item>
			<Menu.Item>
				<Link href="/change-password">
					<a className={classes.item}>
						<FaKey />
						<span>Change password</span>
					</a>
				</Link>
			</Menu.Item>
			<Menu.Item>
				<a className={classes.item} onClick={handleLogout}>
					<RiLogoutBoxRFill />
					<span>Logout</span>
				</a>
			</Menu.Item>
		</Menu>
	);

	return (
		<Dropdown style={style} overlay={menu} trigger={['click']} className="d-flex">
			<div>
				<Avatar
					size={35}
					src={auth.avatar}
					name={auth.fullName}
					style={{
						cursor: 'pointer',
						marginLeft: 15,
					}}
				/>
			</div>
		</Dropdown>
	);
};

AvatarDropDown.propTypes = propTypes;
AvatarDropDown.defaultProps = defaultProps;

export default AvatarDropDown;
