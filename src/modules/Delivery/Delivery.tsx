import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { DELIVERY, ROUTES } from '@constants/common';

import { RootState } from '@store/reducers';

import { ContentSection, ContentContainer } from '@components/content';
import { PageTitle, SectionTitle, Text } from '@components/typography';

import {
  underlineButtonCss,
  containedBigButtonCss,
} from '@components/Button/Button.style';
import Link from '@components/Link';

import PopupModal from '@components/Modal/Popup';

import DeliveryProviderInfo from './components/DeliveryProviderInfo';
import DeliveryProviderInfoDemo from './components/DeliveryProviderInfoDemo';
import PaymentProviderInfo from './components/PaymentProviderInfo';

import packageImage from '@assets/images/delivery/package.png';
import deliveryProviderImage from '@assets/images/delivery/delivery-provider.png';
import paymentProviderImage from '@assets/images/delivery/payment-provider.png';
import faceSmileIcon from '@assets/images/icons/face-smile.png';
import letterIcon from '@assets/images/icons/letter.png';

function Delivery() {
  const [isModalVisible, setModalVisible] = useState(false);

  function handleClickModalToggle() {
    setModalVisible(!isModalVisible);
  }

  const {
    doorDeliveryText,
    doorDeliveryCost,
    officeDeliveryText,
  } = useSelector((state: RootState) => state.globalParams.data);
  const { phone, currency, minOrderPriceForDelivery } = useSelector(
    (state: RootState) => state.globalParams.data
  );

  const deliveryOptions: typeof DELIVERY = JSON.parse(JSON.stringify(DELIVERY));
  deliveryOptions.department.description = officeDeliveryText;
  deliveryOptions.door.description = doorDeliveryText;
  deliveryOptions.door.price = doorDeliveryCost;

  const isDemoShop = process.env.REACT_APP_IS_DEMO_SHOP;

  return (
    <>
      <PageTitle>
        <ContentContainer>Доставка и оплата</ContentContainer>
      </PageTitle>
      <ContentSection>
        <ContentContainer size="slim">
          <SectionTitle variant="accent" gutter="small">
            При заказе свыше {minOrderPriceForDelivery} {currency} доставка
            бесплатная!
          </SectionTitle>
          {!isDemoShop ? (
            <Text align="center">
              Мы осуществляем доставку с помощью курьерской службы ЕВРОПОЧТА 7
              дней в неделю. Средний срок доставки всего лишь 1-3 дня. Если вы
              уже оформили заказ и хотите уточнить его статус, пожалуйста,
              свяжитесь с нами по номеру телефона{' '}
              <a href={`tel:${phone}`}>{phone}</a>
            </Text>
          ) : (
            <Text align="center">
              Мы осуществляем доставку с помощью курьерской службы НАЗВАНИЕ 7
              дней в неделю. Средний срок доставки всего лишь 1-3 дня. Если вы
              уже оформили заказ и хотите уточнить его статус, пожалуйста,
              свяжитесь с нами по номеру телефона{' '}
              <a href={`tel:123456789012`}>+123456789012</a>
            </Text>
          )}
          <PackageImageWrap>
            <PackageImageElem src={packageImage} alt="package img" />
          </PackageImageWrap>
        </ContentContainer>
      </ContentSection>

      {!isDemoShop ? (
        <ContentSection>
          <ContentContainer size="slim">
            <DeliveryProviderInfo
              providerImage={deliveryProviderImage}
              providerDescription="Европочта - Доставка посылок по всей Беларуси"
              deliveryOptionList={deliveryOptions}
            />
          </ContentContainer>
        </ContentSection>
      ) : (
        <ContentSection>
          <ContentContainer size="slim">
            <DeliveryProviderInfoDemo />
            <ActionsWrapper>
              <ActionLink variant="containedBig" to={ROUTES.catalog.url}>
                Перейти в каталог
              </ActionLink>
            </ActionsWrapper>
          </ContentContainer>
        </ContentSection>
      )}

      {!isDemoShop && (
        <ContentSection>
          <ContentContainer size="slim">
            <SectionTitle gutter="small">
              <img src={letterIcon} alt="letter" />
              Оплатить очень просто!
            </SectionTitle>
            <Text align="center">
              После оформления заказа мы отправим вам ссылку для оплаты на
              указанный вами E-mail.
            </Text>
            <UsefulLinksWrapper>
              <UsefulLinkList>
                <UsefulLinkItem>
                  <UsefulButton onClick={handleClickModalToggle}>
                    Оплата карточкой
                  </UsefulButton>
                </UsefulLinkItem>
                <UsefulLinkItem>
                  <Link as={UsefulLink} to="/receiving-purchase">
                    Правила получения товара после оплаты
                  </Link>
                </UsefulLinkItem>
                <UsefulLinkItem>
                  <Link as={UsefulLink} to="/refund">
                    Возврат денежных средств
                  </Link>
                </UsefulLinkItem>
                <UsefulLinkItem>
                  <Link as={UsefulLink} to="/payment-security">
                    Безопасность платежей
                  </Link>
                </UsefulLinkItem>
                <UsefulLinkItem>
                  <Link as={UsefulLink} to="/data-policy">
                    Конфиденциальность информации
                  </Link>
                </UsefulLinkItem>
              </UsefulLinkList>
            </UsefulLinksWrapper>
          </ContentContainer>
        </ContentSection>
      )}

      {!isDemoShop && (
        <ContentSection>
          <ContentContainer size="slim">
            <SectionTitle gutter="small">
              <img src={faceSmileIcon} alt="smile" />
              Быстрая доставка
            </SectionTitle>
            <Text align="center">
              После оплаты вам лишь останется получить посылку, которую с
              любовью соберут для вас наши сотрудники, удобным для вас способом!
              Начинайте пользоваться сразу после получения ;-)
            </Text>
            <ActionsWrapper>
              <ActionLink variant="containedBig" to={ROUTES.catalog.url}>
                Перейти в каталог
              </ActionLink>
            </ActionsWrapper>
          </ContentContainer>
        </ContentSection>
      )}

      {!isDemoShop && isModalVisible ? (
        <PopupModal onClose={handleClickModalToggle}>
          <PaymentProviderInfo
            providerImage={paymentProviderImage}
            providerDescription="Alfa Bank"
          />
        </PopupModal>
      ) : null}
    </>
  );
}

