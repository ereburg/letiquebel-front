import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { colors } from '@constants/theme';

import { contentTitleCss, textCss } from '@components/typography';

import playIcon from '@assets/images/icons/play.png';

export const Container = styled.div`
  display: flex;

  ${media.mobile(css`
    flex-direction: column;
  `)}
`;

export const Column = styled.div`
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

  ${media.tablet(css`
    &:first-child {
      padding-right: 25px;
    }

    &:last-child {
      padding-left: 25px;
    }
  `)}

  ${media.mobile(css`
    &:first-child {
      padding-right: 0;
    }

    &:last-child {
      padding-left: 0;
    }
  `)}
`;

export const TextContainer = styled.div`
  h2,
  h3 {
    ${contentTitleCss};

    &:not(:first-child) {
      margin-top: 3vw;
    }

    &:not(:last-child) {
      margin-bottom: 2vw;
    }

    ${media.mobile(css`
      &:not(:first-child) {
        margin-top: 7vw;
      }

      &:not(:last-child) {
        margin-bottom: 4vw;
      }
    `)}
  }

  div,
  p {
    &:not(:last-child) {
      margin-bottom: 1.4vw;
    }

    ${media.mobile(css`
      &:not(:last-child) {
        margin-bottom: 3.4vw;
      }
    `)}
  }

  p {
    ${textCss};
  }
`;

export const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3.6vw;
  height: 3.6vw;
  
  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: url("${playIcon}") no-repeat center / contain;
    transition: transform .3s cubic-bezier(.02,.42,0,1.85);
  }
  
  ${media.tablet(css`
    width: 5.6vw;
    height: 5.6vw;
  `)}
  
  ${media.mobile(css`
    width: 10vw;
    height: 10vw;
  `)}
`;

export const MediaContainer = styled.figure<{ isClickable?: boolean }>`
  position: relative;
  display: inline-block;
  z-index: 0;

  ${(props) =>
    props.isClickable &&
    css`
      cursor: pointer;
    `}

  &:hover {
    ${PlayButton} {
      &:after {
        transform: scale(0.85) translateZ(0);
      }
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 2.2vw;
    left: -2.2vw;
    width: 100%;
    height: 100%;
    border: 0.37vw solid ${colors.accent};
    z-index: -1;
  }

  ${media.mobile(css`
    margin-top: 7.8vw;
    padding-left: 4.2vw;

    &:before {
      top: 4.2vw;
      left: 0;
      width: 84.6vw;
      height: 84.6vw;
      border-width: 0.8vw;
    }
  `)}
`;

export const Image = styled.img`
  display: block;
  width: 31.6vw;

  ${media.tablet(css`
    width: 43.6vw;
  `)}

  ${media.mobile(css`
    width: 84.6vw;
  `)}
`;
