/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2021-01-13 22:57:59
*------------------------------------------------------- */

import React from 'react';
// import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';
import Link from 'next/link';

import Image from 'next/image';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { actionLogin } from 'src/redux/actions/auth';
import { encrypt } from 'src/utils/crypto';

import classes from './style.module.less';

const propTypes = {
	// classes: PropTypes.object.isRequired,
};

const defaultProps = {
	// classes: {},
};

const Login = (props) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = React.useState(false);

	const router = useRouter();

	const { query = {} } = router;

	const onFinish = async (values) => {
		try {
			setLoading(true);
			const password = await encrypt(values.password, values.email);

			await dispatch(await actionLogin({
				...values,
				password,
			}));
			router.replace(query.asPath ? decodeURIComponent(query.asPath) : '/');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className={classes.wrapper}
		>
			<div className={classes.leftOverlay} />
			<div className={classes.left}>
				<div className={classes.leftContent}>

					<div
						className="d-flex justify-content-center align-content-center flex-1 flex-column"
					>
						<Form
							name="normal_login"
							className="login-form"
							initialValues={{
								remember: true,
							}}
							onFinish={onFinish}
							style={{
								width: 350,
								padding: '40px 20px',
								margin: '0 auto 40px',
								borderRadius: 4,
								background: '#fff',
							}}
							size="large"
						>
							<div className="text-center mb-5">
								<Image
									src="/assets/logo/logo.png"
									alt="Logo"
									width={80}
									height={80}
								/>
								<h1 className="mt-3 text-primary">Admin System</h1>
							</div>
							<Form.Item
								name="email"
								rules={[
									{
										type: 'email',
										message: 'The input is not valid E-mail!',
									}, {
										required: true,
										message: 'Please input your E-mail!',
									},
								]}
							>
								<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
							</Form.Item>
							<Form.Item
								name="password"
								rules={[
									{
										required: true,
										message: 'Please input your Password!',
									},
								]}
							>
								<Input.Password
									prefix={<LockOutlined className="site-form-item-icon" />}
									type="password"
									placeholder="Password"
								/>
							</Form.Item>
							<Form.Item>
								<div className="text-center">
									<Link href="/forgot-password">
										<a className="login-form-forgot">
											Forgot password
										</a>
									</Link>
								</div>
							</Form.Item>

							<Button type="primary" block htmlType="submit" className="login-form-button" loading={loading}>
								Login
							</Button>
						</Form>
					</div>
				</div>
			</div>
			<div className="py-2 text-center position-relative">
				<strong className="text-primary">MyWealth.AI</strong>
				<span> 2022 © All Rights Reserved.</span>
			</div>
		</div>
	);
};

Login.propTypes = propTypes;

Login.defaultProps = defaultProps;

export default Login;
