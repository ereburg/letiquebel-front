import React from 'react';

import * as S from './InstagramCard.style';

type Props = {
  link: string;
  postImg?: string;
  authorPhoto?: string;
  authorName?: string;
  likeCount?: number;
  text: string;
};

function InstagramCard(props: Props) {
  return (
    <S.Container href={props.link} target="_blank">
      <S.ImageWarp>
        <S.ImageElem
          src={props.postImg}
          alt={props.authorName}
          loading="lazy"
        />
        <S.Author>
          <S.AuthorPhoto src={props.authorPhoto} alt={props.authorName} />
          <S.AuthorName>{props.authorName}</S.AuthorName>
        </S.Author>
      </S.ImageWarp>
      <S.Content>
        <S.OptionList>
          <S.Like />
          <S.Comment />
          <S.Bookmark />
        </S.OptionList>
        <S.LikeCounter>{props.likeCount} отметок «Нравится»</S.LikeCounter>
        <S.Descript>{`${props.text.slice(0, 350)}...`}</S.Descript>
      </S.Content>
    </S.Container>
  );
}

export default InstagramCard;
