import React from 'react';

import Page from '@components/Page';
import Layout from '@components/Layout';
import UserAgreement from '@modules/UserAgreement';

function UserAgreementPage() {
  return (
    <Page title="Пользовательское соглашение - Letique Cosmetics">
      <Layout>
        <UserAgreement />
      </Layout>
    </Page>
  );
}

export default UserAgreementPage;
