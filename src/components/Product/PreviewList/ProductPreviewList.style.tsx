import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';

export const ProductsContainer = styled.div``;

export const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 -10px;
`;

export const GridItem = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  padding: 0 10px;

  &:not(:nth-child(-n + 2)) {
    margin-top: 3.5vw;
  }

  ${media.tablet(css`
    &:not(:nth-child(-n + 2)) {
      margin-top: 4.5vw;
    }
  `)}

  ${media.mobile(css`
    &:not(:nth-child(-n + 2)) {
      margin-top: 15vw;
    }
  `)}
`;
