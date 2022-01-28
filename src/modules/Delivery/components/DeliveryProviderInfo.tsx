import React from 'react';
import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { colors } from '@constants/theme';

import DeliveryOptionCard from './DeliveryOptionCard';

type Props = {
  providerImage?: string;
  providerDescription?: string;
  deliveryOptionList: { [key: string]: any };
};

function DeliveryProviderInfo({
  providerImage,
  providerDescription,
  deliveryOptionList,
}: Props) {
  return (
    <Container>
      <LogoWrap>
        <ImageElem src={providerImage} alt={providerDescription} />
      </LogoWrap>
      <Details>
        <DetailsInner>
          {Object.values(deliveryOptionList).map((item, index) => (
            <Column key={index}>
              <DeliveryOptionCard
                title={item.title}
                description={item.description}
                price={item.price}
                actionLabel={item.actionLabel}
                actionLink={item.actionLink}
              />
            </Column>
          ))}
        </DetailsInner>
      </Details>
    </Container>
  );
}

const Container = styled.div`
  max-width: 78vw;
  margin: 0 auto;

  ${media.mobile(css`
    max-width: none;
  `)}
`;

const LogoWrap = styled.div`
  height: 3.5vw;
  margin-bottom: 3vw;

  ${media.tablet(css`
    height: 5.5vw;
    margin-bottom: 4vw;
  `)}

  ${media.mobile(css`
    height: 8.5vw;
    margin-bottom: 6vw;
  `)}
`;

const ImageElem = styled.img`
  height: 100%;
  margin: 0 auto;
`;

const Details = styled.div`
  padding: 3vw 0;
  background-color: ${colors.white};
  box-shadow: 0 3px 15px 1px rgba(0, 0, 0, 0.1);

  ${media.mobile(css`
    padding: 4.5vw 0;
  `)}

  ${media.mobileL(css`
    padding: 5.5vw 0;
  `)}
`;

const DetailsInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 58vw;
  margin: 0 auto;

  ${media.tabletAndMobile(css`
    max-width: none;
  `)}
`;

const Column = styled.div`
  flex: 1 1 50%;
  max-width: 100%;
  padding: 0 3vw;

  &:not(:last-child):first-child {
    padding-right: 4.5vw;
    border-right: 1px solid ${colors.grey};
  }

  &:not(:first-child):last-child {
    padding-left: 4.5vw;
  }

  ${media.mobile(css`
    padding: 0 3.5vw;

    &:first-child {
      padding-right: 3.5vw;
    }

    &:last-child {
      padding-left: 3.5vw;
    }
  `)}

  ${media.mobileL(css`
    flex-basis: 100%;
    padding: 0 6.5vw;

    &:not(:last-child):first-child {
      padding-right: 6.5vw;
      padding-bottom: 5.5vw;
      border-right: none;
      border-bottom: 1px solid ${colors.grey};
    }

    &:not(:first-child):last-child {
      padding-left: 6.5vw;
      padding-top: 5.5vw;
    }
  `)}
`;

export default DeliveryProviderInfo;
