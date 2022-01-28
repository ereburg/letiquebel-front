import React from 'react';

import * as S from '@components/About/About.style';
import botanovnaImg from '@assets/images/coop/botanovna.jpg';

function AboutCoopBotanovna() {
  return (
    <S.Container>
      <S.Column>
        <S.TextContainer>
          <p>
            <b>
              Всем привет! Меня зовут Алина Левда, но намного больше людей знает
              меня как @botanovna.
            </b>
          </p>
          <p>
            Я давно дружу с Лерой Чекалиной, и очень рада её успехам в создании
            собственной линии косметики. А ещё я мама маленького Тимура, который
            дружит с двойняшками Леры, Алисой и Богданом. И я подумала, а почему
            такая отличная натуральная косметика достаётся только взрослым? Ведь
            детям тоже нужны качественные средства для ухода!
          </p>
          <p>
            Поэтому встречайте: линейка Letique & Botanovna. Идеальный набор для
            регулярного ухода, подходящий даже для малышей. Шампунь без слез,
            мягкая очищающая пенка и нежное молочко для тела. Все создано
            специально для детей и тщательно проверено: качество на высоте!
            Теперь и у наших малышей есть свои полочки с косметикой Letique.
            Попробуйте её и вы!
          </p>
        </S.TextContainer>
      </S.Column>
      <S.Column>
        <S.MediaContainer>
          <S.Image src={botanovnaImg} alt="Botanovna" />
        </S.MediaContainer>
      </S.Column>
    </S.Container>
  );
}

export default AboutCoopBotanovna;
