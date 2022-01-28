import React from 'react';

import { DATA_POLICY } from './DataPolicy.constants';

import { ContentSection, ContentContainer } from '@components/content';
import { PageTitle } from '@components/typography';

import RuleList from '@components/RuleList';

function DataPolicy() {
  return (
    <>
      <PageTitle>
        <ContentContainer>
          Политика обработки персональных данных
        </ContentContainer>
      </PageTitle>
      <ContentSection>
        <ContentContainer>
          <RuleList ruleList={DATA_POLICY} />
        </ContentContainer>
      </ContentSection>
    </>
  );
}

export default DataPolicy;
