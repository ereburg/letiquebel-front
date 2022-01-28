import React from 'react';
import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { colors } from '@constants/theme';

type Props = {
  image?: string;
  title: string;
  descript: string;
  isOdd: boolean;
  isLastChild: boolean;
  isActive: boolean;
  onClick: () => void;
};

function IngredientPreview({
  image,
  title,
  descript,
  isOdd,
  isLastChild,
  isActive,
  onClick,
}: Props) {
  return (
    <IngredientContainer onClick={onClick}>
      <Image src={image} alt={title} />
      <Title>{title}</Title>
      <DescriptPopup
        isOdd={isOdd}
        isLastChild={isLastChild}
        isVisible={isActive}
      >
        <DescriptTitle>{title}</DescriptTitle>
        <DescriptText>{descript}</DescriptText>
        <CloseIcon />
      </DescriptPopup>
    </IngredientContainer>
  );
}

export const IngredientContainer = styled.div`
  position: relative;
  min-height: 16.9vw;
  cursor: pointer;
`;

export const Image = styled.img`
  display: block;
  max-width: 18vw;
  margin: 0 auto;
  user-select: none;

  ${media.tablet(css`
    max-width: 60%;
  `)}

  ${media.mobile(css`
    max-width: 70%;
  `)}
`;

const titleCss = css`
  display: block;
  font-size: 1.2vw;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.14vw;
  text-transform: uppercase;

  ${media.tablet(css`
    font-size: 2.2vw;
    letter-spacing: 0.2vw;
  `)}

  ${media.mobile(css`
    font-size: 3.1vw;
    letter-spacing: 0.3vw;
  `)}
  
  ${media.mobileL(css`
    font-size: 3.75vw;
  `)}
  
   ${media.mobileS(css`
     font-size: 4.25vw;
   `)}
`;

export const Title = styled.span`
  ${titleCss};
  margin-top: 2.2vw;
  text-align: center;

  ${media.tabletAndMobile(css`
    margin-left: auto;
    margin-right: auto;
  `)}
  
  ${media.tablet(css`
    margin-top: 3.4vw;
  `)}

  ${media.mobile(css`
    margin-top: 4.6vw;
  `)}
`;

export const DescriptPopup = styled.div<{
  isOdd: boolean;
  isLastChild: boolean;
  isVisible: boolean;
}>`
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  display: none;
  min-height: 100%;
  padding: 1.5vw;
  border: 4px solid ${colors.accent};
  background-color: ${colors.greyLight};
  z-index: 1;
  
  ${media.tablet(css`
    padding: 2vw 1.5vw;
  `)}
  
  ${media.mobile(css`
    top: 0;
    left: 0;
    right: auto;
    width: calc(100vw - 40px);
    padding: 4.7vw;
    border-width: 2px;
  `)}

  ${(props) =>
    props.isVisible &&
    css`
      display: block;
    `}
  
  ${(props) =>
    props.isOdd &&
    css`
      ${media.mobile(css`
        left: auto;
        right: 0;
      `)}
    `}
  
  ${(props) =>
    !props.isOdd &&
    props.isLastChild &&
    css`
      ${media.mobile(css`
        left: auto;
        right: calc(-25vw + 4px);
      `)}
    `}
`;

export const DescriptTitle = styled.span`
  ${titleCss};
  margin-bottom: 1vw;
  padding-right: 1.6vw;

  ${media.tabletAndMobile(css`
    text-align: center;
  `)}

  ${media.mobile(css`
    padding-right: 5.6vw;
  `)}
`;

export const DescriptText = styled.p`
  font-size: 1.1vw;
  line-height: 1.3;
  letter-spacing: 0.06vw;
  
  ${media.tabletAndMobile(css`
    line-height: 1.4;
    text-align: center;
  `)}

  ${media.tablet(css`
    font-size: 2.1vw;
  `)}

  ${media.mobile(css`
    font-size: 3.1vw;
  `)}
  
  ${media.mobileL(css`
    font-size: 3.75vw;
  `)}
  
   ${media.mobileS(css`
     font-size: 4.25vw;
   `)}
`;

export const CloseIcon = styled.i`
  position: absolute;
  top: 1.6vw;
  right: 1vw;
  width: 1.4vw;
  height: 1.4vw;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 2px;
    background-color: ${colors.accent};
  }

  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  ${media.tablet(css`
    top: 2vw;
    right: 1.4vw;
    width: 2.4vw;
    height: 2.4vw;

    &:before,
    &:after {
      height: 1px;
    }
  `)}

  ${media.mobile(css`
    top: 4.6vw;
    right: 4vw;
    width: 4.4vw;
    height: 4.4vw;

    &:before,
    &:after {
      height: 1px;
    }
  `)}
`;

export default IngredientPreview;
