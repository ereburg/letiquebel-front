import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { colors, timingFn } from '@constants/theme';

export const Container = styled.div`
  position: relative;
`;

function getBorderColor(isActive?: boolean, isInvalid?: boolean): string {
  return isInvalid ? colors.red : isActive ? colors.accent : colors.greyMiddle;
}

export const Input = styled.input<{ isInvalid?: boolean; isActive: boolean }>`
  width: 100%;
  height: 2.45vw;
  padding: 0;
  border: none;
  border-bottom: 2px solid
    ${({ isInvalid, isActive }) => getBorderColor(isActive, isInvalid)};
  font-size: 1vw;
  font-weight: 700;
  line-height: 2.3;
  letter-spacing: 0.1vw;
  color: ${(props) => (props.isInvalid ? colors.red : colors.black)};
  background-color: transparent;
  transition: border-color 0.2s ${timingFn.ease};

  &::placeholder {
    color: ${(props) => (props.isInvalid ? colors.red : colors.black)};
    opacity: 0.4;
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
