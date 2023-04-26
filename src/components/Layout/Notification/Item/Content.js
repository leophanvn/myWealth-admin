/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-06 10:59:53
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
// import moment from 'src/utils/moment-timezone';

import { formatCustom } from 'src/utils/format-date';

import { NotificationOutlined, UserAddOutlined, LinkOutlined } from '@ant-design/icons';

import Avatar from 'src/components/DataEntry/Avatar';

import { FaBell } from 'react-icons/fa';

import classes from './style.module.less';

const NotiItemContent = ({ notiData = {}, onRead }) => {
	const { student = {}, tutor = {}, creator = {}, homeworkEmbed = {}, lesson = {}, session = {}, studySessionId } = notiData;

	const oldData = !!studySessionId;

	if (!notiData || !notiData.createdAt) {
		return null;
	}

	const handleItemClick = (url) => {
		onRead(url);
	};

	const getContent = () => {
		if (notiData.type === 'newReviewWeekly') {
			return (
				<a className={classes.content} onClick={() => handleItemClick('/progress#id=' + notiData.reviewId)}>
					<Avatar name={creator.fullName} src={creator.avatar} size={50} />
					<div className={classes.text}>
						<p><strong>{creator.fullName}</strong> has reviewed your weekly performance <strong>{notiData.review.week}</strong></p>
						<span><NotificationOutlined />{formatCustom(notiData.createdAt)}</span>
					</div>
				</a>
			);
		}
		if (notiData.type === 'feedbackHomework') {
			return (
				<a className={classes.content} onClick={() => handleItemClick(oldData ? '/submission?id=' + notiData.homeworkAssignId : `/session/${session.id}`)}>
					<Avatar name={tutor.fullName} src={tutor.avatar} size={50} />
					<div className={classes.text}>
						<p><strong>{tutor.fullName}</strong> has proofread and corrected your HW assignments <strong>{homeworkEmbed.name}</strong>.</p>
						<span><NotificationOutlined />{formatCustom(notiData.createdAt)}</span>
					</div>
				</a>
			);
		}
		if (notiData.type === 'feedbackHomeworkOnline') {
			return (
				<a className={classes.content} onClick={() => handleItemClick('/session-online/' + notiData.homeworkAssignId)}>
					<Avatar name={tutor.fullName} src={tutor.avatar} size={50} />
					<div className={classes.text}>
						<p><strong>{tutor.fullName}</strong> has proofread and corrected your HW assignments <strong>{homeworkEmbed.name}</strong>.</p>
						<span><NotificationOutlined />{formatCustom(notiData.createdAt)}</span>
					</div>
				</a>
			);
		}
		if (notiData.type === 'refeedbackHomework') {
			return (
				<a className={classes.content} onClick={() => handleItemClick(oldData ? '/submission?id=' + notiData.homeworkAssignId : `/session/${session.id}`)}>
					<Avatar name={tutor.fullName} src={tutor.avatar} size={50} />
					<div className={classes.text}>
						<p><strong>{tutor.fullName}</strong> has resent you feedback <strong>{homeworkEmbed.name}</strong>.</p>
						<span><NotificationOutlined />{formatCustom(notiData.createdAt)}</span>
					</div>
				</a>
			);
		}
		if (notiData.type === 'refeedbackHomeworkOnline') {
			return (
				<a className={classes.content} onClick={() => handleItemClick('/session-online/' + notiData.homeworkAssignId)}>
					<Avatar name={tutor.fullName} src={tutor.avatar} size={50} />
					<div className={classes.text}>
						<p><strong>{tutor.fullName}</strong> has resent you feedback <strong>{homeworkEmbed.name}</strong>.</p>
						<span><NotificationOutlined />{formatCustom(notiData.createdAt)}</span>
					</div>
				</a>
			);
		}
		if (notiData.type === 'collectingHomework') {
			return (
				<a className={classes.content} onClick={() => handleItemClick(oldData ? '/submission?id=' + notiData.homeworkAssignId : `/session/${session.id}`)}>
					<Avatar name={tutor.fullName} src={tutor.avatar} size={50} />
					<div className={classes.text}>
						<p><strong>{tutor.fullName}</strong> has collected your HW assignments <strong>{homeworkEmbed.name}</strong>.</p>
						<span><NotificationOutlined />{formatCustom(notiData.createdAt)}</span>
					</div>
				</a>
			);
		}
		if (notiData.type === 'collectingHomeworkOnline') {
			return (
				<a className={classes.content} onClick={() => handleItemClick('/session-online/' + notiData.homeworkAssignId)}>
					<Avatar name={tutor.fullName} src={tutor.avatar} size={50} />
					<div className={classes.text}>
						<p><strong>{tutor.fullName}</strong> has collected your HW assignments <strong>{homeworkEmbed.name}</strong>.</p>
						<span><NotificationOutlined />{formatCustom(notiData.createdAt)}</span>
					</div>
				</a>
			);
		}
		if (notiData.type === 'submitHomework') {
			return (
				<a className={classes.content} onClick={() => handleItemClick(oldData ? '/submission?id=' + notiData.sessionDetailId : `/session/${session.id}`)}>
					<Avatar name={student.fullName} src={student.avatar} size={50} />
					<div className={classes.text}>
						<p><strong>{student.fullName}</strong> has submitted HW assignments <strong>{homeworkEmbed.name}</strong>.</p>
						<span><NotificationOutlined />{formatCustom(notiData.createdAt)}</span>
					</div>
				</a>
			);
		}
		if (notiData.type === 'submitHomeworkOnline') {
			return (
				<a className={classes.content} onClick={() => handleItemClick('/session-online/' + notiData.homeworkAssignId)}>
					<Avatar name={student.fullName} src={student.avatar} size={50} />
					<div className={classes.text}>
						<p><strong>{student.fullName}</strong> has submitted HW assignments <strong>{homeworkEmbed.name}</strong>. (Online course)</p>
						<span><NotificationOutlined />{formatCustom(notiData.createdAt)}</span>
					</div>
				</a>
			);
		}
		if (notiData.type === 'reSubmitHomework') {
			return (
				<a className={classes.content} onClick={() => handleItemClick(oldData ? '/submission?id=' + notiData.sessionDetailId : `/session/${session.id}`)}>
					<Avatar name={student.fullName} src={student.avatar} size={50} />
					<div className={classes.text}>
						<p><strong>{student.fullName}</strong> has resubmitted HW assignments <strong>{homeworkEmbed.name}</strong>.</p>
						<span><NotificationOutlined />{formatCustom(notiData.createdAt)}</span>
					</div>
				</a>
			);
		}
		if (notiData.type === 'reSubmitHomeworkOnline') {
			return (
				<a className={classes.content} onClick={() => handleItemClick('/session-online/' + notiData.homeworkAssignId)}>
					<Avatar name={student.fullName} src={student.avatar} size={50} />
					<div className={classes.text}>
						<p><strong>{student.fullName}</strong> has resubmitted HW assignments <strong>{homeworkEmbed.name}</strong>. (Online course)</p>
						<span><NotificationOutlined />{formatCustom(notiData.createdAt)}</span>
					</div>
				</a>
			);
		}
		if (notiData.type === 'newHomework') {
			return (
				<a className={classes.content} onClick={() => handleItemClick(oldData ? '/submission?id=' + notiData.homeworkAssignId : `/session/${session.id}`)}>
					<div className={classes.avatarIcon}>
						<FaBell />
					</div>
					<div className={classes.text}>
						<p>You have new HW assignments <strong>{homeworkEmbed.name}</strong></p>
						<span><NotificationOutlined />{formatCustom(notiData.createdAt)}</span>
					</div>
				</a>
			);
		}
		if (notiData.type === 'newHomeworkOnline') {
			return (
				<a className={classes.content} onClick={() => handleItemClick('/session-online/' + notiData.homeworkAssignId)}>
					<div className={classes.avatarIcon}>
						<FaBell />
					</div>
					<div className={classes.text}>
						<p>You have new lesson <strong>{lesson.name}</strong></p>
						<span><NotificationOutlined />{formatCustom(notiData.createdAt)}</span>
					</div>
				</a>
			);
		}
		if (notiData.type === 'changeTutor' || notiData.type === 'assignTutor') {
			return (
				<a className={classes.content} onClick={() => handleItemClick('/student/' + notiData.studentId)}>
					<Avatar name={student.fullName} src={student.avatar} size={50} />
					<div className={classes.text}>
						<p>You are assigned as the tutor for <strong>{student.fullName}</strong></p>
						<span><UserAddOutlined />{formatCustom(notiData.createdAt)}</span>
					</div>
				</a>
			);
		}
		return (
			<a className={classes.content}>
				<div className={classes.avatarIcon}>
					<FaBell />
				</div>
				<div className={classes.text}>
					<p>{notiData.type}</p>
					<span><LinkOutlined />{formatCustom(notiData.createdAt)}</span>
				</div>
			</a>
		);
	};

	return (
		getContent()
	);
};

NotiItemContent.propTypes = {
	notiData: PropTypes.object,
	onRead: PropTypes.func,
};

NotiItemContent.defaultProps = {
	notiData: {},
	onRead: f => f,
};

export default NotiItemContent;
