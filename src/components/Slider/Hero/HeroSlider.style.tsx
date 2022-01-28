import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { colors } from '@constants/theme';

import Link from '@components/Link';
import Button from '@components/Button';

export const SliderSlide = styled.div<{ bgImage?: string }>`
  position: relative;
  transition-timing-function: ease;
  z-index: 0;

  &.active {
    z-index: 1;
  }

  &:not(.duplicate).duplicate-active {
    z-index: 2;
  }

  ${(props) =>
    props.bgImage &&
    css`
      background: url("${props.bgImage}") no-repeat center / cover;
    `}
`;

export const SlideInner = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 86vw;
  margin: 0 auto;
  padding: 2vw 0;
  text-align: center;

  ${media.mobile(css`
    max-width: 95vw;
    padding-top: 11vw;
  `)}
`;

export const SlideTitle = styled.h2`
  position: relative;
  font-size: 3.38vw;
  font-weight: 800;
  letter-spacing: 0.5vw;
  text-transform: uppercase;
  color: ${colors.black};

  ${media.tablet(css`
    font-size: 3.9vw;
  `)}

  ${media.mobile(css`
    padding-top: 7vw;
    font-size: 7.6vw;
    font-weight: 700;
    letter-spacing: 1.1vw;
  `)}
`;

export const SlideLabel = styled.span`
  position: absolute;
  top: -1vw;
  left: 100%;
  display: inline-block;
  padding: 0.05vw 0.7vw 0.03vw;
  font-size: 1vw;
  font-weight: 800;
  line-height: 1.7vw;
  letter-spacing: 0.1vw;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${colors.white};
  background-color: ${colors.redLight};

  ${media.mobile(css`
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.7vw 1.6vw 0.6vw;
    font-size: 2.2vw;
    line-height: 3vw;
    letter-spacing: 0.3vw;
  `)}
`;

export const SlideAbout = styled.span`
  display: block;
  max-width: 60%;
  margin-top: 2vw;
  font-size: 1.47vw;
  letter-spacing: 0.2vw;
  font-weight: 800;
  line-height: 1;
  text-transform: uppercase;
  
  ${media.tabletAndMobile(css`
    max-width: 90%;
  `)}

  ${media.tablet(css`
    font-size: 2vw;
    letter-spacing: 0.3vw;
    line-height: 1.3;
  `)}

  ${media.mobile(css`
    margin-top: 3vw;
    font-size: 3.5vw;
    letter-spacing: 0.5vw;
    line-height: 1.6;
  `)}
  
  ${media.mobileL(css`
    font-size: 3.7vw;
  `)}
`;

export const SlideDescription = styled.span`
  display: block;
  max-width: 60%;
  margin-top: 1vw;
  font-size: 1.4vw;
  line-height: 1;
  letter-spacing: 0.6px;
  color: ${colors.silver};

  ${media.tablet(css`
    max-width: 80vw;
    font-size: 2vw;
  `)}

  ${media.mobile(css`
    max-width: 55vw;
    margin: 2.8vw auto 0;
    font-size: 3.3vw;
    line-height: 1.4;
    letter-spacing: 0.06vw;
  `)}
  
  ${media.mobileL(css`
    font-size: 3.5vw;
  `)}
`;

export const SlideImage = styled.img`
  height: 25vw;
  margin: 1vw 0;

  ${media.tablet(css`
    height: 35vw;
    margin-top: 3vw;
  `)}

  ${media.mobile(css`
    height: auto;
    margin: 3vw 0;
  `)}
`;

export const SlideButton = styled(Button)`
  ${media.tablet(css`
    font-size: 1.85vw;
    letter-spacing: 0.15vw;
  `)}

  ${media.mobile(css`
    font-size: 3.75vw;
    letter-spacing: 0.3vw;
  `)}
`;
