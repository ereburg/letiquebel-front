import React from 'react';
import { NextPage } from 'next';
import Error from '@pages/_error';

import { Shop } from '@typings/models';
import { getShopList } from '@services/requests';

import Page from '@components/Page';
import Layout from '@components/Layout';
import Shops from '@modules/Shops';

type Props =
  | {
      pageType: 'SHOPS';
      shopList: Array<Shop>;
    }
  | {
      pageType: 'ERROR';
      statusCode: number;
    };

const ShopsPage: NextPage<Props> = (props) => {
  if (props.pageType === 'ERROR') {
    return <Error statusCode={props.statusCode} />;
  }

  return (
    <Page title="Магазины - Letique Cosmetics">
      <Layout>
        <Shops shopList={props.shopList} />
      </Layout>
    </Page>
  );
};

ShopsPage.getInitialProps = async () => {
  try {
    return {
      pageType: 'SHOPS',
      shopList: (await getShopList()).data,
    } as Props;
  } catch (error) {
    return { pageType: 'ERROR', statusCode: 500 } as Props;
  }
};

export default ShopsPage;
