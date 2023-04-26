/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-03-03 00:04:52
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import useAsyncRetry from 'react-use/lib/useAsyncRetry';
import Router, { useRouter } from 'next/router';
import useDeepCompareEffect from 'react-use/lib/useDeepCompareEffect';
import { useDispatch } from 'react-redux';

import { Divider, Space } from 'antd';

import Link from 'next/link';

import { getList } from 'src/redux/actions/users';

import formatDate from 'src/utils/format-date';
import formatPhone from 'src/utils/format-phone';
import buildUrl from 'src/utils/build-url';

import Table from 'src/components/Core/Table';
import PageHeader from 'src/components/Core/PageHeader';
import Filter from 'src/components/Core/Filter';
import SelectBranch from 'src/components/Forms/SelectBranch';
import SelectUserStatus from 'src/components/Forms/SelectUserStatus';
import UserStatus from 'src/components/Forms/SelectUserStatus/Display';
import BtnUserActionMore from 'src/containers/Staffs/BtnUserActionMore';
import Avatar from 'src/components/DataEntry/Avatar';

import Upsert from 'src/containers/Staffs/UpsertUser';

const propTypes = {
	userRole: PropTypes.string.isRequired,
	title: PropTypes.any,
};

const defaultProps = {
	userRole: '',
	title: '',
};

const UserList = (props) => {
	const { userRole, title } = props;
	const router = useRouter();
	const dispatch = useDispatch();

	const query = React.useMemo(() => {
		const { query: qa = {} } = router;
		const { profileId, ...rest } = qa;

		return rest;
	}, [router]);

	const filterInit = React.useMemo(() => {
		return {
			skip: 0,
			limit: 10,
			where: {
				role: userRole,
			},
		};
	}, [userRole]);

	const { value: list = {}, loading, retry } = useAsyncRetry(async () => {
		const { skip = 0, ...restQuery } = query || {};

		const filter = Object.entries(restQuery).reduce((preVal, [key, val]) => {
			if (val && val !== 'all') {
				if (key === 'q') {
					return {
						...preVal,
						or: [
							{ fullName: { regexp: `/${val}/i` } },
							{ phone: { regexp: `/${val}/i` } },
							{ phone2: { regexp: `/${val}/i` } },
							{ email: { regexp: `/${val}/i` } },
							{ email2: { regexp: `/${val}/i` } },
						],
					};
				}

				return {
					...preVal,
					[key]: val,
				};
			}

			return preVal;
		}, {});

		const response = await dispatch(await getList({

			firstLoad: true,
			filter: {
				...filterInit,
				skip,
				where: {
					...filterInit.where,
					...filter,
				},
			},
		}));

		return response;
	}, []);

	useDeepCompareEffect(() => {
		retry();
	}, [query]);

	const handleChangeFilter = React.useCallback((data) => {
		Router.push(buildUrl({ ...data, skip: '' }), undefined, { shallow: true });
	}, []);

	const handleChangeTable = React.useCallback((sk) => {
		Router.push(buildUrl({ ...query, skip: sk }), undefined, { shallow: true });
	}, [query]);

	if (!userRole) {
		return null;
	}

	return (
		<div className="">
			<PageHeader title={title}>
				<Filter
					onChange={handleChangeFilter}
					value={query}
					initFilter={{
						status: undefined,
						branch: undefined,
					}}
					fields={[
						{
							label: 'Status',
							name: 'status',
							node: (
								<SelectUserStatus />
							),
						},
						{
							label: 'Branch',
							name: 'branch',
							node: (
								<SelectBranch />
							),
						},
					]}
				/>
				<div className="ml-2">
					<Upsert
						onRefresh={() => { handleChangeFilter(); retry(); }}
						userRole={userRole}
					/>
				</div>
			</PageHeader>
			<Table
				loading={loading}
				onChange={handleChangeTable}
				dataSource={list.data}
				skip={query.skip}
				total={list.total}
				limit={list.limit || filterInit.limit}
				columns={[
					{
						title: 'Name',
						dataIndex: 'fullName',
						key: 'fullName',
						render: (val, row) => {
							return (
								<Link
									href={buildUrl({ ...query, profileId: 'user' + row.id })}
									as={`/profile/${'user' + row.id}`}
									shallow
								>
									<a>
										<div className="d-flex align-items-center">
											<Avatar
												src={row.avatar}
												name={row.fullName}
												size={50}
											/>
											<div className="ml-2">
												<div className="mb-0">
													<strong>{val}</strong>
												</div>
												<div>
													<UserStatus value={row.status} />
												</div>
											</div>
										</div>
									</a>
								</Link>
							);
						},
					},
					{
						title: 'Info',
						dataIndex: 'email',
						key: 'email',
						render: (val, row) => {
							return (
								<div>
									<div className="d-flex mb-1">
										<strong>Email:</strong>
										<div className="flex-1 ml-2">
											{row.email}
											{row.email2 ? <div>{row.email2}</div> : ''}
										</div>
									</div>
									<div className="d-flex mb-1">
										<strong>Phone:</strong>
										<div className="flex-1 ml-2">
											{formatPhone(row.phone)}
											{row.phone2 ? <div>{formatPhone(row.phone2)}</div> : ''}
										</div>
									</div>
								</div>
							);
						},
					},
					{
						title: 'Data',
						dataIndex: 'createdAt',
						key: 'createdAt',
						render: (val, row) => {
							return (
								<div>
									<div>
										<strong>Branch:</strong> {row.branch}
									</div>
									<div>
										<strong>Created at:</strong> <span className="fs-sm">{formatDate(row.createdAt)}</span>
									</div>
								</div>
							);
						},
					},
					{
						title: 'Action',
						dataIndex: 'action',
						key: 'action',
						align: 'right',
						className: 'pr-3',
						render: (val, row) => {
							return (
								<Space>
									<Upsert userRole={userRole} data={row} onRefresh={retry}>
										<strong><a>Edit</a></strong>
									</Upsert>
									<Divider type="vertical" />
									<BtnUserActionMore userData={row} onRefresh={retry} />
								</Space>
							);
						},
					},
				]}
			/>
		</div>
	);
};

UserList.propTypes = propTypes;

UserList.defaultProps = defaultProps;

export default UserList;
