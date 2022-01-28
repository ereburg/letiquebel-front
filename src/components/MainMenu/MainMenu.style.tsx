import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { colors, timingFn } from '@constants/theme';

import Link from '@components/Link';
import { ButtonLink } from '@components/Button';

import closeIcon from '@assets/images/icons/close.png';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  transform: translate3d(-100%, 0, 0);
  width: 56vw;
  height: 100vh;
  background-color: ${colors.greyLight};
  will-change: transform;
  transition: transform 0.4s ${timingFn.easeIn};
  z-index: 1000;

  ${media.mobile(css`
    width: 100vw;
  `)}
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.4s ${timingFn.easeIn};
  z-index: 999;
`;

export const Wrapper = styled.div<{ isVisible: boolean }>`
  visibility: hidden;
  transition: visibility 0.4s;

  ${(props) =>
    props.isVisible &&
    css`
      visibility: visible;

      ${Overlay} {
        opacity: 1;
        transition-timing-function: ${timingFn.easeOut};
      }

      ${Container} {
        transform: translate3d(0, 0, 0);
        transition-timing-function: ${timingFn.easeOut};
      }
    `}
`;

export const CloseButton = styled.button`
  position: absolute;
  display: block;
  top: 2.9vw;
  right: 5.2vw;
  width: 1.2vw;
  min-width: 20px;
  height: 1.2vw;
  min-height: 20px;
  background: url("${closeIcon}") no-repeat center / contain;
  cursor: pointer;
  z-index: 1;
  
   ${media.tablet(css`
     top: 3.5vw;
   `)}
  
  ${media.mobile(css`
    top: 5vw;
    right: 5vw;
  `)}
`;

export const Scroll = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const Content = styled.nav`
  position: relative;
  display: flex;
  padding: 12vw 7vw 6vw;

  ${media.tabletAndMobile(css`
    flex-direction: column;
  `)}
  
  ${media.tablet(css`
    padding: 14vw 9vw 8vw;
  `)}
  
  ${media.mobile(css`
    padding: 18vw 15vw 8vw;
  `)}
  
  ${media.mobileL(css`
    padding-bottom: 14vw;
  `)}
  
  ${media.mobileM(css`
    padding-top: 22vw;
  `)}
`;

export const MenuToggle = styled.button`
  position: absolute;
  top: 2.9vw;
  left: 7vw;
  width: 1.5vw;
  min-width: 24px;
  height: 1.5vw;
  min-height: 24px;

  &:before,
  &:after,
  span {
    content: '';
    position: absolute;
    left: 0;
    transform-origin: 0 50%;
    display: block;
    width: 100%;
    height: 2px;
    background-color: ${colors.accent};
  }

  &:before {
    top: 10%;
    transform: scaleX(0.65);
  }

  &:after {
    bottom: 10%;
    transform: scaleX(0.65);
  }

  span {
    top: 50%;
    transform: translateY(-50%);
  }

  ${media.tablet(css`
    top: 3.5vw;
    left: 9vw;
  `)}

  ${media.mobile(css`
    top: 5vw;
    left: 20px;
    min-width: 26px;
    min-height: 22px;
  `)}
`;

export const ContentBlock = styled.div`
  flex: 1 1 50%;

  &:first-child {
    padding-right: 2vw;
  }

  &:last-child {
    padding-left: 2vw;
  }

  ${media.tabletAndMobile(css`
    &:first-child {
      padding-right: 0;
    }

    &:last-child {
      padding-left: 0;
    }
  `)}
  
  ${media.tablet(css`
    &:not(:last-child) {
      margin-bottom: 6vw;
    }
  `)}
  
  ${media.mobile(css`
    &:not(:last-child) {
      margin-bottom: 9vw;
    }
  `)}
