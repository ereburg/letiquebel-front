import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';

import ArrowIcon from '@assets/images/icons/arrow.png';

export const SliderWrapper = styled.div`
  position: relative;
  padding-bottom: 20px;

  * {
    pointer-events: auto;
  }

  img {
    user-select: none;
  }

  ${media.mobile(css`
    padding-bottom: 40px;
  `)}
`;

export const SliderContainer = styled.div``;

export const SliderInner = styled.div``;

const navButtonCss = css`
  position: absolute;
  bottom: 0;
  display: block;
  width: 45px;
  height: 25px;
  background: url("${ArrowIcon}") no-repeat center / 33px;
`;

export const PrevButton = styled.button`
  ${navButtonCss};
  left: calc(50% - 45px);
  transform: translateX(-50%);

  ${media.mobile(css`
    left: calc(50% - 35px);
  `)}
`;

export const NextButton = styled.button`
  ${navButtonCss};
  left: calc(50% + 45px);
  transform: translateX(-50%) rotate(180deg);

  ${media.mobile(css`
    left: calc(50% + 35px);
  `)}
`;
