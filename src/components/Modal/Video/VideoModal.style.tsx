import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { colors, timingFn } from '@constants/theme';

import { ModalContainer } from '@components/Modal/Modal.style';

export const VideoContainer = styled(ModalContainer)``;

export const Stage = styled.div<{ isOpen: boolean }>`
  position: relative;
  transform: translate3d(0, 80%, 0);
  width: 50vw;
  max-width: calc(100% - 50px);
  max-height: calc(100% - 50px);
  background-color: ${colors.black};
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  opacity: 0;

  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 0;
    padding-top: 56.25%;
  }

  ${media.tabletAndMobile(css`
    width: 100%;
  `)}

  ${(props) =>
    props.isOpen &&
    css`
      opacity: 1;
      transform: translate3d(0, 0, 0);
      transition: transform 0.55s ${timingFn.easeOut},
        opacity 0.2s ${timingFn.easeOut} 0.15s;
    `}
`;

export const Inner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Player = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
