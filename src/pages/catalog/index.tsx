import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store/reducers';

import Page from '@components/Page';
import Layout from '@components/Layout';
import Catalog from '@modules/Catalog';

const CatalogPage = () => {
  const { data } = useSelector((state: RootState) => state.productList);

  return (
    <Page title="Каталог - Letique Cosmetics">
      <Layout>
        <Catalog productList={data} />
      </Layout>
    </Page>
  );
};

export default CatalogPage;
