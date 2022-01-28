import React from 'react';
import { NextPage } from 'next';
import { useSelector } from 'react-redux';
import Error from '@pages/_error';

import { getSliderList, getProductSetList } from '@services/requests';
import { Slide, Product } from '@typings/models';
import { RootState } from '@store/reducers';

import Page from '@components/Page';
import Layout from '@components/Layout';
import Home from '@modules/Home';

type Props =
  | {
      pageType: 'HOME';
      sliderList: Array<Slide>;
      productSetList: Array<Product>;
    }
  | {
      pageType: 'ERROR';
      statusCode: number;
      error: any;
    };

const HomePage: NextPage<Props> = (props) => {
  const { data } = useSelector((state: RootState) => state.productList);

  if (props.pageType === 'ERROR') {
    return <Error statusCode={props.statusCode} />;
  }

  return (
    <Page title="Letique Cosmetics - натуральная косметика из высококачественных компонентов">
      <Layout disabledLogo>
        <Home
          slideList={props.sliderList.filter((item) => !item.category)}
          productSetList={props.productSetList}
          productList={data}
        />
      </Layout>
    </Page>
  );
};

HomePage.getInitialProps = async () => {
  try {
    const [productSetList, slideList] = await Promise.all([
      getProductSetList(),
      getSliderList(),
    ]);

    return {
      pageType: 'HOME',
      sliderList: slideList.data,
      productSetList: productSetList.data,
    } as Props;
  } catch (error) {
    return { pageType: 'ERROR', statusCode: 500 } as Props;
  }
};

export default HomePage;
