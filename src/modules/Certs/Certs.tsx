import React from 'react';

import { CERT_LIST } from './Certs.constants';

import { ContentSection, ContentContainer } from '@components/content';
import { PageTitle } from '@components/typography';

import CertList from './components/CertList';

function Certs() {
  return (
    <>
      <PageTitle>
        <ContentContainer>Сертификаты</ContentContainer>
      </PageTitle>
      <ContentSection>
        <ContentContainer>
          <CertList certList={CERT_LIST} />
        </ContentContainer>
      </ContentSection>
    </>
  );
}

export default Certs;
