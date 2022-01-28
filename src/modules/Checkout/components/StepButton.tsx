import React from 'react';
import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { colors, timingFn } from '@constants/theme';

type Props = {
  label: string;
  isActive: boolean;
  isAvailable: boolean;
  onClick?: () => void;
};

function StepButton({ label, isActive, isAvailable, onClick }: Props) {
  return (
    <ButtonContainer
      isActive={isActive}
      isAvailable={isAvailable}
      onClick={onClick}
    >
      {label}
    </ButtonContainer>
  );
}

const ButtonContainer = styled.button<{
  isActive: boolean;
  isAvailable: boolean;
}>`
  font-size: 1vw;
  font-weight: 700;
  letter-spacing: 1.7px;
  text-transform: uppercase;
  color: ${({ isActive }) => (isActive ? colors.black : colors.delta)};
  transition: color 0.15s ${timingFn.ease};

  &:hover {
    color: ${({ isActive }) => (isActive ? colors.black : colors.greyDark)};
  }

  ${media.tablet(css`
    font-size: 1.75vw;
    letter-spacing: 1.15px;
  `)}

  ${media.mobile(css`
    font-size: 2.5vw;
    letter-spacing: 0.7px;
  `)}
  
  ${media.mobileL(css`
    font-size: 2.9vw;
  `)}
  
  ${({ isAvailable }) =>
    !isAvailable &&
    css`
      color: ${colors.grey};
      cursor: default;

      &:hover {
        color: ${colors.grey};
      }
    `}
`;

export default StepButton;