`;

export const LinksList = styled.ul`
  &:not(:last-child) {
    margin-bottom: 3vw;
  }

  ${media.tablet(css`
    &:not(:last-child) {
      margin-bottom: 6vw;
    }
  `)}

  ${media.mobile(css`
    &:not(:last-child) {
      margin-bottom: 9vw;
    }
  `)}
`;

export const SubLinksList = styled.ul`
  &:not(:first-child) {
    margin-top: 3vw;
  }

  ${media.tablet(css`
    &:not(:first-child) {
      margin-top: 3.75vw;
    }
  `)}

  ${media.mobile(css`
    &:not(:first-child) {
      margin-top: 4.5vw;
    }
  `)}
`;

export const LinksItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 2.5vw;
  }

  ${media.mobile(css`
    &:not(:last-child) {
      margin-bottom: 4.5vw;
    }
  `)}
`;

export const SubLinksItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 2.2vw;
  }

  ${media.mobile(css`
    &:not(:last-child) {
      margin-bottom: 3.2vw;
    }
  `)}
`;

export const ContactLinksItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 1.5vw;
  }

  ${media.tablet(css`
    &:not(:last-child) {
      margin-bottom: 2.2vw;
    }
  `)}

  ${media.mobile(css`
    &:not(:last-child) {
      margin-bottom: 4.5vw;
    }
  `)}
`;

export const basicLinkCss = css`
  display: inline-block;
  font-weight: 600;
  text-transform: uppercase;
  color: ${colors.black};
`;

export const MainLink = styled(Link)`
  ${basicLinkCss};
  font-size: 1.3vw;
  line-height: 1;
  letter-spacing: 0.2vw;
  
  &:hover {
    opacity: .55;
  }

  ${media.tabletAndMobile(css`
    font-size: 2.7vw;
    letter-spacing: 0.25vw;
  `)}

  ${media.mobile(css`
    font-size: 4.3vw;
    letter-spacing: 0.35vw;
  `)}
  
  ${media.mobileL(css`
    font-size: 5.7vw;
  `)}
`;

export const SubLink = styled(Link)`
  ${basicLinkCss};
  font-size: 1vw;
  line-height: 1.2;
  letter-spacing: 0.1vw;
  
  &:hover {
    opacity: .55;
  }

  ${media.tablet(css`
    font-size: 1.5vw;
    letter-spacing: 0.14vw;
  `)}

  ${media.mobile(css`
    font-size: 2.9vw;
    letter-spacing: 0.24vw;
  `)}
  
  ${media.mobileL(css`
    font-size: 3.5vw;
  `)}
`;

export const ContactLink = styled.a`
  ${basicLinkCss};
  font-size: 1.1vw;
  font-weight: 400;
  letter-spacing: 0.08vw;
  text-transform: none;

  ${media.tablet(css`
    font-size: 2.3vw;
    letter-spacing: 0.14vw;
  `)}

  ${media.mobile(css`
    font-size: 3.4vw;
    letter-spacing: 0.2vw;
  `)}
  
  ${media.mobileL(css`
    font-size: 4.8vw;
  `)}
`;

export const ContactLabel = styled.span`
  display: block;
  margin-bottom: 0.5vw;
  font-size: 0.85vw;
  line-height: 1.05vw;

  ${media.tablet(css`
    font-size: 1.6vw;
    line-height: 1.3;
    letter-spacing: 0.1vw;
  `)}

  ${media.mobile(css`
    font-size: 2.2vw;
    line-height: 1.3;
    letter-spacing: 0.15vw;
  `)}
  
   ${media.mobileL(css`
     font-size: 3.4vw;
   `)}
`;

export const ContactButton = styled(ButtonLink)`
  text-transform: none;
  
  ${media.tablet(css`
    font-size: 2.3vw;
    letter-spacing: 0.14vw;
  `)}

  ${media.mobile(css`
    font-size: 3.4vw;
    letter-spacing: 0.2vw;
  `)}
  
   ${media.mobileL(css`
     font-size: 4.8vw;
   `)}
`;
