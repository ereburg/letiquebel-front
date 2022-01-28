import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@store/reducers';

import * as S from './ProductPrice.style';

type Props = {
  price: number;
  discountPrice?: number;
  className?: string;
};

function ProductPrice({ price, discountPrice, ...props }: Props) {
  const { currency } = useSelector(
    (state: RootState) => state.globalParams.data
  );

  return (
    <S.PriceContainer {...props}>
      {discountPrice ? (
        <>
          <S.OldPrice>
            {price} {currency}
          </S.OldPrice>
          <S.CurrPrice>
            {discountPrice} {currency}
          </S.CurrPrice>
        </>
      ) : (
        <S.CurrPrice>
          {price} {currency}
        </S.CurrPrice>
      )}
    </S.PriceContainer>
  );
}

export default ProductPrice;
