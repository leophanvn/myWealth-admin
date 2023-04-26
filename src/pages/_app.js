/* eslint-disable react/prop-types */
/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2021-06-19 15:26:14
*------------------------------------------------------- */
import React from 'react';
import Head from 'next/head';

import cookie from 'react-cookies';

import { AnimatePresence, motion } from 'framer-motion';

import NProgress from 'nprogress';
import { useRouter } from 'next/router';

import MainLayout from 'src/components/Layout/LayoutAuthenticated';

import wrapperStore from 'src/redux';

require('src/styles/index.less');

const easing = [0.175, 0.85, 0.42, 0.96];

const textVariants = {
	exit: { y: 0, opacity: 0.2, transition: { duration: 0.5, ease: easing } },
	enter: {
		y: 0,
		opacity: 1,
		transition: { delay: 0.1, duration: 0.5, ease: easing },
	},
};

const MyApp = (props) => {
	const { Component, pageProps } = props;
	const router = useRouter();

	const Layout = Component.Layout || MainLayout;

	React.useEffect(() => {
		const handleRouteChange = (url, { shallow }) => {
			if (!shallow) {
				NProgress.start();
			}
		};

		router.events.on('routeChangeStart', handleRouteChange);
		router.events.on('routeChangeComplete', () => NProgress.done());
		router.events.on('routeChangeError', () => NProgress.done());

		// If the component is unmounted, unsubscribe
		// from the event with the `off` method:
		return () => {
			router.events.off('routeChangeStart', handleRouteChange);
			router.events.off('routeChangeComplete', () => NProgress.done());
			router.events.off('routeChangeError', () => NProgress.done());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Layout>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, height=device-height, user-scalable=0" />
			</Head>
			<AnimatePresence
				exitBeforeEnter
			>
				<motion.div initial="exit" animate="enter" exit="exit" transition={{ type: 'linear' }} className="min-h-100">
					<motion.div
						variants={textVariants}
						key={router.route}
						className="min-h-100"
					>
						<Component {...pageProps} router={router} />
					</motion.div>
				</motion.div>
			</AnimatePresence>
		</Layout>
	);
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

MyApp.getInitialProps = async (context) => {
	const { ctx, Component } = context;

	if (!process.browser) {
		cookie.plugToRequest(ctx.req, ctx.res);
	}

	// calls page's `getInitialProps` and fills `appProps.pageProps`
	let pageProps = {};

	if (Component?.getInitialProps) {
		pageProps = await Component?.getInitialProps(ctx);
	}

	const propsData = {
		...pageProps,
	};

	let layoutProps = {};

	if (Component?.Layout) {
		layoutProps = await Component?.Layout?.getInitialProps?.({
			...ctx,
			pageProps: propsData,
		});
	} else {
		layoutProps = await MainLayout?.getInitialProps?.({
			...ctx,
			pageProps: propsData,
		});
	}

	return {
		pageProps: {
			...layoutProps,
			...propsData,
		},
	};
};

// uncomment if you want to use redux
export default wrapperStore.withRedux(MyApp);
