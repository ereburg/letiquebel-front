import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';

import { containedBigButtonCss } from '@components/Button/Button.style';
import { SectionTitle, Text } from '@components/typography';

import Link from '@components/Link';

export const ResponseContainer = styled.div``;

export const Title = styled(SectionTitle)`
  max-width: 65vw;
  margin: 0 auto 2vw;
  
   ${media.tabletAndMobile(css`
     max-width: none;
   `)}

  ${media.tablet(css`
    margin-bottom: 3vw;
  `)}

  ${media.mobile(css`
    margin-bottom: 5vw;
  `)}
`;

export const Message = styled(Text)`
  max-width: 44vw;
  margin: 0 auto;

  ${media.tablet(css`
    max-width: 70vw;
  `)}

  ${media.mobile(css`
    max-width: none;
  `)}
`;

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: center;

  &:not(:first-child) {
    margin-top: 2.5vw;
  }

  ${media.tablet(css`
    &:not(:first-child) {
      margin-top: 3.5vw;
    }
  `)}

  ${media.mobile(css`
    &:not(:first-child) {
      margin-top: 5.5vw;
    }
  `)}
`;

export const ActionLink = styled(Link)`
  ${containedBigButtonCss};
  width: 30vw;

  ${media.tablet(css`
    width: 35vw;
  `)}

  ${media.mobile(css`
    width: 65vw;
  `)}
`;
