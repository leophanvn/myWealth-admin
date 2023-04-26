/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2020-03-01 17:27:02
*------------------------------------------------------- */

import React from 'react';
// import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import { Menu } from 'antd';
import {
	SnippetsOutlined,
	GlobalOutlined,
} from '@ant-design/icons';

import { GoDashboard } from 'react-icons/go';
import { BsInbox } from 'react-icons/bs';
import { VscListTree } from 'react-icons/vsc';

const propTypes = {
	// children: PropTypes.node,
};

const defaultProps = {};

const Sidebar = () => {
	// const { } = props;

	const router = useRouter();
	const auth = useSelector(state => state.auth);

	// const dispatch = useDispatch();

	const [, root, sub, sub2] = router.pathname ? router.pathname.split('/') : [];

	const activeKey = ['/' + (sub2 || sub || root), '/' + (sub2 || sub), '/' + sub2];

	return (
		<Menu
			defaultSelectedKeys={activeKey}
			defaultOpenKeys={['/' + root, '/' + sub]}
			selectedKeys={activeKey}
			mode="inline"
		>
			<Menu.Item key="/" onClick={() => router.push('/')} icon={<GoDashboard />}>
				Dashboard
			</Menu.Item>
			{/* {
				(auth.role === 'admin') &&
				<Menu.SubMenu
					key="/staffs"
					icon={<UsergroupAddOutlined />}
					title="Staffs"
				>
					<Menu.Item key="/accountants" onClick={() => router.push('/staffs/accountants')} icon={<FormOutlined />}>
						Accountants
					</Menu.Item>
					<Menu.Item key="/consultants" onClick={() => router.push('/staffs/consultants')} icon={<CustomerServiceOutlined />}>
						Consultants
					</Menu.Item>
					<Menu.Item key="/teachers" onClick={() => router.push('/staffs/teachers')} icon={<ContactsOutlined />}>
						Teachers
					</Menu.Item>
				</Menu.SubMenu>
			} */}
			{
				(auth.role === 'admin') &&
				<Menu.SubMenu
					key="/articles"
					icon={<GlobalOutlined />}
					title="Articles"
				>
					<Menu.Item key="/list" onClick={() => router.push('/articles/list')} icon={<SnippetsOutlined />}>
						Articles List
					</Menu.Item>
					<Menu.Item key="/categories" onClick={() => router.push('/articles/categories')} icon={<BsInbox />}>
						Categories
					</Menu.Item>
					<Menu.Item key="/subcategories" onClick={() => router.push('/articles/subcategories')} icon={<VscListTree />}>
						Subcategories
					</Menu.Item>
				</Menu.SubMenu>
			}
		</Menu>
	);
};

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default Sidebar;
