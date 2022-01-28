import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';

import { CartProduct, Gift } from '@typings/models';
import { changeProductAmount, removeProduct } from '@store/reducers/cart';

import { media } from '@utils/mixin';
import { colors } from '@constants/theme';

import ProductPreview from './ProductPreview';
import SummaryPanel from './SummaryPanel';

type Props = {
  productList: Array<CartProduct>;
  giftList: Array<Gift>;
  totalPrice: number;
  handleNextStepClick: () => void;
};

function Products({
  productList,
  giftList,
  totalPrice,
  handleNextStepClick,
}: Props) {
  const dispatch = useDispatch();
  const handleRemove = useCallback(
    (data) => {
      dispatch(removeProduct(data));
    },
    [dispatch]
  );
  const handleChangeAmount = useCallback(
    (data, amount) => {
      dispatch(changeProductAmount(data, amount));
    },
    [dispatch]
  );

  const resultProductList = [...productList].reverse();
  const resultGiftList = giftList.filter((gift) => gift.price <= totalPrice);

  return (
    <CartContainer>
      <ProductList>
        {resultProductList.map((product, index) => (
          <ProductItem key={index}>
            <ProductPreview
              handleRemove={() => handleRemove(product)}
              handleChange={(amount) => handleChangeAmount(product, amount)}
              data={product}
            />
          </ProductItem>
        ))}
      </ProductList>
      {resultGiftList.length ? (
        <ProductList>
          {resultGiftList.map((gift, index) => {
            const product = {
              ...gift.product,
              discountPrice: 0,
              amount: 1,
              price: 0,
            };

            return (
              <ProductItem key={productList.length + index} variant="outline">
                <ProductPreview data={product} isAGift={true} />
              </ProductItem>
            );
          })}
        </ProductList>
      ) : null}
      <SummaryContainer
        totalPrice={totalPrice}
        actionButtonLabel="Продолжить"
        actionButtonHandler={handleNextStepClick}
      />
    </CartContainer>
  );
}

const CartContainer = styled.div`
  &,
  * {
    user-select: none;
  }
`;

const ProductList = styled.ul`
  &:not(:last-of-type) {
    margin-bottom: 3.6vw;
  }

  ${media.mobile(css`
    &:not(:last-of-type) {
      padding-bottom: 4.8vw;
      margin-bottom: 4.8vw;
    }
  `)}
`;

const ProductItem = styled.li<{ variant?: string }>`
  &:not(:last-child) {
    padding-bottom: 1.8vw;
    margin-bottom: 1.8vw;
    border-bottom: 1px solid ${colors.greyMiddle};
  }

  ${media.mobile(css`
    &:not(:last-child) {
      padding-bottom: 4.8vw;
      margin-bottom: 4.8vw;
    }
  `)}

  ${({ variant }) =>
    variant === 'outline' &&
    css`
      &,
      &:not(:last-child) {
        padding: 1.8vw 0;
        margin-bottom: 0;
        border: 1px solid ${colors.accent};
      }

      &:not(:last-child) {
        border-bottom: none;
      }

      ${media.mobile(css`
        &,
        &:not(:last-child) {
          padding: 3.8vw 0;
          margin-bottom: 0;
        }
      `)}
    `}
`;

const SummaryContainer = styled(SummaryPanel)`
  margin-top: 4.5vw;

  ${media.mobile(css`
    margin-top: 6.6vw;
  `)}
`;

export default Products;
