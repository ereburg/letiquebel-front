import React from 'react';

import Page from '@components/Page';
import Layout from '@components/Layout';
import ReceivingPurchase from '@modules/ReceivingPurchase';

function ReceivingPurchasePage() {
  return (
    <Page title="Правила получения товара после оплаты - Letique Cosmetics">
      <Layout>
        <ReceivingPurchase />
      </Layout>
    </Page>
  );
}

export default ReceivingPurchasePage;
