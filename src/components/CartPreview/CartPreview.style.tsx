import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { colors, timingFn } from '@constants/theme';

import {
  defaultButtonCss,
  underlineBoldButtonCss,
} from '@components/Button/Button.style';

import deliveryIcon from '@assets/images/icons/delivery.png';
import closeIcon from '@assets/images/icons/close.png';

export const CartContainer = styled.div<{ isVisible: boolean }>`
  display: flex;
  flex-direction: column;
  width: 32vw;
  min-height: 340px;
  max-height: calc(80vh - 60px);
  border: 0.3vw solid ${colors.accent};
  border-bottom: 0;
  background-color: ${colors.greyLight};
  box-shadow: 0 3px 15px 1px rgba(0, 0, 0, 0.1);
  visibility: hidden;
  opacity: 0;
  transform: translate3d(0, 2vw, 0);
  transition: transform 0.15s ${timingFn.easeIn},
    opacity 0.15s ${timingFn.easeIn}, visibility 0.15s ${timingFn.easeIn};
    
  &, * {
    user-select: none;
  }

  ${(props) =>
    props.isVisible &&
    css`
      visibility: visible;
      opacity: 1;
      transform: translate3d(0, 0, 0);
      transition-timing-function: ${timingFn.easeOut};
    `}
  
  ${media.noMobile(css`
    &:before {
      content: '';
      position: absolute;
      top: -0.6vw;
      right: 1.6vw;
      width: 0.8vw;
      height: 0.8vw;
      border-left: 0.3vw solid ${colors.accent};
      border-top: 0.3vw solid ${colors.accent};
      background-color: ${colors.greyLight};
      transform: rotate(45deg);
    }
  `)}

  ${media.mobile(css`
    width: 100vw;
    height: 100vh;
    max-height: none;
    border-width: 0;
  `)}
`;

export const titleCss = css`
  display: block;
  font-size: 0.9vw;
  font-weight: 700;
  letter-spacing: 0.1vw;
  line-height: 1.3;
  text-transform: uppercase;

  ${media.mobile(css`
    font-size: 2.8vw;
    letter-spacing: 0.3vw;
  `)}

  ${media.mobileL(css`
    font-size: 3.1vw;
  `)}
`;

export const Header = styled.div`
  position: relative;
  flex-shrink: 0;
  max-width: 100%;
  padding: 1.8vw 1.6vw 1.1vw;

  ${media.mobile(css`
    padding: 4.5vw;
  `)}
`;

export const HeaderTitle = styled.span`
  ${titleCss};

  ${media.mobile(css`
    font-size: 3.3vw;
  `)}

  ${media.mobileL(css`
    font-size: 3.8vw;
  `)}
  
  ${media.mobileM(css`
    font-size: 4.4vw;
  `)}
  
  ${media.mobileS(css`
    font-size: 5vw;
  `)}
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 50%;
  right: 4.5vw;
  width: 1.2vw;
  min-width: 20px;
  height: 1.2vw;
  min-height: 20px;
  background: url("${closeIcon}") no-repeat center / contain;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1;
  
  ${media.noMobile(css`
    display: none;
  `)}
`;

export const Content = styled.div`
  flex: 1 1 auto;
  max-width: 100%;
  min-height: 1px;
  overflow-y: auto;

  ${media.mobile(css`
    max-height: none;
  `)}
`;

export const ProductList = styled.ul``;

export const ProductItem = styled.li`
  &:not(:last-child) {
    border-bottom: 1px solid ${colors.accent};
  }
`;

export const Footer = styled.div`
  flex-shrink: 0;
  max-width: 100%;
  background-color: ${colors.accent};
`;

export const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.1vw 1.6vw;
  background-color: ${colors.greyLight};

  ${media.mobile(css`
    padding: 3.4vw 4.5vw;
  `)}
`;

export const SummaryPrice = styled.div`
  font-size: 0.9vw;

  ${media.mobile(css`
    font-size: 3.1vw;
  `)}

  ${media.mobileL(css`
    font-size: 3.6vw;
  `)}
  
  ${media.mobileM(css`
    font-size: 4vw;
  `)}
  
  ${media.mobileS(css`
    font-size: 4.4vw;
  `)}
`;

export const SummaryLabel = styled.span`
  letter-spacing: 0.1vw;
  text-transform: uppercase;
`;

export const SummaryValue = styled.span`
  margin-left: 0.7vw;
  font-weight: 700;
  letter-spacing: 0.06vw;

  ${media.mobile(css`
    margin-left: 2vw;
  `)}
`;

export const SummaryButton = styled.a`
  ${defaultButtonCss};
  ${underlineBoldButtonCss};
  
  font-size: 0.9vw;

  ${media.mobile(css`
    font-size: 3.1vw;
  `)}

  ${media.mobileL(css`
    font-size: 3.6vw;
  `)}
  
   ${media.mobileM(css`
     font-size: 4vw;
   `)}
   
   ${media.mobileS(css`
     font-size: 4.4vw;
   `)}
`;

export const Delivery = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.1vw 1.6vw;
  font-size: 0.8vw;
  font-weight: 700;
  letter-spacing: 0.1vw;
  line-height: 1.3;
  text-transform: uppercase;
  
  &:before {
    content: '';
    display: block;
    flex-shrink: 0;
    width: 2.3vw;
    height: 1.1vw;
    margin-right: 0.7vw;
    background: url("${deliveryIcon}") no-repeat center / contain;
  }
  
  ${media.mobile(css`
    padding: 3.4vw 4.5vw;
    font-size: 2.5vw;
    letter-spacing: 0.3vw;

    &:before {
      width: 7.5vw;
      height: 3.7vw;
      margin-right: 2.8vw;
    }
  `)}
  
  ${media.mobileL(css`
    max-width: 90%;
    margin: 0 auto;
    font-size: 2.9vw;

    &:before {
      width: 8.8vw;
      height: 5vw;
      margin-right: 3.8vw;
    }
  `)}
  
  ${media.mobileM(css`
    font-size: 3.4vw;

    &:before {
      width: 9.2vw;
      height: 5.5vw;
      margin-right: 4.3vw;
    }
  `)}
  
  ${media.mobileS(css`
    font-size: 3.8vw;
  `)}
`;

export const DeliveryMessage = styled.span`
  span {
    white-space: nowrap;
    color: ${colors.white};
  }
`;
