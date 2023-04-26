/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2020-03-01 17:51:30
*------------------------------------------------------- */

import React from 'react';
// import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';

import { Badge } from 'antd';

import Card from 'src/components/Card';
import Avatar from 'src/components/DataEntry/Avatar';

import formatPhone from 'src/utils/format-phone';

import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlinePhone } from 'react-icons/ai';

import NoteWidget from './NoteWidget';

const ClockWidget = dynamic(() => import('./ClockWidget'), { ssr: false });

const Index = () => {
	// const { } = props;

	const auth = useSelector(state => state.auth);

	const dispatch = useDispatch();

	return (
		<div
			className="container-lg p-0"
		>
			<div className="row">
				<div className="col-8">
					{/* <div className="row">
						<div className="col-6 pr-0">
							<Card>
								<div className="d-flex align-items-center">
									<div className="flex-1">
										<div className="fs-md">Staffs</div>
										<strong className="fs-xxl">{numeral(statsUsers.count).format('0,0')}</strong>
									</div>
									<FiUsers style={{ fontSize: 40, color: '#94e189' }} />
								</div>
							</Card>
							<Card>
								<div className="d-flex align-items-center">
									<div className="flex-1">
										<div className="fs-md">Online Tests</div>
										<strong className="fs-xxl">{numeral(statsExam.count).format('0,0')}</strong>
									</div>
									<FileDoneOutlined style={{ fontSize: 40, color: '#ffa880' }} />
								</div>
							</Card>
						</div>
						<div className="col-6">
							<Card>
								<div className="d-flex align-items-center">
									<div className="flex-1">
										<div className="fs-md">Students</div>
										<strong className="fs-xxl">{numeral(statsStudent.count).format('0,0')}</strong>
									</div>
									<FaGraduationCap style={{ fontSize: 50, color: '#0279bf' }} />
								</div>
							</Card>
							<Card>
								<div className="d-flex align-items-center">
									<div className="flex-1">
										<div className="fs-md">Lessons</div>
										<strong className="fs-xxl">{numeral(statsLesson.count).format('0,0')}</strong>
									</div>
									<GiBlackBook style={{ fontSize: 50, color: '#8269b2' }} />
								</div>
							</Card>
						</div>
					</div> */}
					<NoteWidget />
				</div>
				<div className="col-4 pl-0">
					<Card>
						<div className="d-flex">
							<div className="flex-1 mr-2">
								<h2 className="text-capitalize mb-0">{auth.fullName}</h2>
								<div className="text-capitalize mb-2 text-primary">
									{auth.role}
								</div>
								<div className="d-flex align-items-center py-1">
									<HiOutlineMail style={{ fontSize: 20 }} />
									<div className="flex-1 ml-2">
										{auth.email}
									</div>
								</div>
								<div className="d-flex align-items-center py-1">
									<AiOutlinePhone style={{ fontSize: 20 }} />
									<div className="flex-1 ml-2">
										{formatPhone(auth.phone)}
									</div>
								</div>
							</div>

							<Avatar
								size={60}
								src={auth.avatar}
								fullName={auth.fullName}
								style={{
									borderRadius: 4,
								}}
							/>
						</div>
					</Card>
					<Card>
						<strong className="fs-lg">Notifications</strong>

						<div className="d-flex align-items-center pt-3">
							<div className="flex-1 mr-2">
								Alerts
							</div>
							<Badge
								count={0}
								// size="small"
								showZero
								style={{ backgroundColor: '#3b3b40' }}
							/>
						</div>
						<div className="d-flex align-items-center pt-3">
							<div className="flex-1 mr-2">
								Announcements
							</div>
							<Badge
								count={0}
								// size="small"
								showZero
								style={{ backgroundColor: '#3b3b40' }}
							/>
						</div>
					</Card>
					<ClockWidget />
				</div>
			</div>
		</div>
	);
};

Index.propTypes = {
	// classes: PropTypes.object.isRequired,
};

Index.defaultProps = {
	// classes: {},
};

export default Index;
