import styled, { css } from 'styled-components';
import { Map } from 'react-yandex-maps';

import { media } from '@utils/mixin';
import { colors } from '@constants/theme';

export const MapContainer = styled.div`
  position: relative;
  background-color: ${colors.greyMiddle};

  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 0;
    padding-bottom: 110%;
  }

  ${media.tablet(css`
    &:before {
      padding-bottom: 120%;
    }
  `)}

  ${media.mobile(css`
    &:before {
      padding-bottom: 60%;
    }
  `)}
`;

export const MapElem = styled(Map)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  & [class*='controls-pane'] {
    height: 100% !important;
    pointer-events: none !important;
  }

  & [class*='controls__control'] {
    position: relative !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    display: inline-block !important;
    pointer-events: auto !important;
  }
`;
