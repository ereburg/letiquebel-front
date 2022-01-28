import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { colors, timingFn } from '@constants/theme';

export const AccordContainer = styled.div<{ isActive: boolean }>`
  ${(props) =>
    props.isActive &&
    css`
      ${AccordBody} {
        display: block;
      }
    `}
`;

export const AccordHeader = styled.div`
  position: relative;
  padding-right: 3.7vw;
  cursor: pointer;

  * {
    user-select: none;
  }

  ${media.mobile(css`
    padding-right: 7.8vw;
  `)}
`;

export const AccordLabel = styled.span`
  font-size: 1.8vw;
  font-weight: 700;
  
  ${media.tablet(css`
    font-size: 2.4vw;
  `)}

  ${media.mobile(css`
    font-size: 3vw;
  `)}
  
  ${media.mobileL(css`
    font-size: 3.8vw;
  `)}
  
  ${media.mobileM(css`
    font-size: 4.6vw;
  `)}
`;

export const AccordArrow = styled.i<{ isActive: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-50%, 20%) rotate(-135deg);
  display: block;

  &:after {
    content: '';
    display: block;
    width: 1.1vw;
    height: 1.1vw;
    border-left: 1px solid ${colors.accent};
    border-top: 1px solid ${colors.accent};
    transform: ${({ isActive }) =>
      isActive ? 'rotate(180deg) translateZ(0)' : 'none'};
    transform-origin: 30% 30%;
    transition: transform 0.25s ${timingFn.ease};

    ${media.tablet(css`
      width: 1.9vw;
      height: 1.9vw;
    `)}

    ${media.mobile(css`
      width: 2.5vw;
      height: 2.5vw;
    `)}
  }
`;

export const AccordContent = styled.div`
  padding-top: 2.2vw;
  font-size: 1.2vw;
  line-height: 1.6;
  
  ${media.tablet(css`
    font-size: 2vw;
  `)}

  ${media.mobile(css`
    padding-top: 4.7vw;
    font-size: 2.8vw;
  `)}

  ${media.mobileL(css`
    font-size: 3.6vw;
  `)}
  
  ${media.mobileM(css`
    font-size: 4.4vw;
  `)}
`;

export const AccordBody = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'display: block;' : 'none')};
  height: 0;
  overflow: hidden;
  transition: height 0.35s ${timingFn.ease};
`;
