/* eslint-disable react/require-default-props */
/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable jsx-a11y/media-has-caption */
/* --------------------------------------------------------
*
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-02-16 13:40:50
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { Input, Slider, Modal } from 'antd';
import { CaretRightOutlined, PauseOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import useKeyPressEvent from 'react-use/lib/useKeyPressEvent';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';

const propTypes = {
	src: PropTypes.string.isRequired,
	onChangeComment: PropTypes.func,
	comments: PropTypes.array,
};

const defaultProps = {
	src: '',
	onChangeComment: f => f,
	comments: [],
};

const formatSecondsAsTime = (ms) => {
	const secNum = parseInt(ms, 10); // don't forget the second param
	let hours = Math.floor(secNum / 3600);
	let minutes = Math.floor((secNum - (hours * 3600)) / 60);
	let seconds = secNum - (hours * 3600) - (minutes * 60);

	if (hours < 10) { hours = '0' + hours; }
	if (minutes < 10) { minutes = '0' + minutes; }
	if (seconds < 10) { seconds = '0' + seconds; }
	return hours + ':' + minutes + ':' + seconds;
};

const AudioPlayer = (props) => {
	const { src, onChangeComment, comments } = props;

	const audioRef = React.useRef();
	const inputCmtRef = React.useRef();
	const [currentTime, setCurrentTime] = React.useState(0);
	const [duration, setDuration] = React.useState(0);
	const [isPlay, setPlay] = React.useState(false);
	const [focus, setFocus] = React.useState(false);

	const [commentList, setCommentList] = React.useState(comments);
	const [cmtInput, setCmtInput] = React.useState('');
	const [timeInput, setTimeInput] = React.useState('');

	const [editEl, setEditEl] = React.useState({});

	React.useEffect(() => {
		setCommentList(comments);
	}, [comments]);

	useUpdateEffect(() => {
		onChangeComment(commentList);
	}, [commentList]);

	const handleLoadedData = () => {
		setDuration(audioRef.current.duration);
		if (isPlay) audioRef.current.play();
	};

	const handlePausePlayClick = () => {
		if (!focus) {
			return;
		}
		if (isPlay) {
			audioRef.current.pause();
			setCmtInput('');
			setTimeInput(formatSecondsAsTime(Math.floor(currentTime)));

			setTimeout(() => {
				inputCmtRef.current.focus();
			}, 100);
		} else {
			audioRef.current.play();
			if (cmtInput) {
				if (timeInput) {
					setCommentList((state) => {
						return [...state, { time: timeInput, text: cmtInput, id: +(new Date()) }];
					});
				}
				setCmtInput('');
				setTimeInput('');
				inputCmtRef.current.blur();
			}
		}
		setPlay(!isPlay);
	};

	useKeyPressEvent('Enter', handlePausePlayClick);

	const handleTimeSliderChange = (x) => {
		if (!focus) {
			return;
		}
		audioRef.current.currentTime = x;
		setCurrentTime(x);

		if (!isPlay) {
			setPlay(true);
			audioRef.current.play();
		}
	};

	const handleFocus = (event) => {
		event.preventDefault();
		if (focus && isPlay) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
			setPlay(false);
		}
		setFocus(!focus);
	};

	const handleDeleteCmt = (id) => {
		setCommentList((state) => {
			return state.filter(el => {
				return el.id !== id;
			});
		});
	};

	const handleEditCmt = (item) => {
		setEditEl(item);
		setPlay(false);
		audioRef.current.pause();
	};

	const handleOk = () => {
		setCommentList((state) => {
			return state.map(el => {
				if (el.id === editEl.id) {
					return editEl;
				}
				return el;
			});
		});
		setEditEl({});
	};

	return (
		<div
			style={{
				background: '#fafafa',
				padding: 15,
				borderRadius: '4px',
				border: '1px solid #d9d9d9',
				marginTop: 10,
			}}
		>
			<div className="text-right mb-4">
				<div
					onClick={handleFocus}
					style={{
						color: '#fff',
						backgroundColor: '#01974e',
						borderColor: '#01974e',
						textShadow: '0 -1px 0 rgb(0 0 0 / 12%)',
						WebkitBoxShadow: '0 2px 0 rgb(0 0 0 / 5%)',
						boxShadow: '0 2px 0 rgb(0 0 0 / 5%)',
						height: '24px',
						padding: '0 7px',
						fontSize: '14px',
						borderRadius: '4px',
						lineHeight: '1.499',
						position: 'relative',
						display: 'inline-block',
						fontWeight: '400',
						whiteSpace: 'nowrap',
						textAlign: 'center',
						backgroundImage: 'none',
						border: '1px solid transparent',
						cursor: 'pointer',
					}}
				>
					{focus ? 'Lock' : 'Feedback'}
				</div>
			</div>
			<div
				style={{
					opacity: focus ? 1 : 0.5,
					position: 'relative',
				}}
			>
				{
					!focus &&
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							width: '100%',
							height: '100%',
							zIndex: 9,
						}}
					/>
				}
				<div
					className="d-flex align-items-center"
				>
					{
						!isPlay ?
							<CaretRightOutlined
								className="mr-2 mt-1"
								onClick={handlePausePlayClick}
								style={{
									fontSize: 20,
								}}
							/> :
							<PauseOutlined
								className="mr-2 mt-1"
								onClick={handlePausePlayClick}
								style={{
									fontSize: 20,
								}}
							/>
					}
					<Slider
						max={duration}
						value={currentTime}
						onChange={handleTimeSliderChange}
						style={{
							flex: 1,
						}}
					/>
					<span
						className="ml-2"
						style={{
							marginTop: 5,
							fontSize: 12,
						}}
					>
						{formatSecondsAsTime(Math.floor(currentTime))} / {formatSecondsAsTime(Math.floor(duration))}
					</span>
				</div>
				<audio
					ref={audioRef}
					src={src}
					onLoadedData={handleLoadedData}
					onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
					onEnded={() => setPlay(false)}
				>
					<p>Your browser does not support the audio element</p>
				</audio>
				<div className="mt-4">
					<strong>Comments:</strong>
					<div className="mt-2 ml-4">
						<div className="mb-1 d-flex align-items-center">
							<Input
								placeholder="Time"
								className="mr-2"
								style={{
									width: 200,
								}}
								value={timeInput}
								onChange={(e) => setTimeInput(e.target.value)}
								disabled={isPlay || currentTime === 0}
							/>
							<Input
								ref={inputCmtRef}
								placeholder="Comment"
								className="mr-2 flex-1"
								value={cmtInput}
								onChange={(e) => setCmtInput(e.target.value)}
								disabled={isPlay || currentTime === 0}
							/>
							<div
								onClick={isPlay || currentTime === 0 ? f => f : handlePausePlayClick}
								style={{
									color: '#fff',
									backgroundColor: '#01974e',
									borderColor: '#01974e',
									textShadow: '0 -1px 0 rgb(0 0 0 / 12%)',
									WebkitBoxShadow: '0 2px 0 rgb(0 0 0 / 5%)',
									boxShadow: '0 2px 0 rgb(0 0 0 / 5%)',
									height: '32px',
									padding: '4px 11px',
									fontSize: '14px',
									borderRadius: '4px',
									lineHeight: '1.5',
									position: 'relative',
									display: 'inline-block',
									fontWeight: '400',
									whiteSpace: 'nowrap',
									textAlign: 'center',
									backgroundImage: 'none',
									border: '1px solid transparent',
									cursor: 'pointer',
								}}
							>
								Add
							</div>
						</div>
						{
							commentList.length > 0 && commentList.map((el) => {
								return (
									<div className="d-flex align-items-center py-2 border-bottom" key={el.id}>
										<div
											style={{
												width: 200,
											}}
										>
											{el.time}
										</div>
										<div className="flex-1 mx-2">
											{el.text}
										</div>
										<div className="text-right">
											<EditOutlined className="mr-3" onClick={() => handleEditCmt(el)} />
											<DeleteOutlined className="text-danger" onClick={() => handleDeleteCmt(el.id)} />
										</div>
									</div>
								);
							})
						}
						<Modal
							title="Edit"
							visible={!!editEl.id}
							onOk={handleOk}
							onCancel={() => setEditEl({})}
						>
							<Input
								placeholder="Time"
								className="mr-2"
								style={{
									marginBottom: 10,
								}}
								value={editEl.time}
								onChange={(e) => setEditEl((state) => ({ ...state, time: e.target.value }))}
							/>
							<Input
								ref={inputCmtRef}
								placeholder="Comment"
								className="mr-2 flex-1"
								value={editEl.text}
								onChange={(e) => setEditEl((state) => ({ ...state, text: e.target.value }))}
							/>
						</Modal>
					</div>
				</div>
			</div>
		</div>
	);
};

AudioPlayer.propTypes = propTypes;

AudioPlayer.defaultProps = defaultProps;

export default AudioPlayer;
