import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { colors } from '@constants/theme';

export const PriceContainer = styled.div`
  font-size: 1.3vw;
  text-transform: uppercase;
  letter-spacing: 0.2vw;

  ${media.tablet(css`
    font-size: 1.9vw;
  `)}

  ${media.mobile(css`
    font-size: 4vw;
    letter-spacing: 0.3vw;
  `)}
`;

const priceCss = css`
  display: block;
`;

export const CurrPrice = styled.span`
  ${priceCss};
  color: ${colors.black};
`;

export const OldPrice = styled.span`
  ${priceCss};
  margin-bottom: 0.36vw;
  text-decoration: line-through;
  color: ${colors.greyDark};
`;
