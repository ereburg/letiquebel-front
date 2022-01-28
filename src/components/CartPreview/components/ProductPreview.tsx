import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';

import { media, objectFit } from '@utils/mixin';
import { colors } from '@constants/theme';
import { DYNAMIC_ROUTES } from '@constants/common';

import { CartProduct } from '@typings/models';

import { RootState } from '@store/reducers';

import Link from '@components/Link';
import { titleCss } from '../CartPreview.style';

import closeIcon from '@assets/images/icons/close.png';

type Props = {
  data: CartProduct;
  handleRemoveClick?: () => void;
};

function ProductPreview({ data, handleRemoveClick }: Props) {
  const { currency } = useSelector(
    (state: RootState) => state.globalParams.data
  );

  return (
    <ProductCard>
      <ProductImageWrap
        href={`${DYNAMIC_ROUTES.product}/[alias]`}
        to={`${DYNAMIC_ROUTES.product}/${data.link}`}
      >
        <ProductImage src={data.file?.url} alt={data.title} />
      </ProductImageWrap>
      <ProductDetails>
        <ProductTitle
          href={`${DYNAMIC_ROUTES.product}/[alias]`}
          to={`${DYNAMIC_ROUTES.product}/${data.link}`}
        >
          {data.title}
        </ProductTitle>
        <ProductPrices>
          <ProductCalcPrice>
            <ProductPrice>
              {data.discountPrice || data.price} {currency}
            </ProductPrice>
            <ProductCount>x{data.amount}</ProductCount>
          </ProductCalcPrice>
          <ProductPrice>
            {data.totalPrice ? `${data.totalPrice} ${currency}` : `В подарок`}
          </ProductPrice>
        </ProductPrices>
        {handleRemoveClick ? (
          <ProductRemoveButton onClick={handleRemoveClick} />
        ) : null}
      </ProductDetails>
    </ProductCard>
  );
}

export const ProductCard = styled.figure`
  display: flex;
  align-items: center;
  padding: 1.2vw 1.6vw;

  ${media.mobile(css`
    padding: 3.9vw 4.5vw;
  `)}

  ${media.mobileM(css`
    padding: 4.2vw 4.5vw;
  `)}
`;

export const ProductImageWrap = styled(Link)`
  display: block;
  flex-shrink: 0;
  padding-top: 0.2vw;

  ${media.mobile(css`
    padding-top: 0;
  `)}
`;

export const ProductImage = styled.img`
  width: 6.6vw;
  height: 4vw;
  margin: 0 auto;
  ${objectFit('contain')};

  ${media.mobile(css`
    width: 26vw;
    height: 16vw;
  `)}

  ${media.mobileL(css`
    width: 28vw;
    height: 17vw;
  `)}
`;

export const ProductDetails = styled.figcaption`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 3.6vw;
  margin-left: 1.1vw;

  ${media.mobile(css`
    min-height: 13vw;
    margin-left: 2.7vw;
  `)}
`;

export const ProductTitle = styled(Link)`
  ${titleCss};
  display: inline-block;
  max-width: calc(100% - 1.2vw);
  margin-bottom: 0.9vw;
  font-size: 0.8vw;

  ${media.mobile(css`
    max-width: calc(100% - 5.2vw);
    margin-bottom: 2.1vw;
  `)}
`;

export const ProductPrices = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  margin-top: auto;
`;

export const ProductCalcPrice = styled.div``;

export const ProductPrice = styled.span`
  font-size: 1vw;
  letter-spacing: 0.1vw;
  text-transform: uppercase;

  ${media.mobile(css`
    font-size: 3.1vw;
    letter-spacing: 0.3vw;
  `)}

  ${media.mobileL(css`
    font-size: 3.4vw;
  `)}
  
  ${media.mobileM(css`
    font-size: 3.7vw;
  `)}
`;

export const ProductCount = styled.span`
  margin-left: 0.6vw;
  font-size: 0.9vw;
  color: ${colors.grey};

  ${media.mobile(css`
    font-size: 3.1vw;
    margin-left: 2.6vw;
  `)}

  ${media.mobileL(css`
    font-size: 3.4vw;
  `)}
`;

export const ProductRemoveButton = styled.button`
  position: absolute;
  top: 0.2vw;
  right: 0;
  width: 0.75vw;
  height: 0.75vw;
  background: url("${closeIcon}") no-repeat center / contain;
  cursor: pointer;
  z-index: 1;
  
  ${media.mobile(css`
    top: 0.4vw;
    width: 3vw;
    height: 3vw;
  `)}
`;

export default ProductPreview;
