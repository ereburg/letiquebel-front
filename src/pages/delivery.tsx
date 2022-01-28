import React from 'react';

import Page from '@components/Page';
import Layout from '@components/Layout';
import Delivery from '@modules/Delivery';

function DeliveryPage() {
  return (
    <Page title="Доставка и оплата - Letique Cosmetics">
      <Layout>
        <Delivery />
      </Layout>
    </Page>
  );
}

export default DeliveryPage;
