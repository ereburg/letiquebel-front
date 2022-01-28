import React from 'react';

import { ContentContainer, ContentSection } from '@components/content';
import { PageTitle } from '@components/typography';

type Props = {
  statusCode: number;
};

function ErrorContent({ statusCode }: Props) {
  return (
    <>
      <PageTitle>
        <ContentContainer>
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'}
        </ContentContainer>
      </PageTitle>
    </>
  );
}

export default ErrorContent;
