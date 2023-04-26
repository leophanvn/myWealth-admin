/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-02-14 11:09:22
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// import Image from 'next/image';
import Error from 'next/error';

import { Space, Button, Collapse } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import Avatar from 'src/components/DataEntry/Avatar';
import UserStatus from 'src/components/Forms/SelectUserStatus/Display';
import BtnUserActionMore from 'src/containers/Staffs/BtnUserActionMore';
import UpsertUser from 'src/containers/Staffs/UpsertUser';

import InfoData from './InfoData';

import classes from './style.module.less';

const propTypes = {
	userData: PropTypes.object.isRequired,
	loading: PropTypes.bool,
	onRefresh: PropTypes.func,
};

const defaultProps = {
	userData: {},
	loading: false,
	onRefresh: f => f,
};

const ProfileUser = (props) => {
	const { userData, onRefresh, loading } = props;
	const { role } = userData;
	const auth = useSelector(state => state.auth);

	if (!userData.id && !loading) {
		return <Error statusCode={404} />;
	}

	return (
		<>
			<div className={classes.sticky}>
				<div className={classes.banner} />
				<div className={classes.name}>
					<Avatar
						size={150}
						src={userData.avatar}
						name={userData.fullName}
						borderRadius={4}
					/>
					<div className="ml-4 d-flex align-items-center flex-1">
						<div className="flex-1">
							<h2 className="mr-3">{userData.fullName}</h2>
							<div className="d-flex align-items-center">
								<UserStatus value={userData.status} />
								<strong className="text-capitalize ml-3">{role}</strong>
							</div>
						</div>
						<Space className="mt-1">
							{
								(auth.role === 'admin' || auth.id === userData.id) &&
								<UpsertUser
									data={userData}
									onRefresh={onRefresh}
									userRole={role}
								>
									<Button type="primary" icon={<EditOutlined />} className="mr-2">
										Edit Info
									</Button>
								</UpsertUser>
							}
							<BtnUserActionMore userData={userData} onRefresh={onRefresh} />
						</Space>
					</div>
				</div>
			</div>

			<Space
				direction="vertical"
				style={{
					width: '100%',
					marginTop: 20,
				}}
				size="middle"
			>
				<Collapse
					collapsible="header"
					defaultActiveKey={['InfoData']}
					className={classes.collapse}
					expandIconPosition="right"
				>
					<Collapse.Panel className={classes.collapsePanel} header="Profile" key="InfoData">
						<InfoData
							userData={userData}
						/>
					</Collapse.Panel>
				</Collapse>
			</Space>
		</>
	);
};

ProfileUser.propTypes = propTypes;

ProfileUser.defaultProps = defaultProps;

export default ProfileUser;
