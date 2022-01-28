import React from 'react';
import { NextPage } from 'next';
import Error from '@pages/_error';

import { ProductPackage } from '@typings/models';
import { getProductPackageList } from '@services/requests';

import Page from '@components/Page';
import Layout from '@components/Layout';
import Checkout from '@modules/Checkout';

type Props =
  | {
      pageType: 'CHECKOUT';
      packageList: Array<ProductPackage>;
    }
  | {
      pageType: 'ERROR';
      statusCode: number;
    };

const CheckoutPage: NextPage<Props> = (props) => {
  if (props.pageType === 'ERROR') {
    return <Error statusCode={props.statusCode} />;
  }

  return (
    <Page title="Оформление заказа - Letique Cosmetics">
      <Layout disabledCartDropdown>
        <Checkout packageList={props.packageList} />
      </Layout>
    </Page>
  );
};

CheckoutPage.getInitialProps = async () => {
  try {
    return {
      pageType: 'CHECKOUT',
      packageList: (await getProductPackageList()).data,
    } as Props;
  } catch (error) {
    return { pageType: 'ERROR', statusCode: 500 } as Props;
  }
};

export default CheckoutPage;
