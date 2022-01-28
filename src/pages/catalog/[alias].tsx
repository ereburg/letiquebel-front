import React from 'react';
import { useSelector } from 'react-redux';
import { NextPage, NextPageContext } from 'next';
import Error from '@pages/_error';

import { RootState } from '@store/reducers';
import { ProductDetails } from '@typings/models';

import { getProductDetails } from '@services/requests';

import { CUSTOM_CATEGORIES } from '@constants/common';

import Page from '@components/Page';
import Layout from '@components/Layout';
import Product from '@modules/Product';

type Props =
  | {
      key: string;
      pageType: 'PRODUCT';
      productDetails: ProductDetails;
      productAlias: string;
    }
  | {
      pageType: 'ERROR';
      statusCode: number;
    };

const ProductPage: NextPage<Props> = (props) => {
  const { data: categoryList } = useSelector(
    (state: RootState) => state.categoryList
  );

  if (props.pageType === 'ERROR') {
    return <Error statusCode={props.statusCode} />;
  }

  let customCategoryType, headerLogoLink;
  const categoryAlias = props.productDetails.categories[0]?.alias;
  const customCategory = categoryList.find(
    (item) => item.custom && item.alias === categoryAlias
  );

  if (customCategory) {
    customCategoryType = CUSTOM_CATEGORIES[customCategory.alias].type;
    headerLogoLink = CUSTOM_CATEGORIES[customCategory.alias].url;
  }

  return (
    <Page title={`${props.productDetails.title} - Letique Cosmetics`}>
      <Layout
        headerLogoType={customCategoryType}
        headerLogoLink={headerLogoLink}
      >
        <Product
          pageType={customCategoryType}
          productDetails={props.productDetails}
        />
      </Layout>
    </Page>
  );
};

ProductPage.getInitialProps = async ({ query }: NextPageContext) => {
  const productAlias = Array.isArray(query.alias)
    ? query.alias[0]
    : query.alias;

  try {
    return {
      key: productAlias,
      pageType: 'PRODUCT',
      productDetails: (await getProductDetails(productAlias)).data,
      productAlias,
    } as any;
  } catch (error) {
    return { pageType: 'ERROR', statusCode: 500 } as Props;
  }
};

export default ProductPage;
