import React from 'react';
import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { colors } from '@constants/theme';

type Props = {
  image: string;
  title: string;
  onClick: () => void;
};

function CertPreview({ image, title, onClick }: Props) {
  return (
    <CertContainer onClick={onClick}>
      <ImageWrap>
        <ImageElem src={image} alt={title} />
      </ImageWrap>
      <Caption>{title}</Caption>
    </CertContainer>
  );
}

const CertContainer = styled.figure`
  width: 100%;
  max-width: 19vw;
  margin: 0 auto;
  cursor: pointer;

  ${media.tablet(css`
    max-width: 29vw;
  `)}

  ${media.mobile(css`
    max-width: 40vw;
  `)}
`;

const ImageWrap = styled.div`
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

const ImageElem = styled.img`
  width: 19vw;

  ${media.tablet(css`
    width: 29vw;
  `)}

  ${media.mobile(css`
    width: 40vw;
  `)}
`;

const Caption = styled.figcaption`
  width: 18vw;
  margin-top: 2vw;
  font-size: 1.18vw;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14vw;

  ${media.tablet(css`
    width: 20vw;
    margin-top: 3vw;
    font-size: 1.98vw;
  `)}

  ${media.mobile(css`
    width: auto;
    margin-top: 5vw;
    padding-left: 3.2vw;
    font-size: 3.38vw;
    letter-spacing: 0.3vw;
  `)}
`;

export default CertPreview;
