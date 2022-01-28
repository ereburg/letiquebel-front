import React from 'react';

import Page from '@components/Page';
import Layout from '@components/Layout';
import NotFound from '@modules/NotFound';

function NotFoundPage() {
  return (
    <Page title="Странице не найдена | Letique Cosmetics">
      <Layout>
        <NotFound />
      </Layout>
    </Page>
  );
}

export default NotFoundPage;
