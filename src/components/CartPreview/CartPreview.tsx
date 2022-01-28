import React, { useCallback, useEffect, useRef } from 'react';
import { Router } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';

import { RootState } from '@store/reducers';
import { removeProduct } from '@store/reducers/cart';

import {
  MIN_DOOR_DELIVERY_TEXT,
  FREE_DOOR_DELIVERY_TEXT,
  DEPARTMENT_DELIVERY_TEXT,
} from './CartPreview.constants';
import { ROUTES } from '@constants/common';
import useMedia from '@hooks/useMedia';

import Link from '@components/Link';

import ProductPreview from './components/ProductPreview';

import * as S from './CartPreview.style';

type Props = {
  className?: string;
  isVisible: boolean;
  setVisible: () => void;
};

function CartPreview({ isVisible, setVisible, ...props }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timerIdRef = useRef<null | number>(null);
  const isMobileLayout = useMedia(`(max-width: 767px)`);

  const dispatch = useDispatch();
  const handleRemoveClick = useCallback(
    (data) => {
      dispatch(removeProduct(data));
    },
    [dispatch]
  );

  const { currency, minOrderPriceForDelivery } = useSelector(
    (state: RootState) => state.globalParams.data
  );
  const { productList, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );
  const { data: giftList } = useSelector((state: RootState) => state.giftList);

  const resultProductList = [...productList].reverse();
  const resultGiftList = giftList.filter((gift) => gift.price <= totalPrice);
  const priceUntilFreeDelivery = minOrderPriceForDelivery - totalPrice;

  useEffect(() => {
    const containerElem = containerRef.current;
    if (!containerElem || !isVisible) return;

    function setCloseTimer() {
      resetCloseTimer();
      timerIdRef.current = setTimeout(() => {
        setVisible();
      }, 3000);
    }

    function resetCloseTimer() {
      if (!timerIdRef.current) return;
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }

    if (!isMobileLayout) {
      containerElem.addEventListener('mouseenter', resetCloseTimer);
      containerElem.addEventListener('mouseleave', setCloseTimer);
      setCloseTimer();
    } else {
      disableBodyScroll(containerElem, {
        reserveScrollBarGap: true,
      });
    }

    const handleRouteChange = () => setVisible();
    Router.events.on('beforeHistoryChange', handleRouteChange);

    return () => {
      Router.events.off('beforeHistoryChange', handleRouteChange);

      if (!isMobileLayout) {
        containerElem.removeEventListener('mouseenter', resetCloseTimer);
        containerElem.removeEventListener('mouseleave', setCloseTimer);
      } else {
        clearAllBodyScrollLocks();
      }
    };
  }, [isVisible, setVisible, isMobileLayout]);

  return (
    <S.CartContainer ref={containerRef} isVisible={isVisible} {...props}>
      <S.Header>
        <S.HeaderTitle>Корзина</S.HeaderTitle>
        <S.CloseButton onClick={setVisible} />
      </S.Header>
      <S.Content>
        <S.ProductList>
          {resultProductList.map((product, index) => (
            <S.ProductItem key={index}>
              <ProductPreview
                data={product}
                handleRemoveClick={() => {
                  productList.length < 2 && setVisible();
                  handleRemoveClick(product);
                }}
              />
            </S.ProductItem>
          ))}
          {resultGiftList.map((gift, index) => {
            const product = {
              ...gift.product,
              discountPrice: 0,
              amount: 1,
              price: 0,
            };

            return (
              <S.ProductItem key={productList.length + index}>
                <ProductPreview data={product} />
              </S.ProductItem>
            );
          })}
        </S.ProductList>
      </S.Content>
      <S.Footer>
        <S.Summary>
          <S.SummaryPrice>
            <S.SummaryLabel>Итого:</S.SummaryLabel>
            <S.SummaryValue>
              {totalPrice} {currency}
            </S.SummaryValue>
          </S.SummaryPrice>
          <Link as={S.SummaryButton} to={ROUTES.checkout.url}>
            Оформить заказ
          </Link>
        </S.Summary>
        <S.Delivery>
          <S.DeliveryMessage
            dangerouslySetInnerHTML={{
              __html:
                minOrderPriceForDelivery > totalPrice
                  ? `${DEPARTMENT_DELIVERY_TEXT} - <span>Бесплатно</span><br />
                     ${MIN_DOOR_DELIVERY_TEXT} <span>${priceUntilFreeDelivery} ${currency}</span>`
                  : `${FREE_DOOR_DELIVERY_TEXT}`,
            }}
          />
        </S.Delivery>
      </S.Footer>
    </S.CartContainer>
  );
}

export default CartPreview;
