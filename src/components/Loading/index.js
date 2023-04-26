/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2020-05-31 17:02:41
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { LoadingOutlined } from '@ant-design/icons';

import THEME from 'src/constants/theme';

const propTypes = {
	fullScreen: PropTypes.bool,
	loading: PropTypes.bool,
	noIndicate: PropTypes.bool,
	children: PropTypes.any,
	size: PropTypes.number,
	color: PropTypes.string,
	loadingComponent: PropTypes.any,
	className: PropTypes.string,
};

const defaultProps = {
	fullScreen: false,
	loading: false,
	noIndicate: false,
	children: null,
	size: 40,
	color: THEME['@primary-color'],
	loadingComponent: null,
	className: '',
};

const Loading = (props) => {
	const { fullScreen, children, className, loadingComponent, noIndicate, size, loading, color } = props;

	if (!loading) {
		return children;
	}

	if (fullScreen) {
		return (
			<div
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					width: '100%',
					height: '100vh',
					zIndex: 999999,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
				className={className}
			>
				{!noIndicate && <LoadingOutlined style={{ fontSize: size, color }} />}
			</div>
		);
	}

	if (children) {
		return (
			<div
				style={{
					height: '100%',
					position: 'relative',
					width: '100%',
				}}
				className={className}
			>
				{
					loadingComponent ||
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							width: '100%',
							height: '100%',
							zIndex: 99,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						{
							!noIndicate && <LoadingOutlined style={{ fontSize: size, color }} />
						}
					</div>
				}
			</div>
		);
	}

	return (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				width: '100%',
				height: '100%',
				zIndex: 99,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
			className={className}
		>
			{!noIndicate && <LoadingOutlined style={{ fontSize: size, color }} />}
		</div>
	);
};

Loading.propTypes = propTypes;

Loading.defaultProps = defaultProps;

export default Loading;
