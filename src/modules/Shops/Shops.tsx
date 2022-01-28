import React from 'react';

import { Shop } from '@typings/models';
import { Location } from './Shops.type';

import { ContentSection, ContentContainer } from '@components/content';
import { PageTitle } from '@components/typography';

import ShopsView from './components/ShopsView';

type Props = {
  shopList: Array<Shop>;
};

function Shops({ shopList }: Props) {
  const locationList: { [key: string]: Location } = {};

  shopList.forEach((shop) => {
    const city = shop.city;
    if (!city) return;

    if (!locationList[city]) {
      locationList[city] = {
        name: city,
        shopList: [],
      };
    }

    locationList[city].shopList.push(shop);
  });

  const mapObjectList = shopList.map((shop) => {
    return shop.coordinates;
  });

  return (
    <>
      <PageTitle>
        <ContentContainer>Магазины</ContentContainer>
      </PageTitle>
      <ContentSection>
        <ContentContainer>
          <ShopsView
            mapObjectList={mapObjectList}
            locationList={Object.values(locationList)}
            shopList={shopList}
          />
        </ContentContainer>
      </ContentSection>
    </>
  );
}

export default Shops;
