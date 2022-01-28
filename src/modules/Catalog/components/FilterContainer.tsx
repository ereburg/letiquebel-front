import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';

import { Product } from '@typings/models';
import { FilterOption } from './FilterSelect';

import { Text } from '@components/typography';

import ProductPreviewList from '@components/Product/PreviewList';
import FilterSelect from './FilterSelect';

type Props = {
  productList: Array<Product>;
  productTypeList: Array<FilterOption>;
};

function FilterContainer({ productList, productTypeList }: Props) {
  const [filterByType, setFilterByType] = useState<null | number>(null);

  const resultProductList = filterByType
    ? productList.filter(({ types }) =>
        types?.find(({ id }) => id === filterByType)
      )
    : productList;

  return (
    <>
      {productTypeList.length ? (
        <TypeFilter>
          <FilterSelect
            placeholder="Тип средства"
            itemList={productTypeList}
            onChange={(value) => setFilterByType(value)}
          />
        </TypeFilter>
      ) : null}

      {resultProductList && resultProductList.length ? (
        <ProductPreviewList productList={resultProductList} />
      ) : (
        <Text align="center">Товары данного типа не найдены :(</Text>
      )}
    </>
  );
}

const TypeFilter = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3vw;

  ${media.mobile(css`
    margin-bottom: 7vw;
  `)}
`;

export default FilterContainer;
