import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';

import { CartProduct } from '@typings/models';
import { RootState } from '@store/reducers';

import { media, objectFit } from '@utils/mixin';
import { colors } from '@constants/theme';

import closeIcon from '@assets/images/icons/close.png';

type Props = {
  data: CartProduct;
  isAGift?: boolean;
  handleChange?: (amount: number) => void;
  handleRemove?: () => void;
};

function ProductPreview({ data, isAGift, handleRemove, handleChange }: Props) {
  const minusButtonRef = useRef<HTMLButtonElement>(null);
  const plusButtonRef = useRef<HTMLButtonElement>(null);

  const { currency } = useSelector(
    (state: RootState) => state.globalParams.data
  );

  function handleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    if (!handleChange || !handleRemove) return;

    const inputElement = e.currentTarget;

    if (inputElement.value.length) {
      const value = parseInt(inputElement.value);
      if (value < 1) handleRemove();
      else handleChange(value);
    } else {
      handleChange(data.amount);
    }
  }

  function handleChangeClick(e: React.MouseEvent) {
    if (!handleChange || !handleRemove) return;

    const minusButtonElement = minusButtonRef.current;
    const plusButtonElement = plusButtonRef.current;
    if (!minusButtonElement || !plusButtonElement) return;

    const buttonElement = e.currentTarget;

    if (buttonElement === minusButtonElement) {
      const amount = data.amount - 1;
      if (amount < 1) handleRemove();
      else handleChange(amount);
    } else if (buttonElement === plusButtonElement) {
      handleChange(data.amount + 1);
    }
  }

  return (
    <ProductContainer>
      <ProductImageWrap>
        <ProductImage src={data.file?.url} alt={data.title} />
      </ProductImageWrap>
      <ProductDetails>
        <ProductTitle>{data.title}</ProductTitle>
        {isAGift ? (
          <ProductDetailsGroup>
            <ProductPrice>В подарок</ProductPrice>
          </ProductDetailsGroup>
        ) : (
          <ProductDetailsGroup>
            <ProductPrice>
              {data.totalPrice} {currency}
            </ProductPrice>
            <ProductQuantity>
              <QuantityButton
                ref={minusButtonRef}
                onClick={handleChangeClick}
                data-symbol="–"
              />
              <QuantityInput
                onChange={handleChangeValue}
                value={data.amount}
                type="number"
              />
              <QuantityButton
                ref={plusButtonRef}
                onClick={handleChangeClick}
                data-symbol="+"
              />
            </ProductQuantity>
            <ProductRemoveButton onClick={handleRemove} />
          </ProductDetailsGroup>
        )}
      </ProductDetails>
    </ProductContainer>
  );
}

const ProductContainer = styled.figure`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 3vw;

  ${media.mobile(css`
    padding: 0;
  `)}
`;

const ProductImageWrap = styled.div`
  flex-shrink: 0;
`;

const ProductImage = styled.img`
  width: 21vw;
  height: 12vw;
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

const ProductDetails = styled.figcaption`
  display: flex;
  align-items: flex-start;
  flex: 1 1 auto;
  margin: auto 0 auto 3vw;

  ${media.mobile(css`
    flex-direction: column;
    min-height: 13vw;
    margin-top: 0;
    margin-bottom: 0;
  `)}
`;

const ProductTitle = styled.span`
  display: block;
  width: 60%;
  margin-right: 2vw;
  font-size: 1.2vw;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.1vw;
  text-transform: uppercase;

  ${media.mobile(css`
    width: auto;
    max-width: calc(100% - 5.1vw);
    margin-right: 0;
    margin-bottom: 2.1vw;
    font-size: 2.8vw;
    letter-spacing: 0.3vw;
  `)}

  ${media.mobileL(css`
    font-size: 3.1vw;
  `)}
`;

const ProductDetailsGroup = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 40%;
  padding: 0.15vw 3vw 0 0;

  ${media.mobile(css`
    position: static;
    align-items: center;
    width: auto;
    max-width: 100%;
    padding-top: 0;
    margin-top: auto;
  `)}
`;

const ProductPrice = styled.span`
  font-size: 1.3vw;
  letter-spacing: 0.15vw;
  text-transform: uppercase;
  
  ${media.mobile(css`
    order: 2;
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

const ProductQuantity = styled.div`
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  margin-left: 1vw;

  ${media.mobile(css`
    order: 1;
    margin-left: 0;
    margin-right: 4vw;
  `)}
`;

const QuantityInput = styled.input`
  width: 2.7vw;
  border: none;
  border-bottom: 2px solid ${colors.greyMiddle};
  font-size: 1vw;
  font-weight: 700;
  letter-spacing: 0.1vw;
  line-height: 1.5;
  text-align: center;
  background-color: transparent;

  ${media.mobile(css`
    width: 8.6vw;
    font-size: 3.6vw;
  `)}
`;

const QuantityButton = styled.button`
  display: inline-block;
  vertical-align: top;
  font-size: 1.8vw;
  font-weight: 300;
  line-height: 0.75;
  color: ${colors.grey};

  &:before {
    content: attr(data-symbol);
  }

  &:first-child {
    margin-right: 0.4vw;
  }

  &:last-child {
    margin-left: 0.4vw;
  }

  ${media.mobile(css`
    font-size: 7.8vw;
    line-height: 0.55;
  `)}
`;

const ProductRemoveButton = styled.button`
  position: absolute;
  top: 0.55vw;
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
