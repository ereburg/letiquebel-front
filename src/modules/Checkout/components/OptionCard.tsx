import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';

import { RootState } from '@store/reducers';

import { media } from '@utils/mixin';
import { colors, timingFn } from '@constants/theme';

import { ButtonLink } from '@components/Button';

type Props = {
  title: string;
  description: string;
  price?: number;
  actionLabel?: string;
  actionLink?: string;
  isActive: boolean;
  isUnavailable?: boolean;
  onClick?: () => void;
};

function OptionCard({
  title,
  description,
  price,
  actionLabel,
  actionLink,
  isActive,
  isUnavailable,
  onClick,
}: Props) {
  const { currency } = useSelector(
    (state: RootState) => state.globalParams.data
  );

  const actionLinkRef = useRef<HTMLAnchorElement>(null);

  function handleClick(e: React.MouseEvent) {
    const actionLinkElem = actionLinkRef.current;

    if (actionLinkElem) {
      if (!actionLinkElem.contains(e.target as HTMLElement)) {
        onClick && onClick();
      }
    } else {
      onClick && onClick();
    }
  }

  return (
    <Container
      isActive={isActive}
      isUnavailable={isUnavailable}
      onClick={handleClick}
    >
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
      {actionLink ? (
        <ActionLink
          variant="containedBold"
          ref={actionLinkRef}
          href={actionLink}
          target="_blank"
        >
          {actionLabel}
        </ActionLink>
      ) : null}
    </Container>
  );
}

const Container = styled.div<{
  isUnavailable?: boolean;
  isActive: boolean;
}>`
  position: relative;
  max-width: 100%;
  height: 100%;
  padding: 3.5vw;
  border: 2px solid ${colors.greyMiddle};
  transition: border-color 0.3s ${timingFn.ease};
  cursor: pointer;

  &:hover {
    border-color: ${colors.accent};
  }
  
  ${media.mobile(css`
    min-height: 50vw;
    padding: 4.5vw 3.5vw;
  `)}
  
  ${media.mobileL(css`
    min-height: auto;
    padding: 5.5vw 6.5vw;
  `)}
  
  ${({ isActive }) =>
    isActive &&
    css`
      border-color: ${colors.accent};
    `}

  ${({ isUnavailable }) =>
    isUnavailable &&
    css`
      cursor: default;

      &:hover {
        border-color: ${colors.greyMiddle};
      }

      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: block;
        background-color: rgba(237, 237, 237, 0.95);
      }
    `}
`;

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

const ActionLink = styled(ButtonLink)`
  margin-top: 2vw;

  ${media.tablet(css`
    margin-top: 2.5vw;
  `)}

  ${media.mobile(css`
    margin-top: 3vw;
  `)}
`;

export default OptionCard;
