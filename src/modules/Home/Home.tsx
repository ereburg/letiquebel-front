import React from 'react';
import styled, { css } from 'styled-components';

import { Product, Slide } from '@typings/models';

import { media } from '@utils/mixin';

import { ContentSection, ContentContainer } from '@components/content';
import { SectionTitle } from '@components/typography';

import HeroSlider from '@components/Slider/Hero';
import ProductPreviewList from '@components/Product/PreviewList';
import AboutQuality from '@components/About/Quality';
import ReviewsSlider from '@components/Slider/Reviews';

type Props = {
  slideList: Array<Slide>;
  productList: Array<Product>;
  productSetList: Array<Product>;
  extraProductList?: Array<Product>;
  extraSectionTitle?: string;
};

function Home({
  slideList,
  productList,
  productSetList,
  extraSectionTitle,
  extraProductList,
}: Props) {
  // Фильтруем наборы товаров
  const productsWithoutSets = productList.filter(
    (item) => !/(SET|BOX|PACK)$/i.test(item.title)
  );

  return (
    <>
      <FeaturedSlider slideList={slideList} />

      {extraProductList ? (
        <ContentSection>
          <ContentContainer>
            <SectionTitle>{extraSectionTitle}</SectionTitle>
            <ProductPreviewList productList={extraProductList} />
          </ContentContainer>
        </ContentSection>
      ) : null}

      <ContentSection>
        <ContentContainer>
          <SectionTitle>Letique</SectionTitle>
          <ProductPreviewList productList={productsWithoutSets} />
        </ContentContainer>
      </ContentSection>

      {productSetList.length ? (
        <ContentSection>
          <ContentContainer>
            <SectionTitle>Выгодные наборы</SectionTitle>
            <ProductPreviewList productList={productSetList} />
          </ContentContainer>
        </ContentSection>
      ) : null}

      <ContentSection>
        <ContentContainer>
          <SectionTitle>Качество</SectionTitle>
          <AboutQuality />
        </ContentContainer>
      </ContentSection>

      <ContentSection hideOverflow>
        <ContentContainer size="wide">
          <SectionTitle>Отзывы</SectionTitle>
          <ReviewsSlider />
        </ContentContainer>
      </ContentSection>
    </>
  );
}

const FeaturedSlider = styled(HeroSlider)`
  margin-top: -5vw;

  ${media.mobile(css`
    margin-top: -16.5vw;
  `)}
`;

export default Home;
