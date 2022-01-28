import React from 'react';

import { REFUND } from './Refund.constants';

import { ContentSection, ContentContainer } from '@components/content';
import { PageTitle } from '@components/typography';

import RuleList from '@components/RuleList';

function Refund() {
  return (
    <>
      <PageTitle>
        <ContentContainer>Возврат денежных средств</ContentContainer>
      </PageTitle>
      <ContentSection>
        <ContentContainer>
          <RuleList ruleList={REFUND} />
        </ContentContainer>
      </ContentSection>
    </>
  );
}

export default Refund;
