import React from 'react';

import { ROUTES } from '@constants/common';

import { ContentContainer, ContentSection } from '@components/content';
import { PageTitle } from '@components/typography';

import RequestResponse from '@components/RequestResponse';

import NotFoundIcon from '@assets/images/icons/cherry.png';

function NotFound() {
  return (
    <>
      <PageTitle>
        <ContentContainer>Ошибка 404</ContentContainer>
      </PageTitle>
      <ContentSection>
        <ContentContainer>
          <RequestResponse
            iconUrl={NotFoundIcon}
            title="Возможно этой страницы уже не существует или была ошибка в ссылке!"
            text="Попробуйте начать с главной или посмотрите наши классные новинки в каталоге ;-) Не забудьте о том, что у нас в продаже имеются сертификаты!"
            linkLabel="Перейти в каталог"
            linkTo={ROUTES.catalog.url}
          />
        </ContentContainer>
      </ContentSection>
    </>
  );
}

export default NotFound;
