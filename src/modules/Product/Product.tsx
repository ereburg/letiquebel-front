import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { ProductDetails } from '@typings/models';
import { addProduct, setCartVisibility } from '@store/reducers/cart';

import { ContentSection, ContentContainer } from '@components/content';
import { PageTitle, SectionTitle } from '@components/typography';

import AboutCoopBotanovna from '@components/About/CoopBotanovna';
import AboutCoopKristitheone from '@components/About/CoopKristitheone';
import AboutUse from '@components/About/Use';
import ProductPreviewList from '@components/Product/PreviewList';
import ReviewsSlider from '@components/Slider/Reviews';

import Overview from './components/Overview';
import Preview from './components/Preview';
import IngredientList from './components/IngredientList';
import Effects from './components/Effects';

type Props = {
  pageType?: string;
  productDetails: ProductDetails;
};

function Product({ pageType, productDetails }: Props) {
  const isSoldOut = productDetails.status === 'SOLD OUT';

  const dispatch = useDispatch();
  const handleAddClick = useCallback(
    (data: ProductDetails) => {
      dispatch(setCartVisibility(true));
      dispatch(addProduct(data));
    },
    [dispatch]
  );

  return (
    <>
      <PageTitle>
        <ContentContainer>{productDetails.title}</ContentContainer>
      </PageTitle>
      <ContentSection>
        <ContentContainer>
          <Overview
            title={productDetails.title}
            status={productDetails.status}
            image={productDetails.file?.url}
            descript={productDetails.description}
            volume={productDetails.volume}
            discountPrice={productDetails.discountPrice}
            price={productDetails.price}
            handleAddClick={() => handleAddClick(productDetails)}
            isSoldOut={isSoldOut}
          />
        </ContentContainer>
      </ContentSection>

      {pageType === 'botanovna' && (
        <ContentSection>
          <ContentContainer>
            <SectionTitle>Botanovna</SectionTitle>
            <AboutCoopBotanovna />
          </ContentContainer>
        </ContentSection>
      )}

      {pageType === 'kristitheone' && (
        <ContentSection>
          <ContentContainer>
            <SectionTitle>Kristi the One</SectionTitle>
            <AboutCoopKristitheone />
          </ContentContainer>
        </ContentSection>
      )}

      {productDetails.ingredients.length ? (
        <ContentSection>
          <ContentContainer size="wide">
            <SectionTitle>Эффективный и натуральный состав</SectionTitle>
            <IngredientList ingredientList={productDetails.ingredients} />
          </ContentContainer>
        </ContentSection>
      ) : null}

      {productDetails.effect ? (
        <ContentSection>
          <ContentContainer>
            <SectionTitle>Эффекты</SectionTitle>
            <Effects effectDetails={productDetails.effect} />
          </ContentContainer>
        </ContentSection>
      ) : null}

      <ContentSection>
        {productDetails.usage?.text ? (
          <ContentContainer>
            <SectionTitle>Применение</SectionTitle>
            <AboutUse usageDetails={productDetails.usage} />
          </ContentContainer>
        ) : null}
        <ContentContainer>
          <Preview
            title={productDetails.title}
            image={productDetails.file?.url}
            discountPrice={productDetails.discountPrice}
            price={productDetails.price}
            handleAddClick={() => handleAddClick(productDetails)}
            isSoldOut={isSoldOut}
          />
        </ContentContainer>
      </ContentSection>

      {productDetails.relations.map((item, index) => (
        <ContentSection key={`${index}${item.id}`}>
          <ContentContainer>
            <SectionTitle>{item.title}</SectionTitle>
            <ProductPreviewList productList={item.products.slice(0, 4)} />
          </ContentContainer>
        </ContentSection>
      ))}

      <ContentSection hideOverflow>
        <ContentContainer size="wide">
          <SectionTitle>Отзывы</SectionTitle>
          <ReviewsSlider />
        </ContentContainer>
      </ContentSection>
    </>
  );
}

export default Product;
