import React from 'react';
import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { colors } from '@constants/theme';

import Button from '@components/Button';
import ProductPrice from '@components/Product/Price';

type Props = {
  title: string;
  image?: string;
  discountPrice?: number;
  price: number;
  handleAddClick: () => void;
  isSoldOut: boolean;
};

function Preview({
  title,
  image,
  discountPrice,
  price,
  handleAddClick,
  isSoldOut,
}: Props) {
  return (
    <PreviewContainer>
      <ImageWrap>
        <ImageElem src={image} alt={title} />
      </ImageWrap>
      <Details>
        <Title>{title}</Title>
        <Price price={price} discountPrice={discountPrice} />
        {!isSoldOut ? (
          <ActionButton onClick={handleAddClick}>
            Добавить в корзину
          </ActionButton>
        ) : null}
      </Details>
    </PreviewContainer>
  );
}

const PreviewContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 55vw;
  margin: 8.4vw auto 0;

  ${media.desktopAndLaptop(css`
    border: 0.3vw solid ${colors.accent};
  `)}

  ${media.tabletAndMobile(css`
    flex-direction: column;
    max-width: none;
  `)}
  
  ${media.mobile(css`
    margin-top: 20vw;
  `)}
`;

const ImageWrap = styled.div`
  position: relative;
  display: block;

  ${media.tabletAndMobile(css`
    margin-bottom: 2.4vw;
  `)}
`;

const ImageElem = styled.img`
  display: block;
  width: 24vw;
  margin: 0 auto;

  ${media.tabletAndMobile(css`
    width: auto;
  `)}

  ${media.tablet(css`
    max-width: 84%;
  `)}
`;

const Details = styled.figcaption`
  max-width: 22vw;
  margin-left: 6vw;
  padding: 2.3vw 3vw 2.3vw 0;
  
  ${media.tabletAndMobile(css`
    margin: 0 auto;
    padding: 0;
  `)}

  ${media.tablet(css`
    max-width: 32vw;
    text-align: center;
  `)}

  ${media.mobile(css`
    max-width: none;
    text-align: center;
  `)}
`;

const Title = styled.span`
  display: block;
  margin-bottom: 1.6vw;
  font-size: 1.2vw;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15vw;
  line-height: 1.5;
  color: ${colors.black};

  ${media.tablet(css`
    font-size: 1.8vw;
    letter-spacing: 0.2vw;
  `)}

  ${media.mobile(css`
    margin-bottom: 2.9vw;
    font-size: 2.8vw;
    letter-spacing: 0.3vw;
  `)}
  
  ${media.mobileM(css`
    font-size: 3vw;
  `)}
`;

const Price = styled(ProductPrice)``;

const ActionButton = styled(Button).attrs({
  variant: 'underlineBold',
})`
  margin-top: 1.6vw;

  ${media.tablet(css`
    font-size: 1.5vw;
    letter-spacing: 0.1vw;
  `)}

  ${media.mobile(css`
    margin-top: 6vw;
    font-size: 2.8vw;
    letter-spacing: 0.2vw;
  `)}
`;

export default Preview;
