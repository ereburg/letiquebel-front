import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { ProductPackage } from '@typings/models';
import { CheckoutState, CheckoutOrder } from './Checkout.types';
import { handleValidation } from './Checkout.helpers';

import { ROUTES } from '@constants/common';
import { colors } from '@constants/theme';
import { media } from '@utils/mixin';

import { STEP_LIST, INIT_ORDER_DATA } from './Checkout.constants';

import { RootState } from '@store/reducers';
import { resetCart } from '@store/reducers/cart';
import { checkoutOrder } from '@services/requests';

import { PageTitle, Text } from '@components/typography';
import { ContentSection, ContentContainer } from '@components/content';

import RequestResponse from '@components/RequestResponse';

import StepButton from './components/StepButton';

import successIcon from '@assets/images/icons/face-smile.png';
import failureIcon from '@assets/images/icons/face-sad.png';

type Props = { packageList: Array<ProductPackage> };

function Checkout({ packageList }: Props) {
  const [checkoutState, setCheckoutState] = useState<CheckoutState>('IDLE');

  const dispatch = useDispatch();
  const resetCartState = useCallback(() => {
    dispatch(resetCart());
  }, [dispatch]);

  const orderState = useFormik({
    initialValues: {
      ...INIT_ORDER_DATA,
      wrap: {
        id: packageList[0].id,
        price: packageList[0].price,
      },
    },
    validate: handleValidation,
    onSubmit: handleOrderSubmit,
  });

  function handleOrderSubmit(values: CheckoutOrder) {
    if (checkoutState === 'IN_PROGRESS') return;
    setCheckoutState('IN_PROGRESS');

    const resultProductList = productList.map((item) => ({
      amount: item.amount,
      id: item.id,
    }));
    const resultGiftList = giftList
      .filter((item) => item.price <= totalPrice)
      .map((item) => ({
        id: item.product.id,
        amount: 1,
      }));
    const resultValues = {
      ...values,
      items: [...resultProductList, ...resultGiftList],
      wrapId: values.wrap.id,
    };

    delete resultValues.wrap;
    delete resultValues.delivery.price;

    checkoutOrder(resultValues)
      .then(() => {
        setCheckoutState('ON_SUCCESS');
        resetCartState();
      })
      .catch(() => {
        setCheckoutState('ON_ERROR');
      });
  }

  const [availableSteps, setAvailableSteps] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const ActiveSection = STEP_LIST[activeStepIndex]
    ? STEP_LIST[activeStepIndex].section
    : null;

  const { phone } = useSelector((state: RootState) => state.globalParams.data);
  const { messageAfterOrder } = useSelector(
    (state: RootState) => state.globalParams.data
  );

  const { data: giftList } = useSelector((state: RootState) => state.giftList);
  const { productList, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );

  function handleStepClick(index: number) {
    setActiveStepIndex(index);
    window.scrollTo(0, 0);
  }

  function handleNextStepClick() {
    const nextActiveStepIndex = activeStepIndex + 1;
    const resultAvailableSteps =
      nextActiveStepIndex > availableSteps
        ? nextActiveStepIndex
        : availableSteps;

    setAvailableSteps(resultAvailableSteps);
    setActiveStepIndex(nextActiveStepIndex);
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    if (
      checkoutState === 'ON_SUCCESS' ||
      checkoutState === 'ON_ERROR' ||
      !productList.length
    ) {
      window.scrollTo(0, 0);
    }
  });

  return checkoutState === 'IDLE' || checkoutState === 'IN_PROGRESS' ? (
    <>
      <PageTitle>
        <ContentContainer>Оформление заказа</ContentContainer>
      </PageTitle>
      {productList.length ? (
        <ContentSection>
          <ContentContainer>
            <StepsContainer>
              {STEP_LIST.map((step, index) => {
                const isAvailable = index <= availableSteps;
                const onClick = isAvailable
                  ? () => handleStepClick(index)
                  : undefined;

                return (
                  <StepsItem key={index}>
                    <StepButton
                      label={step.label}
                      isActive={activeStepIndex === index}
                      isAvailable={isAvailable}
                      onClick={onClick}
                    />
                  </StepsItem>
                );
              })}
            </StepsContainer>
            {ActiveSection ? (
              <ActiveSection
                orderState={orderState}
                totalPrice={totalPrice}
                productList={productList}
                giftList={giftList}
                packageList={packageList}
                handleNextStepClick={handleNextStepClick}
                checkoutState={checkoutState}
              />
            ) : null}
          </ContentContainer>
        </ContentSection>
      ) : (
        <ContentSection>
          <ContentContainer>
            <Text align="center">В корзине ничего нет :(</Text>
          </ContentContainer>
        </ContentSection>
      )}
    </>
  ) : checkoutState === 'ON_SUCCESS' ? (
    <>
      <PageTitle>
        <ContentContainer>Заказ оформлен!</ContentContainer>
      </PageTitle>
      <ContentSection>
        <ContentContainer>
          <RequestResponse
            iconUrl={successIcon}
            title={`Ваш заказ успешно оформлен!<br />Ожидайте звонка от нашего менеджера для уточнения информации.`}
            linkLabel="Перейти в каталог"
            linkTo={ROUTES.catalog.url}
            text={messageAfterOrder}
          />
        </ContentContainer>
      </ContentSection>
    </>
  ) : checkoutState === 'ON_ERROR' ? (
    <>
      <PageTitle>
        <ContentContainer>Что-то пошло не так =(</ContentContainer>
      </PageTitle>
      <ContentSection>
        <ContentContainer>
          <RequestResponse
            iconUrl={failureIcon}
            title={`Уважаемый покупатель!<br />При оформлении заказа произошла ошибка. Повторите заказ заново.`}
            text={`Если ошибка будет повторяться, свяжитесь, пожалуйста, c нашим менеджером по номеру <a href="tel:${phone}">${phone}</a>`}
            linkLabel="Повторить заказ"
            linkHref={ROUTES.checkout.url}
          />
        </ContentContainer>
      </ContentSection>
    </>
  ) : null;
}

const StepsContainer = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4vw;

  ${media.mobile(css`
    margin-bottom: 8vw;
  `)}
`;

const StepsItem = styled.li`
  position: relative;

  &:not(:last-child) {
    margin-right: 4.4vw;

    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: calc(100% + 0.9vw);
      transform: translateY(-50%);
      display: block;
      width: 2.7vw;
      height: 1px;
      background-color: ${colors.grey};
    }
  }

  ${media.tablet(css`
    &:not(:last-child) {
      margin-right: 7.4vw;

      &:after {
        left: calc(100% + 1.5vw);
        width: 4.2vw;
      }
    }
  `)}

  ${media.mobile(css`
    &:not(:last-child) {
      margin-right: 9.4vw;

      &:after {
        left: calc(100% + 1.7vw);
        width: 6.2vw;
      }
    }
  `)}
`;

export default Checkout;
