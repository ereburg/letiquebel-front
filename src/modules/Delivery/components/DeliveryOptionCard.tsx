import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';

import { RootState } from '@store/reducers';

import { media } from '@utils/mixin';

import { ButtonLink } from '@components/Button';

type Props = {
  title: string;
  description: string;
  price?: number;
  actionLabel?: string;
  actionLink?: string;
};

function DeliveryOptionCard({
  title,
  description,
  price,
  actionLabel,
  actionLink,
}: Props) {
  const { currency } = useSelector(
    (state: RootState) => state.globalParams.data
  );

  return (
    <Container>
      <Title>{title}</Title>
      <TextContent
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
      {price !== undefined && (
        <Price>
          {price > 0 ? `Стоимость ${price} ${currency}` : `Бесплатно`}
        </Price>
      )}
      <ActionButton variant="containedBold" href={actionLink} target="_blank">
        {actionLabel}
      </ActionButton>
    </Container>
  );
}

const Container = styled.div``;

const Title = styled.span`
  display: inline-block;
  margin-bottom: 2vw;
  font-size: 1.8vw;
  font-weight: 700;
  
  ${media.tablet(css`
    margin-bottom: 2.4vw;
    font-size: 2.6vw;
  `)}

  ${media.mobile(css`
    margin-bottom: 2.9vw;
    font-size: 3.8vw;
  `)}

  ${media.mobileL(css`
    font-size: 4.4vw;
  `)}
`;

const TextContent = styled.div`
  p {
    font-size: 1.1vw;
    line-height: 1.4;

    &:not(:last-child) {
      margin-bottom: 2vw;
    }
  }
  
  ${media.tablet(css`
    p {
      font-size: 1.85vw;
    }
  `)}

  ${media.mobile(css`
    p {
      font-size: 3.1vw;
    }
  `)}

  ${media.mobileL(css`
    max-width: 280px;

    p {
      font-size: 3.7vw;
    }
  `)}
`;

const Price = styled.span`
  display: block;
  margin-top: 2vw;
  font-size: 1.1vw;
  line-height: 1.4;
  
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

const ActionButton = styled(ButtonLink)`
  margin-top: 2vw;

  ${media.tablet(css`
    margin-top: 2.5vw;
  `)}

  ${media.mobile(css`
    margin-top: 3vw;
  `)}
`;

export default DeliveryOptionCard;
