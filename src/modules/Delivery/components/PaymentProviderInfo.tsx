import React from 'react';
import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';

import visaIcon from '@assets/images/icons/visa.png';
import mastercardIcon from '@assets/images/icons/mastercard.png';
import belkartIcon from '@assets/images/icons/belkart.png';

type Props = {
  providerImage?: string;
  providerDescription?: string;
};

function PaymentProviderInfo({ providerImage, providerDescription }: Props) {
  return (
    <Container>
      <LogoWrap>
        <ImageElem src={providerImage} alt={providerDescription} />
      </LogoWrap>
      <Details>
        <Description>
          Оплата банковскими картами осуществляется через ЗАО «Альфа-Банк». К
          оплате принимаются карты международных платежных систем VISA,
          MasterCard, Белкарт.
        </Description>
        <CardLogo>
          <img src={visaIcon} alt="Visa" />
          <img src={mastercardIcon} alt="Mastercard" />
          <img src={belkartIcon} alt="Белкард" />
        </CardLogo>
      </Details>
    </Container>
  );
}

const Container = styled.div``;

const LogoWrap = styled.div`
  height: 4.5vw;
  max-height: 115px;
  margin-bottom: 2vw;

  ${media.tablet(css`
    height: 6.5vw;
    margin-bottom: 3vw;
  `)}

  ${media.mobile(css`
    height: 9.5vw;
    margin-bottom: 5vw;
  `)}
`;

const ImageElem = styled.img`
  height: 100%;
  margin: 0 auto;
`;

const Details = styled.div``;

const Description = styled.p`
  max-width: 850px;
  margin: 0 auto;
  font-size: 1.1vw;
  line-height: 1.4;
  text-align: center;
  
  ${media.tablet(css`
    font-size: 1.85vw;
  `)}

  ${media.mobile(css`
    font-size: 3.1vw;
  `)}

  ${media.mobileL(css`
    font-size: 3.7vw;
  `)}
`;

const CardLogo = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5vw;

  img {
    flex-shrink: 0;
    height: 2vw;
    max-height: 40px;

    &:not(:last-child) {
      margin-right: 20px;
    }
  }

  ${media.tablet(css`
    margin-top: 2.5vw;

    img {
      height: 3vw;
    }
  `)}

  ${media.mobile(css`
    margin-top: 4.5vw;

    img {
      height: 5.5vw;
    }
  `)}
`;

export default PaymentProviderInfo;
