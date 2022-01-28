import React from 'react';

import { Usage } from '@typings/models';

import * as S from '@components/About/About.style';

type Props = {
  usageDetails: Usage;
};

function AboutUse({ usageDetails }: Props) {
  return (
    <S.Container>
      <S.Column>
        <S.TextContainer
          dangerouslySetInnerHTML={{ __html: usageDetails.text }}
        />
      </S.Column>
      {usageDetails.file?.url ? (
        <S.Column>
          <S.MediaContainer>
            <S.Image src={usageDetails.file.url} alt="Применение" />
          </S.MediaContainer>
        </S.Column>
      ) : null}
    </S.Container>
  );
}

export default AboutUse;
