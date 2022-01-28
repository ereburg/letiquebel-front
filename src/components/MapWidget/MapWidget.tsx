import React from 'react';
import {
  YMaps,
  ZoomControl,
  Placemark,
  MapStateBase,
  MapOptions,
  PlacemarkGeometry,
} from 'react-yandex-maps';

import * as S from './MapWidget.style';

type Props = {
  geoObjects: Array<PlacemarkGeometry>;
  options: MapOptions;
};

const queryParams: any = {
  apikey: '1696d674-5d22-4d17-886f-781ea6f8b52c',
  lang: 'ru_RU',
};
const defaultOptions: MapStateBase = {
  controls: [],
};

function MapWidget({ options, geoObjects }: Props) {
  const resultOptions = { ...defaultOptions, ...options };

  return (
    <S.MapContainer>
      <YMaps query={queryParams}>
        <S.MapElem state={resultOptions}>
          <ZoomControl options={{ float: 'left' }} />
          {geoObjects.map((coords, index) => (
            <Placemark key={index} geometry={coords} />
          ))}
        </S.MapElem>
      </YMaps>
    </S.MapContainer>
  );
}

export default MapWidget;
