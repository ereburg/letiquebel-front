import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { colors, timingFn } from '@constants/theme';

import { ModalContainer } from '@components/Modal/Modal.style';

export const PopupContainer = styled(ModalContainer)``;

export const Inner = styled.div<{ isOpen: boolean }>`
  width: 100%;
  height: 100%;
  transform: translate3d(0, 80%, 0);
  overflow-y: auto;
  opacity: 0;

  ${({ isOpen }) =>
    isOpen &&
    css`
      opacity: 1;
      transform: translate3d(0, 0, 0);
      transition: transform 0.55s ${timingFn.easeOut},
        opacity 0.2s ${timingFn.easeOut} 0.15s;
    `}
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 10px;
`;

export const Card = styled.div`
  position: relative;
  width: 50vw;
  max-width: calc(1220px - 50px);
  padding: 2vw;
  background-color: ${colors.white};
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.19), 
  0 6px 6px rgba(0, 0, 0, 0.23);
  
  ${media.tablet(css`
    padding: 4vw;
  `)}
  
  ${media.tabletAndMobile(css`
    width: 100%;
  `)}

  ${media.mobile(css`
    padding: 5vw;
  `)}

  ${media.mobileL(css`
    padding: 7vw;
  `)}
`;
