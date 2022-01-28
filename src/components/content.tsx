import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';

export const ContentSection = styled.section<{ hideOverflow?: boolean }>`
  margin: 6vw auto 6.5vw;
  overflow: ${({ hideOverflow }) => (hideOverflow ? 'hidden' : 'visible')};

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  ${media.tablet(css`
    margin: 7vw 0 7.5vw;
  `)}

  ${media.mobile(css`
    margin: 14vw 0 14.5vw;
  `)}
`;

export const ContentContainer = styled.div<{
  size?: string;
  noGutters?: boolean;
}>`
  width: 100%;
  max-width: 77vw;
  margin: 0 auto;
  padding: 0 20px;
  
  ${media.tabletAndMobile(css`
    max-width: none;
  `)}
  
  ${({ size }) =>
    size === 'slim' &&
    css`
      max-width: 68vw;
    `}

  ${({ size }) =>
    size === 'wide' &&
    css`
      max-width: 88vw;
    `}

  ${({ size }) =>
    size === 'fluid' &&
    css`
      max-width: none;
    `}
  
  ${({ noGutters }) =>
    noGutters &&
    css`
      padding: 0;
    `}
`;
