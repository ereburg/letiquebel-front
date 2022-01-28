import React from 'react';
import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { colors } from '@constants/theme';

type Props = {
  number: number;
  text: string;
};

function EffectCard({ number, text }: Props) {
  return (
    <EffectContainer>
      <Inner>
        <Number>{number}</Number>
        <Text>{text}</Text>
      </Inner>
    </EffectContainer>
  );
}

const EffectContainer = styled.div`
  position: relative;
  z-index: 0;

  &:after {
    content: '';
    position: absolute;
    top: 1.2vw;
    left: -1.2vw;
    width: 100%;
    height: 100%;
    border: 0.3vw solid ${colors.accent};
    z-index: -1;
  }

  ${media.mobile(css`
    padding-left: 3.2vw;

    &:after {
      top: 3.2vw;
      left: 0;
      width: 95%;
      height: 100%;
      border-width: 0.6vw;
    }
  `)}

  ${media.mobileL(css`
    &:after {
      border-width: 0.8vw;
    }
  `)}
`;

const Inner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 19vw;
  border: 0.3vw solid ${colors.accent};
  background-color: ${colors.greyLight};

  ${media.tablet(css`
    min-height: 24vw;
  `)}

  ${media.mobile(css`
    min-height: 68vw;
    border-width: 0.6vw;
  `)}
  
  ${media.mobileL(css`
    border-width: 0.8vw;
  `)}
`;

const Number = styled.span`
  position: absolute;
  bottom: 1.8vw;
  left: 2.2vw;
  font-size: 14.7vw;
  font-weight: 800;
  line-height: 1;
  color: rgba(204, 204, 204, 0.2);

  ${media.tablet(css`
    bottom: 2.3vw;
    left: 2.7vw;
    font-size: 17.7vw;
  `)}

  ${media.mobile(css`
    bottom: 3.9vw;
    left: 4.7vw;
    font-size: 54.7vw;
  `)}
`;

const Text = styled.span`
  position: relative;
  display: block;
  max-width: 14vw;
  padding: 0 0 2.6vw 3vw;
  margin-top: auto;
  font-size: 1.2vw;
  font-weight: 700;
  line-height: 1.3;
  text-transform: uppercase;
  letter-spacing: 0.1vw;

  ${media.tablet(css`
    max-width: 18vw;
    padding: 0 0 3.1vw 3.5vw;
    font-size: 1.7vw;
    letter-spacing: 0.15vw;
  `)}

  ${media.mobile(css`
    max-width: 52vw;
    padding: 0 0 11.7vw 11vw;
    font-size: 4.4vw;
    letter-spacing: 0.3vw;
  `)}
`;

export default EffectCard;
