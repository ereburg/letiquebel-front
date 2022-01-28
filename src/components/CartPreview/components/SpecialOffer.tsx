import React from 'react';
import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { colors } from '@constants/theme';

import Button from '@components/Button';
import { titleCss } from '../CartPreview.style';

type Props = {
  productPreviewElem: JSX.Element;
};

function SpecialOffer({ productPreviewElem }: Props) {
  return (
    <OfferCard>
      <OfferTitle>Хотите взять полный комплекс со скидкой?</OfferTitle>
      {productPreviewElem}
      <OfferActions>
        <OfferButton>Отказаться</OfferButton>
        <OfferButton>Заменить на комплекс</OfferButton>
      </OfferActions>
    </OfferCard>
  );
}

export const OfferCard = styled.div`
  position: relative;
  background-color: ${colors.greyMiddle};

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 3.8vw;
    width: 0.8vw;
    height: 0.8vw;
    background-color: ${colors.greyMiddle};
    transform: translateY(-50%) rotate(45deg);
  }

  ${media.mobile(css`
    &:before {
      left: 13.8vw;
      width: 3vw;
      height: 3vw;
    }
  `)}
`;

export const OfferTitle = styled.span`
  ${titleCss};
  padding: 1.4vw 1.6vw 0;

  ${media.mobile(css`
    padding: 4.1vw 4.5vw 0;
    font-size: 2.9vw;
  `)}

  ${media.mobileM(css`
    padding: 4.7vw 4.5vw 0;
    font-size: 3.2vw;
  `)}
`;

export const OfferActions = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.6vw 1.4vw;

  ${media.mobile(css`
    padding: 0 4.5vw 4.1vw;
  `)}

  ${media.mobileM(css`
    padding: 0 4.5vw 4.7vw;
  `)}
`;

export const OfferButton = styled(Button).attrs({
  variant: 'defaultBold',
})`
  display: inline-block;
  font-size: 0.8vw;

  &:not(:last-child) {
    margin-right: 1.8vw;
  }

  ${media.mobile(css`
    font-size: 2.9vw;

    &:not(:last-child) {
      margin-right: 6vw;
    }
  `)}

  ${media.mobileL(css`
    font-size: 3.2vw;
  `)}
`;

export default SpecialOffer;
