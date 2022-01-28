import styled, { css } from 'styled-components';

import { CssSnippet } from '@typings/common';

import { media } from '@utils/mixin';
import { colors, timingFn } from '@constants/theme';

export type ReservedButtonVariant =
  | 'default'
  | 'defaultBold'
  | 'contained'
  | 'containedBold'
  | 'containedBig'
  | 'containedBigLoading'
  | 'underline'
  | 'underlineBig'
  | 'underlineBold';

export type ButtonVariant = ReservedButtonVariant | CssSnippet;

export const defaultButtonCss = css`
  position: relative;
  display: inline-block;
  max-width: 100%;
  padding: 0;
  font-size: 1vw;
  line-height: 1;
  letter-spacing: 0.1vw;
  text-align: center;
  text-decoration: none;
`;

export const defaultBoldButtonCss = css`
  font-weight: 700;
`;

export const containedButtonCss = css`
  padding: 0.6vw 1vw 0.7vw;
  text-align: center;
  letter-spacing: 0.05vw;
  background-color: ${colors.accent};

  &:hover {
    background: ${colors.accentLight};
  }
  
  ${media.tablet(css`
    font-size: 1.5vw;
  `)}

  ${media.mobile(css`
    padding: 1.4vw 2.2vw 1.5vw;
    font-size: 2.8vw;
    letter-spacing: 0.2vw;
  `)}

  ${media.mobileL(css`
    padding: 1.8vw 2.6vw 1.9vw;
  `)}
`;

export const containedBoldButtonCss = css`
  ${containedButtonCss};
  font-weight: 700;
`;

export const containedBigButtonCss = css`
  ${containedBoldButtonCss};
  padding: 1vw 1.4vw;
  font-size: 1.2vw;

  ${media.mobile(css`
    padding: 2.4vw 3.4vw 2.5vw;
    font-size: 3.8vw;
    letter-spacing: 0.2vw;
  `)}
`;

export const containedBigLoading = css`
  ${containedBigButtonCss};
  height: 3.3vw;
  cursor: not-allowed;

  &,
  &:hover {
    background-color: #9ddfe8;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &:after {
      content: '';
      display: block;
      width: 1.6vw;
      height: 1.6vw;
      border: 3px solid;
      border-top-color: transparent;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin 0.4s linear infinite;
    }
  }

  ${media.mobile(css`
    height: 8.9vw;

    span:after {
      width: 4.2vw;
      height: 4.2vw;
    }
  `)}
`;

export const underlineButtonCss = css`
  padding: 7px 0;
  text-transform: uppercase;

  &:hover {
    &:after {
      opacity: 0;
    }
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 3px;
    background-color: ${colors.accent};
    transition: opacity 0.3s ${timingFn.ease};
  }

  ${media.tabletAndMobile(css`
    padding: 5px 0;

    &:after {
      height: 2px;
    }
  `)}
  
  ${media.tablet(css`
    font-size: 1.5vw;
  `)}

  ${media.mobile(css`
    font-size: 2.8vw;
    letter-spacing: 0.2vw;
  `)}
`;

export const underlineBigButton = css`
  ${underlineButtonCss};
  font-size: 1.035vw;
  letter-spacing: 0.11vw;

  ${media.tablet(css`
    font-size: 2.4vw;
    line-height: 1.5;
    letter-spacing: 0.12vw;
  `)}

  ${media.mobile(css`
    font-size: 3.8vw;
    line-height: 1.5;
  `)}
`;

export const underlineBoldButtonCss = css`
  ${underlineButtonCss};
  font-weight: 700;
`;

const variantCssMap: Record<ReservedButtonVariant, CssSnippet> = {
  default: defaultButtonCss,
  defaultBold: defaultBoldButtonCss,
  contained: containedButtonCss,
  containedBold: containedBoldButtonCss,
  containedBig: containedBigButtonCss,
  containedBigLoading: containedBigLoading,
  underline: underlineButtonCss,
  underlineBig: underlineBigButton,
  underlineBold: underlineBoldButtonCss,
};

export const StyledButton = styled.button<{ variant?: ButtonVariant }>`
  ${defaultButtonCss};

  ${(props) =>
    typeof props.variant === 'string'
      ? variantCssMap[props.variant]
      : props.variant};
`;
