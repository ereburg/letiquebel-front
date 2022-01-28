import React from 'react';

import Page from '@components/Page';
import Layout from '@components/Layout';
import DataPolicy from '@modules/DataPolicy';

function PolicyPage() {
  return (
    <Page title="Политика обработки персональных данных - Letique Cosmetics">
      <Layout>
        <DataPolicy />
      </Layout>
    </Page>
  );
}

export default PolicyPage;
