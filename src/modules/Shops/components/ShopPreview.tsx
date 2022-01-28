import React from 'react';
import styled, { css } from 'styled-components';

import { Shop } from '@typings/models';

import { media } from '@utils/mixin';
import { colors, timingFn } from '@constants/theme';

import Button from '@components/Button';

import { ReactComponent as MetroIcon } from '@assets/svg/metro-icon.svg';

type Props = {
  data: Shop;
  onClick: () => void;
  isActive: boolean;
  isMobileLayout: boolean;
  mapElement: JSX.Element;
};

function ShopPreview({
  data,
  mapElement,
  isMobileLayout,
  isActive,
  onClick,
}: Props) {
  return (
    <Container>
      <Preview isActive={isActive}>
        <ImageWrap>
          <ImageElem src={data.file?.url} alt={data.place} />
        </ImageWrap>
        <Details>
          <Place>{data.place}</Place>
          <Address>{data.address}</Address>
          <WorkingHours>{data.workingHours}</WorkingHours>
          {data.metro ? (
            <SubwayStation>
              <MetroIcon />
              {data.metro}
            </SubwayStation>
          ) : null}
          <PhoneNumber>{data.phone}</PhoneNumber>
          {isMobileLayout && isActive ? null : (
            <ActionButton variant="underlineBig" onClick={onClick}>
              Смотреть на карте
            </ActionButton>
          )}
        </Details>
      </Preview>
      {isMobileLayout && isActive ? mapElement : null}
    </Container>
  );
}

const Container = styled.div``;

const Preview = styled.figure<{ isActive: null | boolean }>`
  position: relative;
  display: flex;
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

const ImageWrap = styled.div`
  width: 14vw;
  margin-right: 2.5vw;

  ${media.tablet(css`
    width: 20vw;
  `)}

  ${media.mobile(css`
    width: 30vw;
  `)}
`;

const ImageElem = styled.img`
  width: 100%;
`;

const Details = styled.figcaption`
  flex: 1 1 auto;
`;

const Place = styled.span`
  display: block;
  margin-bottom: 1.1vw;
  font-size: 1.2vw;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14vw;

  ${media.tablet(css`
    font-size: 2vw;
    margin-bottom: 1.4vw;
  `)}

  ${media.mobile(css`
    font-size: 3.5vw;
    letter-spacing: 0.3vw;
    margin-bottom: 3.1vw;
  `)}
`;

const detailsTextCss = css`
  display: block;
  margin-bottom: 0.7vw;
  font-size: 1vw;
  font-weight: 400;
  font-style: normal;
  color: ${colors.silver};

  ${media.tablet(css`
    font-size: 1.8vw;
    margin-bottom: 1vw;
  `)}

  ${media.mobile(css`
    font-size: 3.3vw;
    margin-bottom: 0;

    &:not(:last-child) {
      margin-bottom: 2.1vw;
    }
  `)}
`;

const Address = styled.address`
  ${detailsTextCss};
`;

const WorkingHours = styled.span`
  ${detailsTextCss};
`;

const SubwayStation = styled.span`
  ${detailsTextCss};

  svg {
    display: inline-block;
    vertical-align: top;
    width: 1.3vw;
    height: 1.3vw;
    margin-right: 0.5vw;
  }

  ${media.tablet(css`
    svg {
      width: 2vw;
      height: 2vw;
      margin-right: 0.8vw;
    }
  `)}

  ${media.mobile(css`
    svg {
      width: 3.6vw;
      height: 3.6vw;
      margin-right: 1vw;
    }
  `)}
`;

const PhoneNumber = styled.span`
  ${detailsTextCss};
`;

const ActionButton = styled(Button)`
  text-transform: none;

  ${media.tablet(css`
    font-size: 2vw;
  `)}
`;

export default ShopPreview;
