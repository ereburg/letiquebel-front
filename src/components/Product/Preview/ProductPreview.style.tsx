import styled, { css } from 'styled-components';

import { media, objectFit } from '@utils/mixin';
import { colors, timingFn } from '@constants/theme';

import Link from '@components/Link';
import Button from '@components/Button';

import ProductPrice from '@components/Product/Price';

export const ImageWrap = styled(Link)`
  position: relative;
  display: block;
  margin-bottom: 2.4vw;

  ${media.desktopAndLaptop(css`
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      display: block;
      width: 27vw;
      height: 19vw;
      border: 0.4vw solid ${colors.accent};
      opacity: 0;
      transition: opacity 0.3s ${timingFn.ease};
    }
  `)}
`;

export const PreviewContainer = styled.figure`
  &:hover {
    ${ImageWrap} {
      &:after {
        opacity: 1;
      }
    }
  }
`;

export const ImageElem = styled.img<{ isSoldOut: boolean }>`
  display: block;
  width: 33vw;
  height: 19vw;
  margin: 0 auto;
  ${objectFit('contain')};
  
  ${(props) =>
    props.isSoldOut &&
    css`
      opacity: 0.3;
    `}

  ${media.tabletAndMobile(css`
    width: auto;
  `)}

  ${media.tablet(css`
    max-width: 84%;
    height: 23vw;
  `)}
  
  ${media.mobile(css`
    height: 25vw;
  `)}
`;

export const Label = styled.span`
  position: absolute;
  top: 2vw;
  left: calc(50% - 13.15vw);
  display: inline-block;
  padding: 0.05vw 0.7vw 0.03vw;
  font-size: 1vw;
  line-height: 1.7vw;
  letter-spacing: 0.1vw;
  text-transform: uppercase;
  text-align: center;
  color: ${colors.white};
  background-color: ${colors.redLight};

  ${media.mobile(css`
    padding: 0.7vw 1.6vw 0.6vw;
    font-size: 2.2vw;
    line-height: 3vw;
    letter-spacing: 0.3vw;
  `)}
`;

export const Details = styled.figcaption`
  max-width: 22vw;
  margin: 0 auto;

  ${media.tablet(css`
    max-width: 32vw;
    text-align: center;
  `)}

  ${media.mobile(css`
    max-width: none;
    text-align: center;
  `)}
`;

export const Title = styled(Link)`
  display: block;
  font-size: 1.2vw;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15vw;
  line-height: 1.5;
  color: ${colors.black};

  ${media.tablet(css`
    font-size: 1.8vw;
    letter-spacing: 0.2vw;
  `)}

  ${media.mobile(css`
    font-size: 2.8vw;
    letter-spacing: 0.3vw;
  `)}
  
  ${media.mobileM(css`
    font-size: 3vw;
  `)}
`;

export const Weight = styled.span`
  display: block;
  margin-top: 1.6vw;
  font-size: 1vw;
  letter-spacing: 0.08vw;
  color: ${colors.grey};

  ${media.tablet(css`
    font-size: 1.8vw;
  `)}

  ${media.mobile(css`
    margin-top: 2.9vw;
    font-size: 2.8vw;
    letter-spacing: 0.2vw;
  `)}
`;

export const Price = styled(ProductPrice)`
  margin-top: 1.6vw;
`;

export const ActionButton = styled(Button)`
  margin-top: 1.6vw;

  ${media.mobile(css`
    margin-top: 6vw;
  `)}
`;
