import React from 'react';
import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';

import Preloader from '@components/Preloader';

import Header from './components/Header';
import Footer from './components/Footer';

type Props = {
  headerLogoType?: string;
  headerLogoLink?: string;
  disabledCartDropdown?: boolean;
  disabledLogo?: boolean;
  children?: React.ReactNode;
};

function Layout({
  children,
  headerLogoType,
  headerLogoLink,
  disabledCartDropdown,
  disabledLogo,
}: Props) {
  return (
    <Container>
      <Preloader />

      <Header
        disabledCartPreview={disabledCartDropdown}
        disabledLogo={disabledLogo}
        logoType={headerLogoType}
        logoLink={headerLogoLink}
      />
      <Main>{children}</Main>
      <Footer disabledLogo={disabledLogo} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1 0 auto;
  padding-top: 5vw;
  padding-bottom: 5.5vw;

  ${media.tablet(css`
    padding-top: 7vw;
    padding-bottom: 7.5vw;
  `)}

  ${media.mobile(css`
    padding-top: 14vw;
    padding-bottom: 14.5vw;
  `)}
`;

export default Layout;
