import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { timingFn } from '@constants/theme';

import { ModalContainer, BaseButton } from '@components/Modal/Modal.style';

export const LightboxContainer = styled(ModalContainer)``;

export const SliderContainer = styled.div<{ isOpen: boolean }>`
  transform: translate3d(0, 80%, 0);
  opacity: 0;

  ${(props) =>
    props.isOpen &&
    css`
      opacity: 1;
      transform: translate3d(0, 0, 0);
      transition: transform 0.55s ${timingFn.easeOut},
        opacity 0.2s ${timingFn.easeOut} 0.15s;
    `}
`;

export const SliderInner = styled.div``;

export const SliderSlide = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const navButtonCss = css<{ isOpen: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  &.disabled {
    &&& {
      visibility: hidden;
    }
  }

  ${media.mobile(css`
    &&& {
      visibility: hidden;
    }
  `)}

  ${(props) =>
    props.isOpen &&
    css`
      visibility: visible;
    `}
`;

export const PrevButton = styled(BaseButton)`
  ${navButtonCss};
  left: 0;
`;

export const NextButton = styled(BaseButton)`
  ${navButtonCss};
  right: 0;
`;

export const ImageWrap = styled.div`
  display: flex;
  width: 100%;
  max-width: calc(100% - 50px);
  height: 100%;
  max-height: calc(100% - 50px);
  margin: auto;
`;

export const ImageElem = styled.img`
  max-height: 100%;
  margin: auto;
`;
