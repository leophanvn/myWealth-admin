/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2021-12-17 14:05:36
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import formatDate from 'src/utils/format-date';

import classes from './style.module.less';

const propTypes = {
	oldData: PropTypes.object.isRequired,
	newData: PropTypes.object.isRequired,
	compareList: PropTypes.array,
	diffOnly: PropTypes.bool,
};

const defaultProps = {
	oldData: {},
	newData: {},
	compareList: [],
	diffOnly: false,
};

const CompareObject = (props) => {
	const { oldData, newData, compareList, diffOnly } = props;

	if (compareList.length === 0) {
		return null;
	}

	return (
		<div
			className={'mt-2 mb-2 ' + classes.root}
			style={{
				background: '#efefef',
				padding: 10,
				borderRadius: 4,
			}}
		>
			{
				compareList.map((el) => {
					if ((!oldData[el.value] && !newData[el.value])) {
						return null;
					}
					if (el.type === 'array') {
						if ((oldData[el.value].length === 0 && newData[el.value].length === 0)) {
							if (diffOnly) {
								return null;
							}
							return (
								<div key={el.value} className="px-2">
									<strong className="mr-2" style={{ whiteSpace: 'nowrap' }}>{el.label}: </strong>
									<span>Empty</span>
								</div>
							);
						}
						if (oldData[el.value]?.toString() === newData[el.value]?.toString()) {
							if (diffOnly) {
								return null;
							}
							return (
								<div key={el.value} className="px-2 d-flex">
									<strong className="mr-2" style={{ whiteSpace: 'nowrap' }}>{el.label}: </strong>
									<div>
										{
											oldData[el.value]?.map((v) => {
												return (
													<div key={v} className="flex-1">
														{v}
													</div>
												);
											})
										}
									</div>
								</div>
							);
						}

						return (
							<div key={el.value} className="px-2 d-flex">
								<strong className="mr-2" style={{ whiteSpace: 'nowrap' }}>{el.label}: </strong>
								<div>
									{
										(oldData[el.value].length > newData[el.value].length ? oldData[el.value] : newData[el.value])?.map((v, i) => {
											return (
												<div key={v} className="flex-1">
													<span className="text-danger text-line-through mr-2">{oldData[el.value]?.[i] || 'Empty'}</span>
													<span className="mr-2">⇒</span>
													<strong className="text-success">{newData[el.value]?.[i] || 'Empty'}</strong>
												</div>
											);
										})
									}
								</div>
							</div>
						);
					}

					if (el.type === 'date') {
						const oldDate = formatDate(oldData[el.value], el.format);
						const newDate = formatDate(newData[el.value], el.format);

						if (oldDate === newDate) {
							if (diffOnly) {
								return null;
							}
							return (
								<div key={el.value} className="px-2">
									<strong className="mr-2" style={{ whiteSpace: 'nowrap' }}>{el.label}: </strong>
									<span>{oldDate}</span>
								</div>
							);
						}

						return (
							<div key={el.value} className="px-2">
								<strong className="mr-2" style={{ whiteSpace: 'nowrap' }}>{el.label}: </strong>
								<span className="text-danger text-line-through mr-2">{oldData[el.value] ? oldDate : 'Empty'}</span>
								<span className="mr-2">⇒</span>
								<strong className="text-success">{newData[el.value] ? newDate : 'Empty'}</strong>
							</div>
						);
					}

					if (oldData[el.value]?.toString() === newData[el.value]?.toString()) {
						if (diffOnly) {
							return null;
						}
						return (
							<div key={el.value} className="px-2">
								<strong className="mr-2" style={{ whiteSpace: 'nowrap' }}>{el.label}: </strong>
								<span>{oldData[el.value]?.toString()}</span>
							</div>
						);
					}

					return (
						<div key={el.value} className="px-2">
							<strong className="mr-2" style={{ whiteSpace: 'nowrap' }}>{el.label}: </strong>
							<span className="text-danger text-line-through mr-2">{oldData[el.value] || 'Empty'}</span>
							<span className="mr-2">⇒</span>
							<strong className="text-success">{newData[el.value] || 'Empty'}</strong>
						</div>
					);
				})
			}
		</div>
	);
};

CompareObject.propTypes = propTypes;

CompareObject.defaultProps = defaultProps;

export default CompareObject;
