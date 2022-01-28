import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';

import Button from '@components/Button';
import LightboxModal from '@components/Modal/Lightbox';
import CertPreview from './CertPreview';

type Props = {
  certList: Array<{ image: string; title: string }>;
};

const spoilerLimit = 3;

function CertList({ certList }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isShowAll, setShowAll] = useState(false);
  const isOverSpoilerLimit = spoilerLimit < certList.length;

  function handleClickModalToggle(index?: number) {
    if (index !== undefined) setActiveIndex(index);
    setModalVisible(!isModalVisible);
  }

  function handleShowAllClick() {
    setShowAll(true);
  }

  return (
    <>
      <CertsContainer>
        <GridContainer>
          {certList.slice(0, spoilerLimit).map((item, index) => (
            <GridItem key={index}>
              <CertPreview
                image={item.image}
                title={item.title}
                onClick={() => handleClickModalToggle(index)}
                data-index={index}
              />
            </GridItem>
          ))}
          {isShowAll && isOverSpoilerLimit
            ? certList.slice(spoilerLimit).map((item, index) => {
                const realIndex = index + spoilerLimit;

                return (
                  <GridItem key={realIndex}>
                    <CertPreview
                      image={item.image}
                      title={item.title}
                      onClick={() => handleClickModalToggle(realIndex)}
                      data-index={realIndex}
                    />
                  </GridItem>
                );
              })
            : null}
        </GridContainer>
        {!isShowAll && isOverSpoilerLimit ? (
          <Actions>
            <ActionButton variant="underlineBig" onClick={handleShowAllClick}>
              Показать все сертификаты
            </ActionButton>
          </Actions>
        ) : null}
      </CertsContainer>

      {isModalVisible ? (
        <LightboxModal
          slideList={certList}
          initialSlide={activeIndex}
          onClose={handleClickModalToggle}
        />
      ) : null}
    </>
  );
}

const CertsContainer = styled.div``;

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 -10px;
`;

const GridItem = styled.div`
  flex: 0 0 33.33333%;
  max-width: 33.33333%;
  padding: 0 10px;

  &:not(:nth-child(-n + 3)) {
    margin-top: 3.5vw;
  }

  ${media.tablet(css`
    flex-basis: 40%;
    max-width: 40%;

    &:not(:nth-child(-n + 2)) {
      margin-top: 4.5vw;
    }
  `)}

  ${media.mobile(css`
    flex-basis: 50%;
    max-width: 50%;

    &:not(:nth-child(-n + 2)) {
      margin-top: 9vw;
    }
  `)}
`;

export const Actions = styled.div`
  margin-top: 5vw;
  text-align: center;

  ${media.tablet(css`
    margin-top: 9vw;
  `)}

  ${media.mobile(css`
    margin-top: 13vw;
  `)}
`;

export const ActionButton = styled(Button)`
  text-transform: uppercase;
`;

export default CertList;
