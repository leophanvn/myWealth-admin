/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2021-09-18 16:44:48
*------------------------------------------------------- */

import React from 'react';
// import PropTypes from 'prop-types';
import moment from 'src/utils/moment';
import { useInterval } from 'react-use';

import { Calendar } from 'antd';

import Card from 'src/components/Card';

import classes from './style.module.less';

const propTypes = {
	// classes: PropTypes.object.isRequired,
};

const defaultProps = {
	// classes: {},
};

const Clock = (props) => {
	// const { } = props;
	const [time, setTime] = React.useState(moment().format('HH : mm : ss'));

	useInterval(
		() => {
			setTime(moment().format('HH : mm : ss'));
		},
		1000,
	);

	return (
		<Card>
			<div className={classes.clock + ' mb-3'}>
				{time}
			</div>
			<Calendar fullscreen={false} />
		</Card>
	);
};

Clock.propTypes = propTypes;

Clock.defaultProps = defaultProps;

export default React.memo(Clock);
