/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-nested-ternary */
/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2020-03-01 17:38:42
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import { useAsync } from 'react-use';

import AuthStorage from 'src/utils/auth-storage';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

import { BackTop, Layout, Drawer } from 'antd';
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
} from '@ant-design/icons';

import Header from 'src/components/Layout/Header';
import Footer from 'src/components/Layout/Footer';

import Loading from 'src/components/Loading';

import { actionGetUserAuth } from 'src/redux/actions/auth';
// import { addNotiListener, countNotiUnread } from 'src/redux/actions/notification';

import Sidebar from 'src/components/Layout/Sidebar';
import AvatarDropDown from 'src/components/Layout/AvatarDropDown';
import Notifications from 'src/components/Layout/Notification/NotiBtn';
import Profile from 'src/containers/Profile';

import classes from './style.module.less';

const { Content, Sider } = Layout;

const propTypes = {
	children: PropTypes.any,
};

const defaultProps = {
	children: null,
};

const LayoutAuthenticated = (props) => {
	const { children } = props;
	const router = useRouter();
	const [awaitLoading, setAwaitLoading] = React.useState(true);
	const [collapsed, setCollapsed] = React.useState(false);
	const [mobiShow, setMobiShow] = React.useState(false);
	const [broken, setBroken] = React.useState(false);

	React.useEffect(() => {
		const handleRouteChange = url => {
			setMobiShow(false);
		};

		Router.events.on('routeChangeStart', handleRouteChange);
		return () => {
			Router.events.off('routeChangeStart', handleRouteChange);
		};
	}, []);

	const dispatch = useDispatch();

	React.useEffect(() => {
		if (!AuthStorage.loggedIn) {
			router.replace(router.asPath !== '/' ? '/login?asPath=' + encodeURIComponent(router.asPath) : '/login');
		}
	}, [router]);

	useAsync(async () => {
		if (AuthStorage.loggedIn) {
			try {
				await dispatch(await actionGetUserAuth());
				// await dispatch(await countNotiUnread());

				// if (AuthStorage.loggedIn) {
				// 	addNotiListener(dispatch);
				// }
			} catch (error) {
				if ((error.status === 403 || error.status === 401) && error.code !== 'AUTHORIZATION_REQUIRED') {
					AuthStorage.destroy();
					dispatch({ type: 'LOGOUT_SUCCESS' });

					if (router.pathname !== '/login') {
						router.replace(router.asPath !== '/' ? '/login?asPath=' + encodeURIComponent(router.asPath) : '/login');
					}
				}
			} finally {
				setAwaitLoading(false);
			}
		} else {
			setAwaitLoading(false);
		}
	}, [AuthStorage.loggedIn]);

	const handleToggle = () => {
		if (broken) {
			setMobiShow(!mobiShow);
		} else {
			setCollapsed(!collapsed);
		}
	};

	return (
		<>
			<Drawer
				title="Close"
				placement="right"
				visible={router.pathname !== '/profile/[profileId]' && !!router.query.profileId}
				onClose={() => {
					router.back({ shallow: true });
				}}
				width="80%"
				destroyOnClose
				bodyStyle={{ background: '#f0f2f5' }}
				headerStyle={{
					position: 'absolute',
					zIndex: '1',
					right: '0',
					padding: '5px 20px 5px 5px',
				}}

			>
				{
					router.pathname !== '/profile/[profileId]' && !!router.query.profileId &&
					<Profile />
				}
			</Drawer>
			<Layout
				style={{
					minHeight: '100vh',
				}}
				className={classes.root}
			>
				<Sider
					trigger={null}
					collapsible
					collapsed={collapsed && !broken}
					className={classes.sidebar}
					breakpoint="lg"
					width={250}
					onBreakpoint={(val) => {
						setBroken(val);
						if (val) {
							setCollapsed(false);
							setMobiShow(false);
						}
					}}
					style={{
						left: broken && !mobiShow ? -250 : 0,
					}}
				>
					<Link href="/">
						<a className={classes.logoWrapper}>
							<div className={classes.logo}>
								<img src="/assets/logo/logo.png" alt="logo" height="32" />
								{
									!collapsed &&
									<div className={classes.logoText}>
										<strong>MyWealth.AI</strong>
										<span>Admin System</span>
									</div>
								}
							</div>
						</a>
					</Link>
					<div className={classes.sidebarWrapper}>
						<Sidebar />
					</div>
				</Sider>
				<Layout
					className={classes.siteLayout}
					style={{
						paddingLeft: broken ? 0 : collapsed ? 60 : 250,
					}}
				>
					<Header
						style={{
							left: broken ? 0 : collapsed ? 60 : 250,
						}}
					>
						{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
							className: classes.trigger,
							onClick: handleToggle,
						})}
						{
							broken &&
							<Link href="/">
								<a>
									<div className={classes.logoCenter}>
										<img src="/assets/logo/logo.png" alt="logo" height="32" />
										<div className={classes.logoText}>
											<strong>MyWealth.AI</strong>
											<span>Admin System</span>
										</div>
									</div>
								</a>
							</Link>
						}
						<div className={classes.headerRight}>
							<Notifications />
							<AvatarDropDown />
						</div>
					</Header>
					{mobiShow && broken && <div className={classes.overlay} onClick={() => setMobiShow(false)} />}
					<Content
						style={{
							margin: 20,
						}}
					>
						{children}
					</Content>
					<Footer />
				</Layout>
			</Layout>
			<BackTop />
			<Loading fullScreen loading={awaitLoading} />
		</>
	);
};

LayoutAuthenticated.propTypes = propTypes;
LayoutAuthenticated.defaultProps = defaultProps;

LayoutAuthenticated.getInitialProps = (ctx) => {
	if (!AuthStorage.loggedIn) {
		if (ctx.res) {
			ctx.res.writeHead(302, { Location: ctx.asPath !== '/' ? '/login?asPath=' + encodeURIComponent(ctx.asPath) : '/login' });
			ctx.res.end();
		}
	}

	return {}; // You can pass some custom props to the component from here
};

export default LayoutAuthenticated;
