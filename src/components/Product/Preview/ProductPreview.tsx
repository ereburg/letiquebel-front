import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Product } from '@typings/models';
import { DYNAMIC_ROUTES } from '@constants/common';

import { addProduct, setCartVisibility } from '@store/reducers/cart';

import * as S from './ProductPreview.style';

type Props = {
  data: Product;
  link: string;
};

function ProductPreview({ data, link }: Props) {
  const isSoldOut = data.status === 'SOLD OUT';
  const resultVolume = data.volume?.replace(/\d+/g, (str) => `${str} мл`);

  const dispatch = useDispatch();
  const handleActionClick = useCallback(
    (data: Product) => {
      dispatch(setCartVisibility(true));
      dispatch(addProduct(data));
    },
    [dispatch]
  );

  return (
    <S.PreviewContainer>
      <S.ImageWrap
        href={`${DYNAMIC_ROUTES.product}/[alias]`}
        to={`${DYNAMIC_ROUTES.product}/${link}`}
      >
        <S.ImageElem
          src={data.file?.url}
          alt={data.title}
          isSoldOut={isSoldOut}
          loading="lazy"
        />
        {data.status ? <S.Label>{data.status}</S.Label> : null}
      </S.ImageWrap>
      <S.Details>
        <S.Title
          href={`${DYNAMIC_ROUTES.product}/[alias]`}
          to={`${DYNAMIC_ROUTES.product}/${link}`}
        >
          {data.title}
        </S.Title>
        {resultVolume ? <S.Weight>{resultVolume}</S.Weight> : null}
        <S.Price price={data.price} discountPrice={data.discountPrice} />
        {!isSoldOut ? (
          <S.ActionButton
            variant="underlineBold"
            onClick={() => handleActionClick(data)}
          >
            Добавить в корзину
          </S.ActionButton>
        ) : null}
      </S.Details>
    </S.PreviewContainer>
  );
}

export default ProductPreview;
