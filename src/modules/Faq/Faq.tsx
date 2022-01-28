import React from 'react';
import styled, { css } from 'styled-components';

import { QuestionGroup } from '@typings/models';

import { colors } from '@constants/theme';
import { media } from '@utils/mixin';

import { ContentSection, ContentContainer } from '@components/content';
import { PageTitle, SectionTitle } from '@components/typography';

import Accordion from '@components/Accordion';

type Props = {
  questionGroupList: Array<QuestionGroup>;
};

function Faq({ questionGroupList }: Props) {
  return (
    <>
      <PageTitle>
        <ContentContainer>FAQ</ContentContainer>
      </PageTitle>
      {questionGroupList &&
        questionGroupList.map((questionGroup, index) => (
          <ContentSection key={index}>
            <ContentContainer>
              <SectionTitle>{questionGroup.title}</SectionTitle>
              <ListContainer>
                {questionGroup.items.map((item, jndex) => (
                  <ListItem key={`${index}${jndex}}`}>
                    <Accordion
                      label={`${jndex + 1}. ${item.question}`}
                      content={item.answer}
                    />
                  </ListItem>
                ))}
              </ListContainer>
            </ContentContainer>
          </ContentSection>
        ))}
    </>
  );
}

const ListContainer = styled.ul``;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 2.2vw;
    padding-bottom: 2.2vw;
    border-bottom: 1px solid ${colors.accent};
  }

  ${media.mobile(css`
    &:not(:last-child) {
      padding-bottom: 4.7vw;
      margin-bottom: 4.7vw;
    }
  `)}

  ${media.mobileM(css`
    &:not(:last-child) {
      padding-bottom: 5.3vw;
      margin-bottom: 5.3vw;
    }
  `)}
`;

export default Faq;
