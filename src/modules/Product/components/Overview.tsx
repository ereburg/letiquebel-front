import React from 'react';
import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { colors } from '@constants/theme';

import Button from '@components/Button';
import ProductPrice from '@components/Product/Price';

type Props = {
  title: string;
  image?: string;
  descript: string;
  volume: string;
  discountPrice?: number;
  price: number;
  status?: string;
  handleAddClick: () => void;
  isSoldOut: boolean;
};

function Overview({
  title,
  image,
  descript,
  volume,
  discountPrice,
  price,
  handleAddClick,
  isSoldOut,
}: Props) {
  const resultVolume = volume?.replace(/\d+/g, (str) => `${str} мл`);

  return (
    <OverviewContainer>
      <ImageWrap>
        <ImageElem src={image} alt={title} />
      </ImageWrap>
      <Details>
        <Description dangerouslySetInnerHTML={{ __html: descript }} />
        {resultVolume ? <Weight>{resultVolume}</Weight> : null}
        <Price price={price} discountPrice={discountPrice} />
        {!isSoldOut ? (
          <ActionButton variant="underlineBig" onClick={handleAddClick}>
            Добавить в корзину
          </ActionButton>
        ) : null}
      </Details>
    </OverviewContainer>
  );
}

export const OverviewContainer = styled.figure`
  display: flex;

  ${media.tabletAndMobile(css`
    flex-direction: column;
  `)}
`;

export const ImageWrap = styled.div`
  flex: 1 1 53%;

  ${media.tabletAndMobile(css`
    flex: 1 1 auto;
    max-width: 100%;
    margin-bottom: 3.8vw;
  `)}

  ${media.mobile(css`
    margin-bottom: 7.8vw;
  `)}
`;

export const ImageElem = styled.img`
  display: block;
  width: 45.6vw;
  max-width: 100%;
  margin: 0 auto;

  ${media.tabletAndMobile(css`
    width: auto;
  `)}
`;

export const Details = styled.figcaption`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 1 47%;
  max-width: 47%;
  padding-left: 8.8vw;

  ${media.tabletAndMobile(css`
    align-items: center;
    flex: 1 1 auto;
    max-width: 100%;
    padding-left: 0;
  `)}
`;

const textCss = css`
  font-size: 1.1vw;
  line-height: 1.6;
  color: ${colors.silver};
  
  ${media.tablet(css`
    font-size: 2.5vw;
    line-height: 1.5;
  `)}

  ${media.mobile(css`
    font-size: 3.5vw;
    line-height: 1.5;
  `)}
  
  ${media.mobileL(css`
    font-size: 3.9vw;
  `)}
`;

export const Description = styled.div`
  max-width: 100%;
   
  ${media.tabletAndMobile(css`
    order: 4;
  `)}
  
  ${media.tablet(css`
    margin-top: 4vw;
  `)}

  ${media.mobile(css`
    margin-top: 10vw;
  `)}
  
  p {
    ${textCss};
    
    &:not(:last-child) {
      margin-bottom: 1.4vw;
    }

    ${media.mobile(css`
      &:not(:last-child) {
        margin-bottom: 3.4vw;
      }
    `)}
  }
`;

export const Weight = styled.span`
  display: block;
  margin-top: 1.4vw;
  font-size: 1vw;
  letter-spacing: 0.08vw;
  color: ${colors.grey};
  
  ${media.tabletAndMobile(css`
    margin-top: 0;
    order: 1;
  `)}

  ${media.tablet(css`
    font-size: 2.1vw;
    letter-spacing: 0.1vw;
  `)}

  ${media.mobile(css`
    font-size: 3.1vw;
    letter-spacing: 0.2vw;
  `)}
`;

export const Price = styled(ProductPrice)`
  margin-top: 2.9vw;
  font-size: 1.8vw;

  ${media.tabletAndMobile(css`
    order: 2;
    text-align: center;
  `)}
  
  ${media.tablet(css`
    font-size: 3.9vw;
    letter-spacing: 0.3vw;
  `)}

  ${media.mobile(css`
    font-size: 5.6vw;
    letter-spacing: 0.5vw;
  `)}
`;

export const ActionButton = styled(Button)`
  margin-top: 1.9vw;
  font-weight: 700;
  
  ${media.tabletAndMobile(css`
    order: 3;
  `)}

  ${media.tablet(css`
    margin-top: 4vw;
  `)}

  ${media.mobile(css`
    margin-top: 6vw;
  `)}
`;

export default Overview;
