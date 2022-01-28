import React from 'react';
import { NextPage } from 'next';
import Error from '@pages/_error';

import { useSelector } from 'react-redux';

import { RootState } from '@store/reducers';
import { Product } from '@typings/models';

import { getProductList } from '@services/requests';

import Page from '@components/Page';
import Layout from '@components/Layout';
import Catalog from '@modules/Catalog';

type Props =
  | {
      key: string;
      pageType: 'CATEGORY';
      productList: Array<Product>;
      categoryAlias: string;
    }
  | {
      pageType: 'ERROR';
      statusCode: number;
    };

const CatalogPage: NextPage<Props> = (props) => {
  const { data: categoryList } = useSelector(
    (state: RootState) => state.categoryList
  );

  if (props.pageType === 'ERROR') {
    return <Error statusCode={props.statusCode} />;
  }

  const categoryTitle = categoryList.find(
    (category) => category.alias === props.categoryAlias
  )?.title;

  return (
    <Page title={`${categoryTitle} - Letique Cosmetics`}>
      <Layout>
        <Catalog
          categoryTitle={categoryTitle}
          productList={props.productList}
        />
      </Layout>
    </Page>
  );
};

CatalogPage.getInitialProps = async ({ query }) => {
  const categoryAlias = Array.isArray(query.alias)
    ? query.alias[0]
    : query.alias;

  try {
    return {
      key: categoryAlias,
      pageType: 'CATEGORY',
      productList: (await getProductList(categoryAlias)).data,
      categoryAlias,
    } as Props;
  } catch (error) {
    return { pageType: 'ERROR', statusCode: 500 } as Props;
  }
};

export default CatalogPage;
