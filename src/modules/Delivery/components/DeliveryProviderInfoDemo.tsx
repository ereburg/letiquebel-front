import React from 'react';
import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { colors } from '@constants/theme';

import { Text } from '@components/typography';

function DeliveryProviderInfoDemo() {
  return (
    <ProviderContainer>
      <ProviderDetails>
        <DetailsInner mode="demo">
          <Column>
            <Text align="center">Ваша информация по доставке</Text>
          </Column>
        </DetailsInner>
      </ProviderDetails>
    </ProviderContainer>
  );
}

const ProviderContainer = styled.div`
  max-width: 78vw;
  margin: 0 auto;

  ${media.mobile(css`
    max-width: none;
  `)}
`;

const ProviderDetails = styled.div`
  padding: 3vw 0;
  background-color: ${colors.white};
  box-shadow: 0 3px 15px 1px rgba(0, 0, 0, 0.1);

  ${media.mobile(css`
    padding: 4.5vw 0;
  `)}

  ${media.mobileL(css`
    padding: 5.5vw 0;
  `)}
`;

const DetailsInner = styled.div<{ mode?: string }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  max-width: 58vw;
  min-height: 200px;
  margin: 0 auto;

  ${media.tabletAndMobile(css`
    max-width: none;
  `)}

  ${media.mobile(css`
    min-height: 150px;
  `)}
`;

const Column = styled.div`
  flex: 1 1 50%;
  max-width: 100%;
  padding: 0 3vw;

  &:not(:last-child):first-child {
    padding-right: 4.5vw;
    border-right: 1px solid ${colors.grey};
  }

  &:not(:first-child):last-child {
    padding-left: 4.5vw;
  }

  ${media.mobile(css`
    padding: 0 3.5vw;

    &:first-child {
      padding-right: 3.5vw;
    }

    &:last-child {
      padding-left: 3.5vw;
    }
  `)}

  ${media.mobileL(css`
    flex-basis: 100%;
    padding: 0 6.5vw;

    &:not(:last-child):first-child {
      padding-right: 6.5vw;
      padding-bottom: 5.5vw;
      border-right: none;
      border-bottom: 1px solid ${colors.grey};
    }

    &:not(:first-child):last-child {
      padding-left: 6.5vw;
      padding-top: 5.5vw;
    }
  `)}
`;

export default DeliveryProviderInfoDemo;
