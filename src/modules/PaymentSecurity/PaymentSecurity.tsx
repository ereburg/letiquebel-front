import React from 'react';

import { PAYMENT_SECURITY } from './PaymentSecurity.constants';

import { ContentSection, ContentContainer } from '@components/content';
import { PageTitle } from '@components/typography';

import RuleList from '@components/RuleList';

function PaymentSecurity() {
  return (
    <>
      <PageTitle>
        <ContentContainer>Безопасность платежей</ContentContainer>
      </PageTitle>
      <ContentSection>
        <ContentContainer>
          <RuleList ruleList={PAYMENT_SECURITY} />
        </ContentContainer>
      </ContentSection>
    </>
  );
}

export default PaymentSecurity;
