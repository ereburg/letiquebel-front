import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@store/reducers';
import { setCartVisibility } from '@store/reducers/cart';

import { useMounted } from '@hooks/useMounted';

import { media } from '@utils/mixin';
import { colors, timingFn } from '@constants/theme';

import { ContentContainer } from '@components/content';

import Link from '@components/Link';
import MainMenu from '@components/MainMenu';
import CartPreview from '@components/CartPreview';

// import logoDefault from '@assets/images/logo.png';
import logoDefaultSVG from '@assets/images/logo.svg';
import logoKristitheone from '@assets/images/logo-kristitheone.png';
import logoBotanovna from '@assets/images/logo-botanovna.png';
import cartIcon from '@assets/images/icons/cart.png';

const LOGOS: { [key: string]: string } = {
  default: logoDefaultSVG,
  kristitheone: logoKristitheone,
  botanovna: logoBotanovna,
};

type Props = {
  logoType?: string;
  logoLink?: string;
  disabledCartPreview?: boolean;
  disabledLogo?: boolean;
};

function Header({
  logoType,
  logoLink,
  disabledCartPreview,
  disabledLogo,
}: Props) {
  const isMounted = useMounted();

  const containerRef = useRef<HTMLElement>(null);
  const changeHeaderSize = useCallback(() => {
    const containerElem = containerRef.current;

    if (containerElem) {
      if (window.pageYOffset > 10) {
        containerElem.classList.add('fixed');
      } else {
        containerElem.classList.remove('fixed');
      }
    }
  }, []);

  const [isMenuVisible, setMenuVisible] = useState(false);

  const dispatch = useDispatch();
  const toggleCartVisibility = useCallback(
    (value) => dispatch(setCartVisibility(value)),
    [dispatch]
  );

  const {
    productList,
    isPreviewVisible: isCartVisible,
    isInitialized: isCartInitialized,
  } = useSelector(({ cart }: RootState) => cart);

  const cartProductCount = productList.reduce(
    (count, product) => count + product.amount,
    0
  );

  function handlerClickCartToggle() {
    if (!disabledCartPreview && cartProductCount) {
      toggleCartVisibility(!isCartVisible);
    }
  }

  function handlerClickMenuToggle() {
    setMenuVisible(!isMenuVisible);
  }

  function setBodyOffset() {
    if (containerRef.current) {
      const offset = containerRef.current.offsetHeight;
      document.body.style.paddingTop = `${offset}px`;
    }
  }

  useEffect(() => {
    if (isMounted) setBodyOffset();

    function handleScroll() {
      requestAnimationFrame(() => changeHeaderSize());
    }

    function handleResize() {
      setBodyOffset();
    }

    document.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMounted, changeHeaderSize]);

  return (
    <HeaderTag ref={containerRef}>
      <HeaderContainer>
        <ContentContainer size="wide">
          <HeaderInner>
            <MainMenuToggle>
              <MenuButton onClick={handlerClickMenuToggle}>
                <span />
              </MenuButton>
            </MainMenuToggle>
            <HeaderLogo
              to={logoLink ?? '/'}
              disabled={disabledLogo}
              logo={logoType}
            >
              <img
                src={logoType ? LOGOS[logoType] : LOGOS.default}
                alt="Letique Cosmetics"
              />
            </HeaderLogo>
            <ShoppingCart>
              <CartButton onClick={handlerClickCartToggle}>
                <CartCounter isVisible={isCartInitialized}>
                  {cartProductCount}
                </CartCounter>
              </CartButton>
              <CartDropdown
                isVisible={isCartVisible}
                setVisible={handlerClickCartToggle}
              />
            </ShoppingCart>
          </HeaderInner>
        </ContentContainer>
      </HeaderContainer>

      <MainMenu isVisible={isMenuVisible} setVisible={handlerClickMenuToggle} />
    </HeaderTag>
  );
}

const HeaderTag = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;
  width: 100%;
`;

const HeaderContainer = styled.div`
  display: block;
  width: 100%;
  padding: 3vw 0 2vw;
  backdrop-filter: blur(0px);
  background-color: rgba(255, 255, 255, 0);
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
  transition: padding 300ms ${timingFn.ease}, box-shadow 150ms ${timingFn.ease};

  .fixed & {
    padding: 1vw 0;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 3px 15px 1px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
  }

  ${media.laptop(css`
    .fixed & {
      padding: 1.5vw 0;
    }
  `)}

  ${media.tablet(css`
    .fixed & {
      padding: 2vw 0;
    }
  `)}

  ${media.mobile(css`
    padding: 7.5vw 0 2.5vw;

    .fixed & {
      padding: 4vw 0;
    }
  `)}
`;

const HeaderInner = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const MainMenuToggle = styled.div`
  ${media.noMobile(css`
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  `)}
`;

const MenuButton = styled.button`
  position: relative;
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
    background-color: ${colors.black};
  }

  &:before {
    top: 10%;
  }

  &:after {
    bottom: 10%;
  }

  span {
    top: 50%;
    transform: translateY(-50%) scaleX(0.65);
  }

  ${media.mobile(css`
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    min-width: 26px;
    min-height: 22px;
  `)}
`;

const HeaderLogo = styled(Link)<{ logo?: string; disabled?: boolean }>`
  display: block;
  cursor: pointer;

  img {
    transition: width 0.3s ${timingFn.ease}, height 0.3s ${timingFn.ease};
  }

  ${({ logo }) =>
    logo && logo !== 'default'
      ? css`
          img {
            width: 17vw;
            min-width: 220px;
            transition: width 300ms ${timingFn.ease};

            .fixed & {
              width: 13vw;
              min-width: 220px;
            }
          }

          ${media.mobile(css`
            img {
              width: 37vw;
              min-width: 170px;

              .fixed & {
                width: 31vw;
                min-width: 170px;
              }
            }
          `)}
        `
      : css`
          img {
            width: 8.8vw;
            min-width: 120px;
            transition: width 300ms ${timingFn.ease};

            .fixed & {
              width: 6vw;
              min-width: 100px;
            }
          }

          ${media.mobile(css`
            img {
              width: 19vw;
              min-width: 90px;

              .fixed & {
                width: 14vw;
                min-width: 80px;
              }
            }
          `)}
        `}

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;
    `}
`;

const ShoppingCart = styled.div`
  ${media.noMobile(css`
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  `)}
`;

const CartButton = styled.button`
  display: flex;
  align-items: flex-start;

  &:after {
    content: '';
    display: block;
    flex-shrink: 0;
    width: 1.3vw;
    min-width: 20px;
    height: 1.3vw;
    min-height: 20px;
    margin-left: 10px;
    background: url("${cartIcon}") no-repeat center / contain;
  }

  ${media.mobile(css`
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);

    &:after {
      width: 4vw;
      height: 3vw;
      margin-left: 5px;
    }
  `)}
`;

const CartCounter = styled.span<{ isVisible: boolean }>`
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 50px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  text-align: center;
  color: ${colors.white};
  background-color: ${colors.accent};
  transition: opacity 0.35s ${timingFn.easeIn} 0.35s;

  ${media.mobile(css`
    min-width: 18px;
    height: 18px;
    font-size: 12px;
    line-height: 18px;
  `)}

  ${({ isVisible }) =>
    isVisible
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
        `}
`;

const CartDropdown = styled(CartPreview)`
  position: absolute;
  top: calc(100% + 1vw);
  right: 0;

  ${media.mobile(css`
    position: fixed;
    top: 0;
  `)}
`;

export default Header;
