import React from 'react';
import { NextPage, NextPageContext } from 'next';
import Error from '@pages/_error';

import { getPaymentLink, getPaymentStatus } from '@services/requests';

import Page from '@components/Page';
import Layout from '@components/Layout';
import Payment from '@modules/Payment';

type Props =
  | {
      pageType: 'PAYMENT_FAILURE';
      paymentLink: string;
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
    <Page title="Что-то пошло не так - Letique Cosmetics">
      <Layout>
        <Payment paymentLink={props.paymentLink} result="failure" />
      </Layout>
    </Page>
  );
};

PaymentPage.getInitialProps = async ({ query }: NextPageContext) => {
  const orderId = Array.isArray(query.orderId)
    ? query.orderId[0]
    : query.orderId;

  try {
    const [paymentStatus, paymentLink] = await Promise.all([
      getPaymentStatus(orderId),
      getPaymentLink(orderId),
    ]);

    return {
      pageType: 'PAYMENT_FAILURE',
      status: paymentStatus.status,
      paymentLink: paymentLink.url,
    } as Props;
  } catch (error) {
    return { pageType: 'ERROR', statusCode: 500 } as Props;
  }
};

export default PaymentPage;
