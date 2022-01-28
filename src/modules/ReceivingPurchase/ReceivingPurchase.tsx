import React from 'react';

import { RECEIVING_PURCHASE } from './ReceivingPurchase.constants';

import { ContentSection, ContentContainer } from '@components/content';
import { PageTitle } from '@components/typography';

import RuleList from '@components/RuleList';

function ReceivingPurchase() {
  return (
    <>
      <PageTitle>
        <ContentContainer>
          Правила получения товара после оплаты
        </ContentContainer>
      </PageTitle>
      <ContentSection>
        <ContentContainer>
          <RuleList ruleList={RECEIVING_PURCHASE} />
        </ContentContainer>
      </ContentSection>
    </>
  );
}

export default ReceivingPurchase;
