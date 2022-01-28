import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MapOptions } from 'react-yandex-maps';

import { Shop } from '@typings/models';
import { Location } from '@modules/Shops/Shops.type';

import { media } from '@utils/mixin';

import useMedia from '@hooks/useMedia';

import MapWidget from '@components/MapWidget';

import ShopPreview from './ShopPreview';
import ShopPreviewDemo from './ShopPreviewDemo';

const defaultMapOptions: MapOptions = {
  center: process.env.REACT_APP_IS_DEMO_SHOP
    ? [55.753994, 37.622093]
    : [53.905, 27.557],
  zoom: 12,
};

type Props = {
  mapObjectList: Array<Array<number>>;
  locationList: Array<Location>;
  shopList: Array<Shop>;
};

function ShopsView({ mapObjectList, locationList, shopList }: Props) {
  const [activeShopIndex, setActiveShopIndex] = useState(-1);
  const isMobileLayout = useMedia(`(max-width: 767px)`);

  const mapOptions =
    activeShopIndex > -1
      ? { center: shopList[activeShopIndex].coordinates, zoom: 17 }
      : defaultMapOptions;

  return (
    <Container>
      <LocationList>
        {locationList.map((location, index) => (
          <LocationItem key={index}>
            <LocationTitle>{location.name}</LocationTitle>
            <ShopList>
              {location.shopList.map((shop, jndex) => {
                const isActive = mapOptions.center === shop.coordinates;
                const onClick = () => setActiveShopIndex(index);

                return (
                  <ShopItem key={jndex}>
                    {!process.env.REACT_APP_IS_DEMO_SHOP ? (
                      <ShopPreview
                        data={shop}
                        onClick={onClick}
                        isActive={isActive}
                        isMobileLayout={isMobileLayout}
                        mapElement={
                          <MapContainer>
                            <MapWidget
                              options={mapOptions}
                              geoObjects={mapObjectList}
                            />
                          </MapContainer>
                        }
                      />
                    ) : (
                      <ShopPreviewDemo
                        onClick={onClick}
                        isActive={isActive}
                        isMobileLayout={isMobileLayout}
                        mapElement={
                          <MapContainer>
                            <MapWidget
                              options={mapOptions}
                              geoObjects={mapObjectList}
                            />
                          </MapContainer>
                        }
                      />
                    )}
                  </ShopItem>
                );
              })}
            </ShopList>
          </LocationItem>
        ))}
      </LocationList>
      {!isMobileLayout ? (
        <MapContainer>
          <MapWidget options={mapOptions} geoObjects={mapObjectList} />
        </MapContainer>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const LocationList = styled.ul`
  flex: 0 0 60%;
  max-width: 60%;
  padding: 3vw 3vw 0 0;

  ${media.tablet(css`
    padding-top: 5vw;
  `)}

  ${media.mobile(css`
    flex-basis: 100%;
    max-width: 100%;
    padding: 0;
  `)}
`;

const LocationItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 2.5vw;
  }

  ${media.tablet(css`
    &:not(:last-child) {
      margin-bottom: 4.5vw;
    }
  `)}

  ${media.mobile(css`
    &:not(:last-child) {
      margin-bottom: 6.5vw;
    }
  `)}
`;

const LocationTitle = styled.span`
  display: block;
  padding: 0 2.5vw;
  margin-bottom: 1.5vw;
  font-size: 2.2vw;
  font-weight: 600;
  line-height: 1.5;
  text-transform: uppercase;
  letter-spacing: 0.3vw;

  ${media.tablet(css`
    padding-left: 4.5vw;
    margin-bottom: 3vw;
    font-size: 3vw;
    letter-spacing: 0.45vw;
  `)}

  ${media.mobile(css`
    padding: 0;
    margin-bottom: 5.5vw;
    font-size: 5.6vw;
    letter-spacing: 0.6vw;
    text-align: center;
  `)}
`;

const ShopList = styled.ul``;

const ShopItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 1.5vw;
  }

  ${media.tablet(css`
    &:not(:last-child) {
      margin-bottom: 3.5vw;
    }
  `)}

  ${media.mobile(css`
    &:not(:last-child) {
      margin-bottom: 5.5vw;
    }
  `)}
`;

const MapContainer = styled.div`
  flex: 0 0 40%;
  max-width: 40%;

  ${media.mobile(css`
    flex-basis: 100%;
    max-width: 100%;
    margin-top: 2.1vw;
  `)}
`;

export default ShopsView;
