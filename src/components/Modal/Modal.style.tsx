import styled, { css } from 'styled-components';

import { timingFn } from '@constants/theme';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
`;

export const Overlay = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  opacity: 0;
  transition: opacity 0.45s ${timingFn.easeIn};

  ${(props) =>
    props.isOpen &&
    css`
      opacity: 1;
      transition-timing-function: ${timingFn.easeOut};
    `}
`;

const modalButtonCss = css`
  width: 44px;
  height: 44px;
  background-color: rgba(30, 30, 30, 0.6);
  visibility: hidden;
  z-index: 10;

  &:hover {
    svg {
      opacity: 1;
    }
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 70%;
    fill: #fff;
    opacity: 0.8;
    transition: opacity 0.2s ${timingFn.ease};
  }
`;

export const CloseButton = styled.button<{ isOpen: boolean }>`
  ${modalButtonCss};
  position: absolute;
  top: 0;
  right: 0;

  ${(props) =>
    props.isOpen &&
    css`
      visibility: visible;
    `}
`;

export const BaseButton = styled.button`
  ${modalButtonCss};
`;
