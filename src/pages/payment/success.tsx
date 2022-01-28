import React from 'react';
import { NextPage, NextPageContext } from 'next';
import Error from '@pages/_error';

import { getPaymentStatus } from '@services/requests';

import Page from '@components/Page';
import Layout from '@components/Layout';
import Payment from '@modules/Payment';

type Props =
  | {
      pageType: 'PAYMENT_SUCCESS';
      status: string;
    }
  | {
      pageType: 'ERROR';
      statusCode: number;
    };

const PaymentPage: NextPage<Props> = (props) => {
  if (props.pageType === 'ERROR') {
    return <Error statusCode={props.statusCode} />;
  }

  return (
    <Page title="Заказ оформлен - Letique Cosmetics">
      <Layout>
        <Payment status={props.status} result="success" />
      </Layout>
    </Page>
  );
};

PaymentPage.getInitialProps = async ({ query }: NextPageContext) => {
  const orderId = Array.isArray(query.orderId)
    ? query.orderId[0]
    : query.orderId;

  try {
    return {
      pageType: 'PAYMENT_SUCCESS',
      status: (await getPaymentStatus(orderId)).status,
    } as Props;
  } catch (error) {
    return { pageType: 'ERROR', statusCode: 500 } as Props;
  }
};

export default PaymentPage;