const PackageImageWrap = styled.div`
  flex: 1 0 60%;
  max-width: 60%;
  margin: 0 auto;

  &:not(:first-child) {
    margin-top: 4vw;
  }

  &:not(:last-child) {
    margin-bottom: 4vw;
  }

  ${media.mobile(css`
    flex-basis: 100%;
    max-width: 100%;
    padding-left: 5vw;
    margin-bottom: 6vw;

    &:not(:first-child) {
      margin-top: 11vw;
    }

    &:not(:last-child) {
      margin-bottom: 11vw;
    }
  `)}
`;

const PackageImageElem = styled.img`
  display: block;
  width: 100%;
  max-width: 45vw;
  margin: 0 auto;

  ${media.tablet(css`
    max-width: 55vw;
  `)}

  ${media.mobile(css`
    max-width: 87vw;
  `)}
`;

const UsefulLinksWrapper = styled.div`
  max-width: 50vw;
  margin: 0 auto;

  &:not(:first-child) {
    margin-top: 2.5vw;
  }
  
  ${media.laptop(css`
    max-width: 56vw;
  `)}

  ${media.tablet(css`
    max-width: 76vw;

    &:not(:first-child) {
      margin-top: 3.5vw;
    }
  `)}

  ${media.mobile(css`
    max-width: none;

    &:not(:first-child) {
      margin-top: 5.5vw;
    }
  `)}
`;

const UsefulLinkList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: -15px;

  ${media.tablet(css`
    margin: -10px -15px;
  `)}

  ${media.mobileL(css`
    margin: -5px -10px;
  `)}
`;

const UsefulLinkItem = styled.li`
  margin: 15px;

  ${media.tablet(css`
    margin: 10px 15px;
  `)}

  ${media.mobileL(css`
    margin: 5px 10px;
  `)}
`;

const usefulLinkCss = css`
  font-size: 1vw;
  font-weight: 700;
  line-height: 1;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }

  ${media.tablet(css`
    font-size: 1.5vw;
  `)}

  ${media.mobile(css`
    font-size: 2.8vw;
    letter-spacing: 0.2vw;
  `)}
`;

const UsefulLink = styled.a`
  ${usefulLinkCss};
`;

const UsefulButton = styled.button`
  ${usefulLinkCss};
`;

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: center;

  &:not(:first-child) {
    margin-top: 2.5vw;
  }

  ${media.tablet(css`
    &:not(:first-child) {
      margin-top: 3.5vw;
    }
  `)}

  ${media.mobile(css`
    &:not(:first-child) {
      margin-top: 5.5vw;
    }
  `)}
`;

const ActionLink = styled(Link)<{ variant: string }>`
  ${({ variant }) =>
    variant === 'containedBig'
      ? css`
          ${containedBigButtonCss};
          width: 30vw;

          ${media.tablet(css`
            width: 35vw;
          `)}

          ${media.mobile(css`
            width: 65vw;
          `)}
        `
      : variant === 'underlineBig'
      ? css`
          ${underlineButtonCss};

          ${media.tablet(css`
            font-size: 2.4vw;
            line-height: 1.5;
            letter-spacing: 0.12vw;
          `)}

          ${media.mobile(css`
            font-size: 3.8vw;
            line-height: 1.5;
            letter-spacing: 0.2vw;
          `)}
        `
      : null}
`;

export default Delivery;
