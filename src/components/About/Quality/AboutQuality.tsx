import React, { useState } from 'react';

import VideoModal from '@components/Modal/Video';

import * as S from '@components/About/About.style';
import qualityImage from '@assets/images/home/quality.png';

function AboutQuality() {
  const [isModalVisible, setModalVisible] = useState(false);

  function handleClickModalToggle() {
    setModalVisible(!isModalVisible);
  }

  return (
    <>
      <S.Container>
        <S.Column>
          <S.TextContainer>
            <p>
              <b>
                Наша продукция создана для заботы о красоте и здоровье вашего
                тела. Мы убеждены, что самая качественная и эффективная уходовая
                косметика может быть доступной, поэтому делаем всё, чтобы
                предложить вам отличный продукт по честной цене.
              </b>
            </p>
            <p>
              Мы не экономим на ингредиентах, а добиваемся снижения цены за счёт
              эффективной логистики и отсутствия посредников. Благодаря тому,
              что в состав входят только натуральные компоненты самого высокого
              качества, наша продукция безопасна и идеально подходит для
              регулярного ухода за кожей.
            </p>
            <p>
              Скрабы и обертывания тщательно и бережно очищают и массируют кожу,
              повышают её тонус и эластичность, помогают избавиться от
              целлюлита, предотвращают появление растяжек и борются с имеющимися
              несовершенствами кожи. А приятный аромат превращает обычный
              домашний уход в приятную расслабляющую процедуру, чтобы вы сполна
              насладились процессом ухода за собой.
            </p>
          </S.TextContainer>
        </S.Column>
        <S.Column>
          <S.MediaContainer isClickable={true} onClick={handleClickModalToggle}>
            <S.Image
              src={qualityImage}
              alt="Качественная и эффективная косметика"
            />
            <S.PlayButton />
          </S.MediaContainer>
        </S.Column>
      </S.Container>

      {isModalVisible ? (
        <VideoModal onClose={handleClickModalToggle} videoId="9TlLxAVHZYQ" />
      ) : null}
    </>
  );
}

export default AboutQuality;
