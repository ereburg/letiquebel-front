import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { Ingredient } from '@typings/models';

import { media } from '@utils/mixin';

import Button from '@components/Button';
import IngredientPreview from './IngredientPreview';

type Props = {
  ingredientList: Array<Ingredient>;
};

const spoilerLimit = 4;

function IngredientList({ ingredientList }: Props) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isShowAll, setShowAll] = useState(false);
  const isOverSpoilerLimit = spoilerLimit < ingredientList.length;

  function handleItemClick(index: number) {
    setActiveIndex(index === activeIndex ? -1 : index);
  }

  function handleShowAllClick() {
    setShowAll(true);
  }

  return (
    <IngredientsContainer>
      <GridContainer>
        {ingredientList.slice(0, spoilerLimit).map((item, index) => (
          <GridItem key={index}>
            <IngredientPreview
              image={item.file?.url}
              title={item.title}
              descript={item.description}
              isOdd={index % 2 !== 0}
              isLastChild={index === ingredientList.length}
              isActive={index === activeIndex}
              onClick={() => handleItemClick(index)}
            />
          </GridItem>
        ))}
        {isShowAll && isOverSpoilerLimit
          ? ingredientList.slice(spoilerLimit).map((item, index) => {
              const realIndex = index + spoilerLimit;

              return (
                <GridItem key={realIndex}>
                  <IngredientPreview
                    image={item.file?.url}
                    title={item.title}
                    descript={item.description}
                    isOdd={realIndex % 2 !== 0}
                    isLastChild={realIndex === ingredientList.length - 1}
                    isActive={realIndex === activeIndex}
                    onClick={() => handleItemClick(realIndex)}
                  />
                </GridItem>
              );
            })
          : null}
      </GridContainer>
      {!isShowAll && isOverSpoilerLimit ? (
        <Actions>
          <ActionButton variant="underlineBig" onClick={handleShowAllClick}>
            Показать все ингредиенты
          </ActionButton>
        </Actions>
      ) : null}
    </IngredientsContainer>
  );
}

export const IngredientsContainer = styled.div``;

export const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  ${media.tabletAndMobile(css`
    margin: 0 -5px;
  `)}
`;

export const GridItem = styled.div`
  flex: 0 0 25%;
  max-width: 25%;

  ${media.tabletAndMobile(css`
    flex-basis: 50%;
    max-width: 50%;
    padding: 0 5px;
  `)}
  
  ${media.tablet(css`
    &:not(:nth-child(-n + 2)) {
      margin-top: 3vw;
    }
  `)}

  ${media.mobile(css`
    &:not(:nth-child(-n + 2)) {
      margin-top: 9vw;
    }
  `)}
`;

export const Actions = styled.div`
  margin-top: 1vw;
  text-align: center;

  ${media.tablet(css`
    margin-top: 5vw;
  `)}

  ${media.mobile(css`
    margin-top: 9vw;
  `)}
`;

export const ActionButton = styled(Button)`
  text-transform: uppercase;
`;

export default IngredientList;
