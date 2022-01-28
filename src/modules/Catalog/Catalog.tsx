import React from 'react';

import { Product } from '@typings/models';
import { FilterOption } from './components/FilterSelect';

import { ContentSection, ContentContainer } from '@components/content';
import { PageTitle } from '@components/typography';

import FilterContainer from './components/FilterContainer';

type Props = {
  categoryTitle?: string;
  productList: Array<Product>;
};

function Catalog({ productList, categoryTitle }: Props) {
  const productTypeList: { [key: string]: FilterOption } = {};

  productList &&
    productList.forEach((product) => {
      const productTypes = product.types;
      if (!productTypes.length) return;

      productTypes.forEach((type) => {
        if (!productTypeList[type.title]) {
          productTypeList[type.title] = {
            label: type.title,
            value: type.id,
          };
        }
      });
    });

  return (
    <>
      <PageTitle>
        <ContentContainer>
          {categoryTitle ? categoryTitle : 'Каталог'}
        </ContentContainer>
      </PageTitle>
      <ContentSection>
        <ContentContainer>
          <FilterContainer
            productList={productList}
            productTypeList={Object.values(productTypeList)}
          />
        </ContentContainer>
      </ContentSection>
    </>
  );
}

export default Catalog;
