import React from 'react';
import App, { AppContext } from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/node';
import TagManager from 'react-gtm-module';

import { Nullable } from '@typings/common';
import { CustomAppPageContext, CustomAppProps } from '@typings/hocs';

import { initCartAutoPersist } from '@store/reducers/cart';
import { getGlobalParamsThunk } from '@store/reducers/globalParams';
import { getCategoryListThunk } from '@store/reducers/categoryList';
import { getProductListThunk } from '@store/reducers/products';
import { getGiftListThunk } from '@store/reducers/giftList';
import { getPromoThunk } from '@store/reducers/promo';

import '@assets/css/index.css';
import withRedux from '@hocs/withRedux';
import withYandexMetrika from '@hocs/withYandexMetrika';
import withGoogleAnalytics from '@hocs/withGoogleAnalytics';
import withFacebookPixel from '@hocs/withFacebookPixel';

import PromoPreview from '@components/PromoPreview';

Sentry.init({
  enabled: process.env.NODE_ENV === 'production',
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.REACT_APP_SENTRY_ENVIRONMENT,
});

/**
 * Custom App documentation
 * https://nextjs.org/docs/advanced-features/custom-app
 */
class CustomApp extends App<CustomAppProps> {
  /**
   * Adding a custom getInitialProps in your App will disable Automatic Static Optimization.
   * https://nextjs.org/docs/advanced-features/automatic-static-optimization
   */
  static async getInitialProps({ Component, ctx }: AppContext) {
    const { store, isServer } = ctx as CustomAppPageContext;

    const globalParamsPromise = store.dispatch(getGlobalParamsThunk());
    const categoryListPromise = store.dispatch(getCategoryListThunk());
    const productListPromise = store.dispatch(getProductListThunk());
    const giftListPromise = store.dispatch(getGiftListThunk());
    const promoPromise = store.dispatch(getPromoThunk());

    if (isServer) {
      await Promise.all([
        globalParamsPromise,
        categoryListPromise,
        productListPromise,
        giftListPromise,
        promoPromise,
      ]);
    }

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  componentDidMount() {
    NProgress.configure({ showSpinner: false });
    let timeoutId: Nullable<number> = null;
    const TIMEOUT = 500;

    function resetTimeoutIfNeeded() {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    }

    initCartAutoPersist(this.props.store);

    Router.events.on('routeChangeStart', (url) => {
      resetTimeoutIfNeeded();
      timeoutId = setTimeout(() => NProgress.start(), TIMEOUT);
    });
    Router.events.on('routeChangeComplete', () => {
      resetTimeoutIfNeeded();
      NProgress.done();
    });
    Router.events.on('routeChangeError', () => {
      resetTimeoutIfNeeded();
      NProgress.done();
    });

    if (process.env.REACT_APP_GOOGLE_TAG_MANAGER_ID) {
      TagManager.initialize({
        gtmId: process.env.REACT_APP_GOOGLE_TAG_MANAGER_ID,
      });
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;

    // @ts-ignore
    const { err } = this.props;
    const modifiedPageProps = {
      ...pageProps,
      err,
    };

    return (
      <Provider store={store}>
        <Component {...modifiedPageProps} />
        <PromoPreview />
      </Provider>
    );
  }
}

export default withFacebookPixel(
  withGoogleAnalytics(withYandexMetrika(withRedux(CustomApp)))
);
