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

// import Image from 'next/image';
// import Link from 'next/link';

import moment from 'src/utils/moment';
import formatDate from 'src/utils/format-date';
import formatPhone from 'src/utils/format-phone';

import { MailOutlined, PhoneOutlined, HomeOutlined, CalendarOutlined, MessageOutlined, ManOutlined } from '@ant-design/icons';

import DisplayData from 'src/components/DataEntry/DisplayData';

import SubInfo from './SubInfo';

const propTypes = {
	userData: PropTypes.object.isRequired,
};

const defaultProps = {
	userData: {},
};

const InfoData = (props) => {
	const { userData } = props;

	return (
		<div>
			<SubInfo data={userData} />
			<div className="p-2 row">
				<div className="col-12 col-md-4">
					<DisplayData
						icon={<MailOutlined />}
						label="Email"
						value={userData.email}
					/>
				</div>
				<div className="col-12 col-md-4">
					<DisplayData
						icon={<PhoneOutlined />}
						label="Phone"
						value={formatPhone(userData.phone)}
					/>
				</div>

				<div className="col-12 col-md-4">
					<DisplayData
						icon={<ManOutlined />}
						label="Gender"
						value={userData.gender}
					/>
				</div>
				<div className="col-12 col-md-4">
					<DisplayData
						icon={<CalendarOutlined />}
						label="Birth Date"
						value={moment(userData.birthDate).format('DD/MM/YYYY')}
					/>
				</div>
				<div className="col-12 col-md-4">
					<DisplayData
						icon={<CalendarOutlined />}
						label="Created at"
						value={formatDate(userData.createdAt)}
					/>
				</div>

				<div className="col-12 col-md-4">
					<DisplayData
						icon={<HomeOutlined />}
						label="Address"
						value={userData.address}
					/>
				</div>
				<div className="col-12 col-md-4">
					<DisplayData
						icon={<MessageOutlined />}
						label="Description"
						value={userData.desc}
					/>
				</div>
			</div>
		</div>
	);
};

InfoData.propTypes = propTypes;

InfoData.defaultProps = defaultProps;

export default InfoData;
