import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { FormikProps } from 'formik';

import { Nullable } from '@typings/common';
import { RootState } from '@store/reducers';

import { usePrevious } from '@hooks/usePrevious';

import { media } from '@utils/mixin';
import { colors } from '@constants/theme';
import { DELIVERY, PAYMENT, ROUTES } from '@constants/common';

import { REGION_OPTIONS } from '../Checkout.constants';

import { ContentContainer, ContentSection } from '@components/content';
import { contentTitleCss, SectionTitle, Text } from '@components/typography';

import Link from '@components/Link';
import { SelectFormik } from '@components/Select';
import { TextInputFormik } from '@components/TextInput';

import OptionCard from './OptionCard';
import SummaryPanel from './SummaryPanel';

import letterIcon from '@assets/images/icons/letter.png';

type Props = {
  orderState: FormikProps<any>;
  checkoutState: string;
  totalPrice: number;
};

function Information({ orderState, checkoutState, totalPrice }: Props) {
  const prevOrderState: any = usePrevious(orderState);

  const {
    doorDeliveryText,
    doorDeliveryCost,
    officeDeliveryText,
    minOrderPriceForDelivery,
  } = useSelector((state: RootState) => state.globalParams.data);

  const deliveryOptions: typeof DELIVERY = JSON.parse(JSON.stringify(DELIVERY));
  deliveryOptions.department.description = officeDeliveryText;
  deliveryOptions.door.description = doorDeliveryText;
  deliveryOptions.door.price = doorDeliveryCost;

  const paymentOptions: typeof PAYMENT = JSON.parse(JSON.stringify(PAYMENT));
  // paymentOptions.card.description = officeDeliveryText;
  // paymentOptions.cash.description = doorDeliveryText;

  const formValues = orderState.values;
  const packagePrice = formValues.wrap.price;
  const deliveryPrice = formValues.delivery.price;
  const activeDeliveryMethod = formValues.delivery.method;
  const activePaymentMethod = formValues.paymentMethod;
  const resultTotalPrice = totalPrice + packagePrice + deliveryPrice;

  function onChangeDeliveryMethod(method: string, price: number) {
    orderState.setFieldValue('delivery.method', method);
    orderState.setFieldValue('delivery.price', price);
  }

  function onChangePaymentMethod(method: string) {
    orderState.setFieldValue('paymentMethod', method);
  }

  function scrollToInvalidField(invalidField: HTMLFormElement) {
    const pageYOffset = window.pageYOffset;
    const fieldPos = invalidField.getBoundingClientRect().top;
    const viewportHalfHeight = document.documentElement.clientHeight / 2;
    const resultScrollPos = pageYOffset + fieldPos - viewportHalfHeight;

    invalidField.focus();
    window.scrollTo(0, pageYOffset);
    window.scrollTo({
      top: resultScrollPos,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    if (prevOrderState?.isSubmitting) {
      if (!orderState.isSubmitting && !orderState.isValid) {
        const firstInvalidField: Nullable<HTMLFormElement> = document.querySelector(
          `[data-invalid=true]`
        );

        if (firstInvalidField) {
          scrollToInvalidField(firstInvalidField);
        }
      }
    }
  }, [prevOrderState, orderState]);

  return (
    <DetailsContainer>
      <HintMessage align="center">
        Все поля обязательны для заполнения
      </HintMessage>
      {/*Данные клиента*/}
      <ContentBlock>
        <FieldsContainer>
          <FieldList>
            <FieldItem>
              <TextInputFormik
                name="phone"
                label="Номер телефона"
                placeholder="+375 XX XXXXXXX"
                formikState={orderState}
                autoFocus={true}
              />
            </FieldItem>
            <FieldItem>
              <TextInputFormik
                name="email"
                label="Ваш email"
                placeholder="example@gmail.com"
                formikState={orderState}
              />
            </FieldItem>
            <FieldItem>
              <TextInputFormik
                name="name"
                label="ФИО"
                formikState={orderState}
              />
            </FieldItem>
          </FieldList>
        </FieldsContainer>
      </ContentBlock>
      {/*Доставка*/}
      <ContentBlock>
        <ContentTitle>Доставка</ContentTitle>
        <GridContainer>
          {Object.values(deliveryOptions).map((item, index) => {
            const isActive = activeDeliveryMethod === item.name;
            const isDeliveryFree = totalPrice >= minOrderPriceForDelivery;
            const price = isDeliveryFree ? 0 : item.price;

            const onClick = !item.isUnavailable
              ? () => onChangeDeliveryMethod(item.name, price)
              : undefined;

            return (
              <GridItem key={index}>
                <OptionCard
                  price={price}
                  title={item.title}
                  isActive={isActive}
                  isUnavailable={item.isUnavailable}
                  description={item.description}
                  actionLabel={item.actionLabel}
                  actionLink={item.actionLink}
                  onClick={onClick}
                />
              </GridItem>
            );
          })}
        </GridContainer>
      </ContentBlock>
      {/*Адрес доставки*/}
      <ContentBlock>
        <ContentTitle>Адрес доставки</ContentTitle>
        <FieldsContainer>
          <FieldList>
            <FieldItem>
              <SelectFormik
                name="delivery.region"
                label="Область"
                placeholder="Выберите область"
                options={REGION_OPTIONS}
                formikState={orderState}
              />
            </FieldItem>
            <FieldItem>
              <TextInputFormik
                name="delivery.area"
                label="Район"
                formikState={orderState}
              />
            </FieldItem>
            <FieldItem>
              <TextInputFormik
                name="delivery.locality"
                label="Населенный пункт"
                formikState={orderState}
              />
            </FieldItem>
            <FieldItem>
              <TextInputFormik
                name="delivery.street"
                label="Улица"
                formikState={orderState}
              />
            </FieldItem>
            <FieldItem xs={6}>
              <TextInputFormik
                name="delivery.house"
                label="Дом"
                formikState={orderState}
              />
            </FieldItem>
            <FieldItem xs={6}>
              <TextInputFormik
                name="delivery.building"
                label="Корпус"
                formikState={orderState}
              />
            </FieldItem>
            <FieldItem xs={6}>
              <TextInputFormik
                name="delivery.frontDoor"
                label="Подъезд"
                formikState={orderState}
              />
            </FieldItem>
            <FieldItem xs={6}>
              <TextInputFormik
                name="delivery.flat"
                label="Квартира"
                formikState={orderState}
              />
            </FieldItem>
          </FieldList>
        </FieldsContainer>
      </ContentBlock>
      {/*Оплата*/}
      <ContentBlock>
        <ContentTitle>Оплата</ContentTitle>
        <GridContainer>
          {Object.values(paymentOptions).map((item, index) => {
            const isActive = activePaymentMethod === item.name;
            const onClick = !item.isUnavailable
              ? () => onChangePaymentMethod(item.name)
              : undefined;

            return (
              <GridItem key={index}>
                <OptionCard
                  title={item.title}
                  isActive={isActive}
                  isUnavailable={item.isUnavailable}
                  description={item.description}
                  onClick={onClick}
                />
              </GridItem>
            );
          })}
        </GridContainer>
      </ContentBlock>

      <CustomContentSection as="div">
        <ContentContainer noGutters size="slim">
          <SectionTitle gutter="small">
            <img src={letterIcon} alt="letter" />
            Оплатить очень просто!
          </SectionTitle>
          <Text align="center">
            После оформления заказа мы отправим вам ссылку для оплаты на
            указанный вами E-mail.
          </Text>
        </ContentContainer>
      </CustomContentSection>

      <SummaryContainer
        extraPriceLabel="Доставка"
        actionButtonLabel="Оформить заказ"
        extraPriceValue={deliveryPrice}
        totalPrice={resultTotalPrice}
        actionButtonHandler={orderState.handleSubmit}
        checkoutState={checkoutState}
        variant="vertical"
      />
      <OfferAgreement>
        Завершая оформление заказа, я даю своё согласие с условиями{' '}
        <Link to={ROUTES.userAgreement.url} target="_blank">
          договора-оферты
        </Link>
        .
      </OfferAgreement>
    </DetailsContainer>
  );
}

const DetailsContainer = styled.form`
  &,
  *:not(input) {
    user-select: none;
  }
`;

const HintMessage = styled(Text)`
  max-width: 80%;
  margin: 0 auto 3.6vw;
  color: ${colors.accent};

  ${media.mobile(css`
    margin-bottom: 7.5vw;
  `)}
`;

const ContentBlock = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 4vw;
  }

  ${media.mobile(css`
    &:not(:last-of-type) {
      margin-bottom: 11vw;
    }
  `)}
