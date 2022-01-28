import React from 'react';
import styled, { css } from 'styled-components';

import { Effect } from '@typings/models';

import { media } from '@utils/mixin';
import { colors } from '@constants/theme';

import EffectCard from '@modules/Product/components/EffectCard';

type Props = {
  effectDetails: Effect;
};

function Effects({ effectDetails }: Props) {
  return (
    <EffectsContainer>
      <Descript>
        {effectDetails.texts.map((text, index) =>
          text ? (
            <DescriptColumn key={index}>
              <DescriptText>{text}</DescriptText>
            </DescriptColumn>
          ) : null
        )}
      </Descript>
      <GridContainer>
        {effectDetails.effects.map((text, index) =>
          text ? (
            <GridItem key={index}>
              <EffectCard number={index + 1} text={text} />
            </GridItem>
          ) : null
        )}
      </GridContainer>
    </EffectsContainer>
  );
}

const EffectsContainer = styled.div``;

const Descript = styled.div`
  display: flex;
  margin-bottom: 3vw;

  ${media.tabletAndMobile(css`
    flex-direction: column;
  `)}

  ${media.mobile(css`
    margin-bottom: 9vw;
  `)}
`;

const DescriptColumn = styled.div`
  flex: 1 0 50%;
  max-width: 100%;

  &:first-child {
    padding-right: 85px;
  }

  &:last-child {
    padding-left: 85px;
  }
  
  ${media.laptop(css`
    &:first-child {
      padding-right: 45px;
    }

    &:last-child {
      padding-left: 45px;
    }
  `)}

  ${media.tabletAndMobile(css`
    &:first-child {
      padding-right: 0;
    }

    &:last-child {
      padding-left: 0;
    }
  `)}
  
  ${media.tablet(css`
    &:first-child {
      margin-bottom: 1.4vw;
    }
  `)}
  
  ${media.mobile(css`
    &:first-child {
      margin-bottom: 3.4vw;
    }
  `)}
`;

const DescriptText = styled.div`
  font-size: 1.1vw;
  line-height: 1.6;
  color: ${colors.silver};
  
  &:not(:last-child) {
    margin-bottom: 1.4vw;
  }
  
  ${media.tablet(css`
    font-size: 1.85vw;
    line-height: 1.4;
  `)}

  ${media.mobile(css`
    font-size: 3.5vw;
    line-height: 1.5;

    &:not(:last-child) {
      margin-bottom: 3.4vw;
    }
  `)}
  
  ${media.mobileL(css`
    font-size: 3.9vw;
  `)}
`;

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 -10px;
`;

const GridItem = styled.div`
  flex: 1 0 33.33333%;
  max-width: 19vw;
  padding: 0 10px;

  ${media.tablet(css`
    max-width: 50%;

    &:not(:nth-child(-n + 3)) {
      margin-top: 3.5vw;
    }
  `)}

  ${media.mobile(css`
    flex-basis: auto;
    max-width: 80vw;
    margin: 0 auto;

    &:not(:first-child) {
      margin-top: 9.5vw;
    }
  `)}
`;

export default Effects;
