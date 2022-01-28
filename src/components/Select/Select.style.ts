import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { colors, timingFn } from '@constants/theme';

function getBorderColor(isActive?: boolean, isInvalid?: boolean): string {
  return isInvalid ? colors.red : isActive ? colors.accent : colors.greyMiddle;
}

export const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const Select = styled.select<{
  isInvalid?: boolean;
  isActive: boolean;
}>`
  width: 100%;
  height: 2.45vw;
  border: none;
  padding-right: 1.5vw;
  border-bottom: 2px solid
    ${({ isInvalid, isActive }) => getBorderColor(isActive, isInvalid)};
  font-size: 1vw;
  font-weight: 700;
  letter-spacing: 0.1vw;
  color: ${(props) => (props.isInvalid ? colors.red : colors.black)};
  background-color: transparent;
  transition: border-color 0.2s ${timingFn.ease};
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;

  option {
    padding: 0.3vw 0.5vw;
    font-weight: 400;
  }

  ${media.mobile(css`
    height: 8.65vw;
    font-size: 3.5vw;
  `)}
`;

export const Label = styled.span<{
  isInvalid?: boolean;
  isActive: boolean;
  isFilled: boolean;
}>`
  position: absolute;
  top: 50%;
  left: 0;
  transform: ${({ isActive, isFilled }) =>
    isActive || isFilled ? 'translateY(-190%)' : 'translateY(-90%)'};
  font-size: 1vw;
  color: ${(props) => (props.isInvalid ? colors.red : colors.silver)};
  pointer-events: none;
  transition: transform 0.2s ${timingFn.ease};

  ${media.mobile(css`
    font-size: 3.5vw;
  `)}
`;

export const Arrow = styled.i<{ isActive: boolean }>`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-50%, -70%) rotate(-135deg);
  display: block;

  &:after {
    content: '';
    display: block;
    width: 0.8vw;
    height: 0.8vw;
    border-left: 2px solid;
    border-top: 2px solid;
    border-color: ${({ isActive }) =>
      isActive ? colors.accent : colors.greyMiddle};
    transform: ${({ isActive }) =>
      isActive ? 'rotate(180deg) translateZ(0)' : 'none'};
    transform-origin: 30% 30%;
    transition: transform 0.2s ${timingFn.ease},
      border-color 0.2s ${timingFn.ease};

    ${media.mobile(css`
      width: 2.5vw;
      height: 2.5vw;
    `)}
  }
`;
