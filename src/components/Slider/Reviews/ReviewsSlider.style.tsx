import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';

import {
  SliderWrapper,
  SliderContainer,
} from '@components/Slider/Slider.style';

export const Wrapper = styled(SliderWrapper)`
  padding-bottom: 60px;

  ${media.mobile(css`
    padding-bottom: 50px;
  `)}
`;

export const Container = styled(SliderContainer)`
  ${media.tabletAndMobile(css`
    overflow: visible;
  `)}
`;

export const SliderSlide = styled.div`
  width: calc(25% - 1.66vw);

  &:not(:last-child) {
    margin-right: 2.2vw;
  }

  ${media.tablet(css`
    width: calc(33.33333% - 1.46vw);
  `)}

  ${media.mobile(css`
    width: 60%;
  `)}
  
  ${media.mobileL(css`
    width: 80%;

    &:not(:last-child) {
      margin-right: 4.2vw;
    }
  `)}
`;
