import React from 'react';

import * as S from './RequestResponse.style';

type Props = {
  iconUrl: string;
  title: string;
  text: string;
  linkLabel?: string;
  linkHref?: string;
  linkTo?: string;
  linkTarget?: string;
  onClick?: () => void;
};

function RequestResponse({
  iconUrl,
  title,
  text,
  linkLabel,
  linkTo,
  linkHref,
  linkTarget = '_self',
}: Props) {
  return (
    <S.ResponseContainer>
      <S.Title variant="accent" gutter="small">
        <img src={iconUrl} />
        <div dangerouslySetInnerHTML={{ __html: title }} />
      </S.Title>
      <S.Message align="center" dangerouslySetInnerHTML={{ __html: text }} />
      {linkLabel ? (
        <S.ActionsWrapper>
          {linkTo && (
            <S.ActionLink to={linkTo} target={linkTarget}>
              {linkLabel}
            </S.ActionLink>
          )}
          {linkHref && (
            <S.ActionLink href={linkHref} target={linkTarget} as="a">
              {linkLabel}
            </S.ActionLink>
          )}
        </S.ActionsWrapper>
      ) : null}
    </S.ResponseContainer>
  );
}

export default RequestResponse;
