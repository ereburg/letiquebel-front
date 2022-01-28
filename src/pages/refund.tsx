import React from 'react';

import Page from '@components/Page';
import Layout from '@components/Layout';
import Refund from '@modules/Refund';

function RefundPage() {
  return (
    <Page title="Возврат денежных средств - Letique Cosmetics">
      <Layout>
        <Refund />
      </Layout>
    </Page>
  );
}

export default RefundPage;
