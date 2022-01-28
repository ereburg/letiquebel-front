import React from 'react';

import Page from '@components/Page';
import Layout from '@components/Layout';
import PaymentSecurity from '@modules/PaymentSecurity';

function PaymentSecurityPage() {
  return (
    <Page title="Безопасность платежей - Letique Cosmetics">
      <Layout>
        <PaymentSecurity />
      </Layout>
    </Page>
  );
}

export default PaymentSecurityPage;
