import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@store/reducers';

import { ROUTES } from '@constants/common';

import { PageTitle } from '@components/typography';
import { ContentSection, ContentContainer } from '@components/content';

import RequestResponse from '@components/RequestResponse';

import successIcon from '@assets/images/icons/face-smile.png';
import failureIcon from '@assets/images/icons/face-sad.png';

type Props = {
  result: string;
  status?: string;
  paymentLink?: string;
};

function Payment({ result, paymentLink }: Props) {
  const { phone } = useSelector((state: RootState) => state.globalParams.data);

  return result === 'success' ? (
    <>
      <PageTitle>
        <ContentContainer>Заказ оформлен!</ContentContainer>
      </PageTitle>
      <ContentSection>
        <ContentContainer>
          <RequestResponse
            iconUrl={successIcon}
            title={`Благодарим за заказ!<br />Наши менеджеры уже оформляют вашу посылку ;-)`}
            text={`А пока что вы можете просмотреть новинки или выбрать сертификат своим друзьям и близким в нашем каталоге!`}
            linkLabel="Перейти в каталог"
            linkTo={ROUTES.catalog.url}
          />
        </ContentContainer>
      </ContentSection>
    </>
  ) : result === 'failure' ? (
    <>
      <PageTitle>
        <ContentContainer>Что-то пошло не так =(</ContentContainer>
      </PageTitle>
      <ContentSection>
        <ContentContainer>
          <RequestResponse
            iconUrl={failureIcon}
            title={`Возможно проблемы с интернетом.<br />Попробуйте совершить платеж еще раз.`}
            text={`Попробуйте оплатить еще раз. Если ошибка будет повторяться, свяжитесь c нашим менеджером по номеру <a href="tel:${phone}">${phone}</a>`}
            linkLabel="Повторить платеж"
            linkHref={paymentLink}
          />
        </ContentContainer>
      </ContentSection>
    </>
  ) : null;
}

export default Payment;
