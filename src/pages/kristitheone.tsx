import React from 'react';
import { NextPage } from 'next';
import Error from '@pages/_error';

import {
  getProductList,
  getProductSetList,
  getSliderList,
} from '@services/requests';
import { Product, Slide } from '@typings/models';

import Page from '@components/Page';
import Layout from '@components/Layout';
import Home from '@modules/Home';

type Props =
  | {
      pageType: 'EXTRA_HOME';
      sliderList: Array<Slide>;
      productList: Array<Product>;
      extraProductList: Array<Product>;
      productSetList: Array<Product>;
    }
  | {
      pageType: 'ERROR';
      statusCode: number;
    };

const HomePage: NextPage<Props> = (props) => {
  if (props.pageType === 'ERROR') {
    return <Error statusCode={props.statusCode} />;
  }

  const extraSectionTitle = 'Letique x Kristitheone';
  const slideList = props.sliderList.filter(
    (item) => item.category?.alias === 'letique-x-kristitheone'
  );

  return (
    <Page title="Letique x Kristitheone - Letique Cosmetics">
      <Layout headerLogoType="kristitheone" headerLogoLink="/kristitheone">
        <Home
          slideList={slideList}
          productList={props.productList.slice(0, 4)}
          extraProductList={props.extraProductList}
          productSetList={props.productSetList.slice(0, 4)}
          extraSectionTitle={extraSectionTitle}
        />
      </Layout>
    </Page>
  );
};

HomePage.getInitialProps = async () => {
  try {
    const [
      sliderList,
      productList,
      extraProductList,
      productSetList,
    ] = await Promise.all([
      getSliderList(),
      getProductList(),
      getProductList('letique-x-kristitheone'),
      getProductSetList(),
    ]);

    return {
      pageType: 'EXTRA_HOME',
      sliderList: sliderList.data,
      productList: productList.data,
      extraProductList: extraProductList.data,
      productSetList: productSetList.data,
    } as Props;
  } catch (error) {
    return { pageType: 'ERROR', statusCode: 500 } as Props;
  }
};

export default HomePage;
