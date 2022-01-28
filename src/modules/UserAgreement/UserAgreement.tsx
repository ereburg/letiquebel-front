import React from 'react';

import { USER_AGREEMENT } from './UserAgreement.constants';

import { ContentSection, ContentContainer } from '@components/content';
import { PageTitle } from '@components/typography';

import RuleList from '@components/RuleList';

function UserAgreement() {
  return (
    <>
      <PageTitle>
        <ContentContainer>Пользовательское соглашение</ContentContainer>
      </PageTitle>
      <ContentSection>
        <ContentContainer>
          <RuleList ruleList={USER_AGREEMENT} />
        </ContentContainer>
      </ContentSection>
    </>
  );
}

export default UserAgreement;
