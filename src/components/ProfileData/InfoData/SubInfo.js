/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-02-28 11:23:24
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from 'antd';
import { CheckSquareOutlined } from '@ant-design/icons';

import moment, { FORMAT_DATE } from 'src/utils/moment';

const propTypes = {
	data: PropTypes.object.isRequired,
	style: PropTypes.any,
};

const defaultProps = {
	data: {},
	style: null,
};

const SubInfo = (props) => {
	const { data, style } = props;
	const { toTakeCareData = {} } = data;

	const sub = React.useMemo(() => {
		if ((data.status === 'inquiring' && data.subStatus === 'invitedTest') || (data.status === 'finished' && data.subStatus === 'invitedTest') || (data.status === 'studying' && data.subStatus === 'outOfCourse')) {
			return (
				<div
					style={{
						marginBottom: 5,
					}}
				>
					Hẹn test ngày: <strong>{data.toBeConfirmDate ? 'To Be Confirmed' : moment(data.testDate).format(FORMAT_DATE + ' HH:mm')}</strong>
				</div>
			);
		}
		if (data.status === 'inquiring' && data.subStatus === 'potential') {
			return (
				<div
					style={{
						marginBottom: 5,
					}}
				>
					Ngày hẹn đóng tiền: <strong>{data.toBeConfirmDate ? 'To Be Confirmed' : moment(data.dateWillPay).format(FORMAT_DATE + ' HH:mm')}</strong> <br />
					<div>
						Cycle sẽ học: <strong>{data.potentialLevel?.name}</strong>
					</div>
				</div>
			);
		}
		if (data.status === 'inquiring' && data.subStatus === 'promise') {
			return (
				<div
					style={{
						marginBottom: 5,
					}}
				>
					Sẽ học sau vào ngày: <strong>{data.toBeConfirmDate ? 'To Be Confirmed' : moment(data.dateWillStudy).format(FORMAT_DATE + ' HH:mm')}</strong>
					<div>
						Cycle sẽ học: <strong>{data.potentialLevel?.name}</strong>
					</div>
				</div>
			);
		}
		if (data.status === 'studying' && data.subStatus === 'lazy') {
			return (
				<div
					style={{
						marginBottom: 5,
					}}
				>
					Đã chăm sóc ngày: <strong>{moment(data.dateCare).format(FORMAT_DATE + ' HH:mm')}</strong>
				</div>
			);
		}
		if (data.status === 'studying' && data.subStatus === 'missMuch') {
			return (
				<div
					style={{
						marginBottom: 5,
					}}
				>
					Ngày cuối cùng đi học: <strong>{moment(data.lastCheckin).format('DD-MM-YYYY')}</strong>
				</div>
			);
		}
		if (data.status === 'finished' && data.subStatus === 'keepInTouch') {
			return (
				<div
					style={{
						marginBottom: 5,
					}}
				>
					Sẽ quay lại vào ngày: <strong>{moment(data.dateBack).format(FORMAT_DATE + ' HH:mm')}</strong>
				</div>
			);
		}
		if (data.status === 'finished' && data.subStatus === 'potential') {
			return (
				<div
					style={{
						marginBottom: 5,
					}}
				>
					Sẽ quay lại vào ngày: <strong>{data.toBeConfirmDate ? 'To Be Confirmed' : moment(data.dateBack).format(FORMAT_DATE + ' HH:mm')}</strong> <br />
					<div>
						Cycle sẽ học: <strong>{data.potentialLevel?.name}</strong>
					</div>
				</div>
			);
		}
		if (data.status === 'inquiring' && data.subStatus === 'sentResult') {
			return (
				<div
					style={{
						marginBottom: 5,
					}}
				>
					Ghi chú: {data.resultDesc}
				</div>
			);
		}

		return null;
	}, [data.dateBack, data.dateCare, data.dateWillPay, data.dateWillStudy, data.lastCheckin, data.potentialLevel?.name, data.resultDesc, data.status, data.subStatus, data.testDate, data.toBeConfirmDate]);

	if (!sub && !data.toTakeCare) {
		return null;
	}
	return (
		<div
			style={style || {
				background: '#eff2f5 ',
				padding: 15,
				marginTop: 5,
				marginBottom: 15,
				borderRadius: '4px',
			}}
		>
			{sub}
			{
				data.toTakeCare &&
				<div className="text-left">
					<strong className="text-danger">
						<CheckSquareOutlined /> Students to take care
					</strong>
					<div style={{ marginLeft: 16 }}>
						<strong>Ngày chăm sóc:</strong>
						<span className="ml-1">
							{moment(toTakeCareData.date).format('DD/MM/YYYY') || '--'}
						</span>
					</div>
					<div style={{ marginLeft: 16 }}>
						<strong>Từ:</strong> {toTakeCareData.from || '--'} <strong>Đến</strong> {toTakeCareData.to || '--'}
					</div>
					<div style={{ marginLeft: 16 }}>
						<Typography.Paragraph
							style={{
								marginBottom: 0,
							}}
							ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}
						>
							<strong style={{ whiteSpace: 'nowrap' }} className="mr-1">Ghi chú:</strong> {toTakeCareData.note || '--'}
						</Typography.Paragraph>
					</div>
				</div>
			}
		</div>
	);
};

SubInfo.propTypes = propTypes;

SubInfo.defaultProps = defaultProps;

export default SubInfo;
