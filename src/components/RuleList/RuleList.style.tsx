import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { colors } from '@constants/theme';
import { contentTitleCss } from '@components/typography';

export const ListContainer = styled.ul`
  &:not(:first-child) {
    margin-top: 1.4vw;
  }

  ${media.mobile(css`
    &:not(:first-child) {
      margin-top: 3.3vw;
    }
  `)}
  
  span {
    ${contentTitleCss};
    display: block;

    &:not(:last-child) {
      margin-bottom: 2.5vw;
    }

    ${media.mobile(css`
      &:not(:last-child) {
        margin-bottom: 4.3vw;
      }
    `)}
  }
  
  p {
    font-size: 1.1vw;
    line-height: 1.6;
    color: ${colors.silver};
    
    &:not(:first-child) {
      margin-top: 1.4vw;
    }
  
    ${media.tablet(css`
      font-size: 1.85vw;
    `)}

    ${media.mobile(css`
      font-size: 3.5vw;
    `)}

    ${media.mobileL(css`
      font-size: 3.9vw;

      &:not(:first-child) {
        margin-top: 3.3vw;
      }
    `)}
  }
`;

export const ListGroup = styled.li`
  &:not(:last-child) {
    margin-bottom: 4.5vw;
  }

  ${media.mobile(css`
    &:not(:last-child) {
      margin-bottom: 9.3vw;
    }
  `)}
`;

export const ListItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 1.4vw;
  }

  ${ListContainer} {
    margin-top: 0.8vw;
  }

  ${media.mobile(css`
    &:not(:last-child) {
      margin-bottom: 3.3vw;
    }

    ${ListContainer} {
      margin-top: 2.2vw;
    }
  `)}
`;

export const ListSubItem = styled.li`
  padding-left: 15px;

  &:not(:last-child) {
    margin-bottom: 0.8vw;
  }

  ${media.mobile(css`
    &:not(:last-child) {
      margin-bottom: 2.2vw;
    }
  `)}

  ${media.mobileL(css`
    padding-left: 0;
  `)}
`;

export const TextContent = styled.p``;
