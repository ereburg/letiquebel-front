import React from 'react';
import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { colors, timingFn } from '@constants/theme';

import Button from '@components/Button';

import { Text } from '@components/typography';

type Props = {
  onClick: () => void;
  isActive: boolean;
  isMobileLayout: boolean;
  mapElement: JSX.Element;
};

function ShopPreviewDemo({
  mapElement,
  isActive,
  isMobileLayout,
  onClick,
}: Props) {
  return (
    <Container>
      <Preview isActive={isActive}>
        <Message align="center">Здесь будет адрес Вашего магазина</Message>
        {isMobileLayout && isActive ? null : (
          <ActionButton variant="underline" onClick={onClick}>
            Смотреть на карте
          </ActionButton>
        )}
      </Preview>
      {isMobileLayout && isActive ? mapElement : null}
    </Container>
  );
}

const Container = styled.div``;

const Preview = styled.div<{ isActive: null | boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2.5vw;
  z-index: 0;
  
  ${(props) =>
    props.isActive &&
    css`
      &&&:before {
        opacity: 1;
      }
    `}

  ${media.desktopAndLaptop(css`
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0.3vw solid ${colors.accent};
      opacity: 0;
      transition: opacity 0.3s ${timingFn.ease};
      z-index: -1;
    }
  `)}

  ${media.tabletAndMobile(css`
    padding: 0;
  `)}
`;

const Message = styled(Text)`
  display: block;
  max-width: 100%;
  margin-bottom: 1vw;

  ${media.mobile(css`
    margin-bottom: 3vw;
  `)}
`;

const ActionButton = styled(Button)`
  text-transform: none;

  ${media.tablet(css`
    font-size: 2vw;
    line-height: 1.5;
  `)}

  ${media.mobile(css`
    font-size: 3.8vw;
    line-height: 1.5;
    letter-spacing: 0.2vw;
  `)}
`;

export default ShopPreviewDemo;
