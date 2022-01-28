import React from 'react';
import { Product } from '@typings/models';
import ProductPreview from '@components/Product/Preview';
import * as S from './ProductPreviewList.style';

type Props = {
  productList: Array<Product>;
};

function ProductPreviewList({ productList }: Props) {
  // console.log('productList: ', productList);
  return (
    <S.ProductsContainer>
      <S.GridContainer>
        {productList &&
          productList.map((item, index) => (
            <S.GridItem key={`${index}${item.id}`}>
              <ProductPreview data={item} link={item.link} />
            </S.GridItem>
          ))}
      </S.GridContainer>
    </S.ProductsContainer>
  );
}

export default ProductPreviewList;
