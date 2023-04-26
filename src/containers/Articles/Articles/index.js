/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2021-01-14 23:07:23
*------------------------------------------------------- */

import React from 'react';
// import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';
import Router, { useRouter } from 'next/router';

import { Space, Tag } from 'antd';

import { getList } from 'src/redux/actions/article';

import formatDate from 'src/utils/format-date';
import buildUrl from 'src/utils/build-url';

import Table from 'src/components/Core/Table';
import PageHeader from 'src/components/Core/PageHeader';
import Filter from 'src/components/Core/Filter';
import SelectStatusPublic from 'src/components/Forms/SelectStatusPublic';
import Status from 'src/components/Forms/SelectStatusPublic/Display';
import SelectCategory from 'src/components/Forms/SelectCategory';
import SelectSubcategory from 'src/components/Forms/SelectSubcategory';

import Upsert from './Upsert';

const propTypes = {
	// classes: PropTypes.object.isRequired,
};

const defaultProps = {
	// classes: {},
};

const OnlineLessons = () => {
	// const { } = props;
	const [categoryIdFilter, setCategoryIdFilter] = React.useState('');
	const router = useRouter();

	const { query = {} } = router;

	const filterInit = React.useMemo(() => {
		return {
			skip: 0,
			limit: 10,
			where: {},
			include: [
				{
					relation: 'category',
				},
				{
					relation: 'subcategory',
				},
			],
		};
	}, []);

	const dispatch = useDispatch();

	const { value: list = {}, loading, retry } = useAsyncRetry(async () => {
		const { skip = 0, ...restQuery } = query || {};

		const where = Object.entries(restQuery).reduce((preVal, [key, val]) => {
			if (val && val !== 'all') {
				if (key === 'q') {
					return {
						...preVal,
						name: { regexp: `/${val}/i` },
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
					...where,
				},
			},
		}));

		return response;
	}, [router.asPath]);

	const handleChangeFilter = React.useCallback((data) => {
		Router.push(buildUrl({ ...data, skip: '' }), undefined, { shallow: true });
	}, []);

	const handleChangeTable = React.useCallback((sk) => {
		Router.push(buildUrl({ ...query, skip: sk }), undefined, { shallow: true });
	}, [query]);

	return (
		<div className="">
			<PageHeader title="Articles">
				<Filter
					onChange={handleChangeFilter}
					value={query}
					initFilter={{
						state: undefined,
						subcategoryId: undefined,
						categoryId: undefined,
					}}
					fields={[
						{
							label: 'State',
							name: 'state',
							node: (
								<SelectStatusPublic />
							),
						},
						{
							label: 'Category',
							name: 'categoryId',
							onChange: (v, form) => {
								form.setFieldsValue({ subcategoryId: undefined });
								setCategoryIdFilter(v);
							},
							node: (
								<SelectCategory />
							),
						},
						(
							categoryIdFilter ? {
								label: 'Subcategory',
								name: 'subcategoryId',
								node: (
									<SelectSubcategory where={{ parentCategoryId: categoryIdFilter }} />
								),
							} : null
						),
					]}
				/>
				<div className="ml-2">
					<Upsert onRefresh={() => { handleChangeFilter(); retry(); }} />
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
						title: 'Thumbnail',
						dataIndex: 'thumbnail',
						key: 'thumbnail',
						width: 180,
						render: (val, row) => {
							return (
								<img src={val} alt="#" />
							);
						},
					},
					{
						title: 'Info',
						dataIndex: 'title',
						key: 'title',
						render: (val, row) => {
							return (
								<div>
									<div className="mb-1">
										<Upsert data={row} onRefresh={retry}>
											<strong><a>{val}</a></strong>
										</Upsert>
									</div>
									<div
										className="text-mute mb-2"
										style={{
											display: '-webkit-box',
											WebkitLineClamp: '3',
											WebkitBoxOrient: 'vertical',
											overflow: 'hidden',
											lineHeight: '18px',
										}}
									>
										{row.summary}
									</div>
									<div className="class mb-2">
										{
											row.hashtag.map((el) => {
												return <Tag key={el}>{el}</Tag>;
											})
										}
									</div>
									<div className="class">
										URL: <a target="_blank" href={'https://learn.mywealth.ai/article/' + row.slug} rel="noreferrer">https://learn.mywealth.ai/article/{row.slug}</a>
									</div>
								</div>
							);
						},
					},
					{
						title: 'Data',
						dataIndex: 'hashtag',
						key: 'hashtag',
						width: 300,
						render: (val, row) => {
							return (
								<div>
									<div>
										<strong>Category:</strong> <strong className="text-primary">{row.category?.name}</strong>
									</div>
									<div>
										<strong>Subcategory:</strong> <strong className="text-primary">{row.subcategory?.name}</strong>
									</div>
									<div>
										<strong>Created at:</strong> <span className="fs-sm">{formatDate(row.createdAt)}</span>
									</div>
									<div>
										<strong>Last updated at:</strong> <span className="fs-sm">{formatDate(row.updatedAt)}</span>
									</div>
									<strong>Published at:</strong> <span className="fs-sm">{formatDate(row.publishedDate)}</span>
								</div>
							);
						},
					},
					{
						title: 'State',
						dataIndex: 'state',
						key: 'state',
						render: (val, row) => {
							return (
								<Status value={val} />
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
									<Upsert data={row} onRefresh={retry}>
										<strong><a>Edit</a></strong>
									</Upsert>
								</Space>
							);
						},
					},
				]}
			/>
		</div>
	);
};

OnlineLessons.propTypes = propTypes;

OnlineLessons.defaultProps = defaultProps;

export default OnlineLessons;
