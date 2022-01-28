import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';

import { media } from '@utils/mixin';
import { colors } from '@constants/theme';
import { ROUTES } from '@constants/common';

import { RootState } from '@store/reducers';

import { ContentContainer } from '@components/content';

import Link from '@components/Link';

import logoImg from '@assets/images/logo.png';
import paymentLogoImg from '@assets/images/icons/payment.png';

type Props = {
  disabledLogo?: boolean;
};

function Footer({ disabledLogo }: Props) {
  const { phone, email, instagram } = useSelector(
    (state: RootState) => state.globalParams.data
  );

  const isDemoShop = process.env.REACT_APP_IS_DEMO_SHOP;
  const isContacts = [phone, email].length;

  return (
    <FooterContainer>
      <ContentContainer size="wide">
        <FooterInner>
          <FooterMain>
            <FooterLogo to="/" disabled={disabledLogo}>
              <img src={logoImg} alt="Letique Cosmetics" />
            </FooterLogo>
          </FooterMain>
          <FooterExtra>
            <ExtraLinks>
              <DarkLink to={ROUTES.delivery.url}>Доставка и оплата</DarkLink>
              <DarkLink to={ROUTES.certs.url}>Сертификаты</DarkLink>
            </ExtraLinks>
          </FooterExtra>
          {isContacts ? (
            <FooterContacts>
              {instagram ? (
                <InstagramLinkItem>
                  <ContactLink href={instagram} target="_blank">
                    instagram
                  </ContactLink>
                </InstagramLinkItem>
              ) : null}
              {phone ? (
                <PhoneLinkItem>
                  <ContactLink href={`tel:${phone}`}>{phone}</ContactLink>
                </PhoneLinkItem>
              ) : null}
            </FooterContacts>
          ) : null}
          <FooterHelp>
            <ExtraLinks>
              <GreyLink to={ROUTES.userAgreement.url}>
                Пользовательское соглашение
              </GreyLink>
              <GreyLink to={ROUTES.dataPolicy.url}>
                Политика обработки персональных данных
              </GreyLink>
            </ExtraLinks>
          </FooterHelp>
          <Copyright>© {new Date().getFullYear()}</Copyright>
          {!isDemoShop ? (
            <Requisites>
              ООО «ЛетикБел» | 220045, Республика Беларусь, г. Минск ул.
              Чюрлениса 14 пом. 201 | УНП 193394416 Интернет-магазин
              зарегистрирован в Торговом реестре РБ №479318 с 14.04.2020 г.
              Режим работы 10:00 – 20:00 <br />
              Телефон: 375 (29) 332-17-18 | E-mail: letiqueby@ya.ru
            </Requisites>
          ) : null}
          {!isDemoShop ? <PaymentLogo src={paymentLogoImg} /> : null}
        </FooterInner>
      </ContentContainer>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  flex: 0 0 auto;
  padding: 5vw 0 3.8vw;

  ${media.mobile(css`
    padding: 7vw 0 7.8vw;
  `)}
`;

const FooterInner = styled.div`
  position: relative;
`;

const FooterMain = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const FooterExtra = styled.div`
  margin-top: 2.1vw;

  ${media.tablet(css`
    margin-top: 3.1vw;
  `)}

  ${media.mobile(css`
    margin-top: 5.5vw;
  `)}
`;

const FooterHelp = styled.div`
  ${media.mobile(css`
    margin-top: 8vw;
  `)};
`;

const FooterLogo = styled(Link)<{ disabled?: boolean }>`
  display: block;
  cursor: pointer;

  img {
    width: 8.8vw;
    min-width: 120px;
  }

  ${media.mobile(css`
    img {
      width: 19vw;
      min-width: 90px;
    }
  `)}

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;
    `}
`;

const FooterContacts = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  ${media.mobile(css`
    position: relative;
    margin-top: 4vw;
    padding: 5vw 0;

    &:before,
    &:after {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      display: block;
      width: 9.4vw;
      height: 1px;
      background-color: ${colors.black};
    }

    &:before {
      top: 0;
    }

    &:after {
      bottom: 0;
    }
  `)}
`;

const linkCss = css`
  display: inline-block;
  margin: 0 1.6vw 1.8vw;
  font-size: 0.9vw;
  letter-spacing: 0.09vw;
  line-height: 1.2;
  color: ${colors.black};
  
  ${media.tablet(css`
    font-size: 1.5vw;
  `)}

  ${media.mobile(css`
    margin: 0 2vw 3vw;
    font-size: 2.8vw;
    letter-spacing: 0.2vw;
  `)}

  ${media.mobileL(css`
    font-size: 3.4vw;
  `)}
`;

const ContactLink = styled.a`
  ${linkCss};
  margin-bottom: 0;

  &:hover {
    opacity: 0.55;
  }

  ${media.mobile(css`
    margin-bottom: 0;
  `)}
`;

const DarkLink = styled(Link)`
  ${linkCss};
  text-transform: uppercase;

  &:hover {
    opacity: 0.55;
  }
`;

const GreyLink = styled(Link)`
  ${linkCss};
  color: ${colors.grey};

  &:hover {
    color: ${colors.greyDark};
  }
`;

const contactLinkItemCss = css`
  position: absolute;
  top: 0;
  display: flex;
  align-items: flex-start;
  padding-left: 2.9vw;

  ${media.noMobile(css`
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 2.9vw;
      height: 1px;
      background-color: ${colors.black};
    }
  `)}

  ${media.mobile(css`
    position: relative;
    padding-left: 0;
  `)}
`;

const InstagramLinkItem = styled.div`
  ${contactLinkItemCss};
  left: 0;
`;

const PhoneLinkItem = styled.div`
  ${contactLinkItemCss};
  right: 0;
`;

const ExtraLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Copyright = styled.div`
  margin-top: 1.5vw;
  font-size: 0.9vw;
  letter-spacing: 0.09vw;
  line-height: 1.2;
  text-align: center;
  color: ${colors.grey};
  
  ${media.tablet(css`
    font-size: 1.5vw;
  `)}

  ${media.mobile(css`
    margin-top: 5vw;
    font-size: 2.5vw;
    letter-spacing: 0.3vw;
  `)}

  ${media.mobileL(css`
    font-size: 3.5vw;
  `)}
`;

const Requisites = styled.p`
  width: 42vw;
  margin: 1vw auto 0;
  font-size: 0.9vw;
  line-height: 1.5;
  text-align: center;
  color: ${colors.grey};

  ${media.tablet(css`
    width: 70vw;
    font-size: 1.5vw;
  `)}

  ${media.mobile(css`
    width: auto;
    margin-top: 3vw;
    font-size: 1.8vw;
  `)};

  ${media.mobileL(css`
    font-size: 3.5vw;
  `)}
`;

const PaymentLogo = styled.img`
  width: 25vw;
  margin: 2vw auto 0;

  ${media.tablet(css`
    width: 35vw;
    margin-top: 3vw;
  `)}

  ${media.mobile(css`
    width: 65vw;
    margin-top: 5.5vw;
  `)}
  
  ${media.mobileL(css`
    width: 75vw;
  `)}
`;

export default Footer;