`;

const ContentTitle = styled.span`
  ${contentTitleCss};
  display: block;
  margin-bottom: 3vw;
  text-align: center;

  ${media.tablet(css`
    margin-bottom: 4vw;
  `)}

  ${media.mobile(css`
    margin-bottom: 6vw;
  `)}
`;

const FieldsContainer = styled.div`
  ${media.tablet(css`
    max-width: 80vw;
    margin: 0 auto;
  `)}
`;

const FieldList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 -10px;
`;

const FieldItem = styled.div<{ xs?: number }>`
  flex: 1 1 25%;
  max-width: 18.4vw;
  padding: 0 10px;
  margin: 0 auto;

  &:not(:nth-child(-n + 4)) {
    margin-top: 2.7vw;
  }

  ${media.mobile(css`
    flex-basis: 100%;
    max-width: 100%;

    &:not(:first-child) {
      margin-top: 6vw;
    }
  `)}

  ${({ xs }) =>
    xs &&
    media.mobile(css`
      flex-basis: ${100 * (xs / 12)}%;
      max-width: ${100 * (xs / 12)}%;
    `)}
`;

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 -10px;

  ${media.mobile(css`
    margin: 0 -5px;
  `)}
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 50%;
  max-width: 30vw;
  padding: 0 10px;

  &:not(:nth-child(-n + 2)) {
    margin-top: 20px;
  }

  ${media.tablet(css`
    max-width: 45%;
  `)}

  ${media.mobile(css`
    max-width: 100%;
    padding: 0 5px;
    margin: 0 auto;

    &:not(:nth-child(-n + 2)) {
      margin-top: 10px;
    }
  `)}

  ${media.mobileL(css`
    flex-basis: 100%;

    &:not(:nth-child(-n + 1)) {
      margin-top: 10px;
    }
  `)}
`;

const CustomContentSection = styled(ContentSection)`
  margin-bottom: 5.5vw;

  ${media.tablet(css`
    margin-bottom: 6.5vw;
  `)}

  ${media.mobile(css`
    margin-bottom: 13.5vw;
  `)}
`;

const SummaryContainer = styled(SummaryPanel)`
  width: 30%;
  margin-right: auto;

  ${media.mobile(css`
    width: auto;
  `)}
`;

const OfferAgreement = styled(Text)`
  display: block;
  max-width: 30vw;
  margin: 1vw auto 0;
  font-size: 0.9vw;
  line-height: 1.4;
  text-align: center;
  color: ${colors.grey};

  ${media.tablet(css`
    max-width: 35vw;
    margin-top: 2vw;
    font-size: 1.55vw;
  `)}

  ${media.mobile(css`
    max-width: 90vw;
    margin-top: 5vw;
    font-size: 3.2vw;
  `)}

  ${media.mobileL(css`
    font-size: 3.6vw;
  `)}
`;

export default Information;
