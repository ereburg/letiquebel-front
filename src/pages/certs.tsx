import React from 'react';

import Page from '@components/Page';
import Layout from '@components/Layout';
import Certs from '@modules/Certs';

function CertsPage() {
  return (
    <Page title="Сертификаты - Letique Cosmetics">
      <Layout>
        <Certs />
      </Layout>
    </Page>
  );
}

export default CertsPage;
