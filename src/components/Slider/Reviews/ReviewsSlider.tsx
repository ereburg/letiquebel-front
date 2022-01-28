import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';

import * as S from './ReviewsSlider.style';

import InstagramCard from '@components/InstagramCard';

import {
  SliderInner,
  PrevButton,
  NextButton,
} from '@components/Slider/Slider.style';

import PostImg1 from '@assets/images/instagram/post-1.jpg';
import AuthorPhoto1 from '@assets/images/instagram/author-1.jpg';
import PostImg2 from '@assets/images/instagram/post-2.jpg';
import AuthorPhoto2 from '@assets/images/instagram/author-2.jpg';
import PostImg3 from '@assets/images/instagram/post-3.jpg';
import AuthorPhoto3 from '@assets/images/instagram/author-3.jpg';
import PostImg4 from '@assets/images/instagram/post-4.jpg';
import AuthorPhoto4 from '@assets/images/instagram/author-4.jpg';
import PostImg5 from '@assets/images/instagram/post-5.jpg';
import AuthorPhoto5 from '@assets/images/instagram/author-5.jpg';
import PostImg6 from '@assets/images/instagram/post-6.jpg';
import AuthorPhoto6 from '@assets/images/instagram/author-6.jpg';

const POSTS = [
  {
    link: 'https://instagram.com/p/BpE1HyKHzkL',
    postImg: PostImg2,
    authorImg: AuthorPhoto2,
    authorName: '@elena_shkalenko',
    likeCount: 615,
    text:
      'Девочки, наконец-то я нашла скраб, который восстановил мою кожу после месяца жаркого солнышка. Ни для кого не секрет, что осенью чувствительность кожи увеличивается. После лета она обезвожена, плюс резкое колебание температур провоцируют сухость и шелушение. Не поленитесь и найдите время на её уход. @letique.cosmetics специально разработала специальную серию, которая помогает предотвратить появлению неровностей рельефа, безжизненности и сухости кожи. Хочу уже поскорее попробовать их новый кокосовый скраб. А вы пользуетесь скрабом? Какой ваш любимый? #elenafurman #люблю_уважаю_своетело #скр...',
  },
  {
    link: 'https://instagram.com/p/BpFRvAaH-hr',
    postImg: PostImg3,
    authorImg: AuthorPhoto3,
    authorName: '@christy_ig',
    likeCount: 1622,
    text:
      '⭐КОСМЕТИЧКА В ПУТЕШЕСТВИИ⭐ Как сохранять красоту, когда порой ночуешь где попало, постоянно в движении?🤔 Каждый, мать его, тюбик дает вес рюкзаку😭, да и рюкзак не резиновый (в отличие от Москвы😄) С собой то, что влезло и, по итогу,  от некоторого я откажусь😔 Не так уж и легка своя ноша😬 Вобщем, косметичкой я называю штуку, где у меня все для меня всей😄 1. Шампунь⠀2. Маска для волос⠀3. Мыло в мыльнице⠀4. Крем для лица ⠀5. Крем для тела⠀6. Крем для рук⠀7. Джонсонс беби (массаж никто не отменял😆)⠀8. Щетка для ног⠀9. Маска для лица⠀10. Много всяких пробников кремов (насоб...',
  },
  {
    link: 'https://instagram.com/p/BqAb_O3gNwQ',
    postImg: PostImg4,
    authorImg: AuthorPhoto4,
    authorName: '@arinaponomarevaa',
    likeCount: 848,
    text:
      'Хэй! Я к вам с новостями из бьюти сферы! 🖤🤩📸 Получила свою сааамую долгожданную посылку от @letique.cosmetics 🦋 И, кажется, к зависимости от кофе у меня добавилась ещё одна)) от кокосового скраба и холодного обертывания😍 Очищение кожи, увлажнение и питание маслами(которые просто безууумно вкусно пахнут), борьба с целлюлитом! Ну кто устоит-то, а?) Абсолютно довольна комплексом и от чистого сердца хвалю и рекомендую всем, кто следит за собой🤘🏼 Готовь сани летом, а телегу зимой, как говорится 😂😏',
  },
  {
    link: 'https://instagram.com/p/BwpIICggZQa',
    postImg: PostImg1,
    authorImg: AuthorPhoto1,
    authorName: '@alenatoffi_official',
    likeCount: 33958,
    text:
      'Леееето, ах лееето, лето жаркое громче пой🔥 Готовитесь? Я уже во всеоружии💪🏻 После родов я стала еще больше любить свое тело☝🏻 поэтому забочусь и балую его лучшими средствами. Когда Лерчик выпустила свою линию @letique.cosmetics я поняла, что эта девушка не могла сделать плохой продукт. И знаете что? @letique.cosmetics даже лучше, чем я представляла. Во-первых, запах🤤 уммм такой, что хочется съесть содержимое, а не намазать. Во-вторых, кожа стала такая упругая и подтянутая, как попка у Богдана🍑 В-третьих, сразу понятно, что эффект есть: ноги и попа во время процедуры так горят огнем, ...',
  },
  {
    link: 'https://instagram.com/p/BxJ2majBAlz',
    postImg: PostImg5,
    authorImg: AuthorPhoto5,
    authorName: '@kolisnichenko_official',
    likeCount: 13025,
    text:
      '🍊ПРО ЦЕЛЛЮЛИТ🍊... Знакомьтесь с чудом от @letique.cosmetics - это кокосовый скраб и холодное обёртывание (оно разрешено беременным со 2-го триместра)🥰🙏🏼.... В общем сейчас стало ооочень много целлюля и ноги 🦵🏽(ляжки) в 30 недель беременности стали водянистыми, жирными и большими(((( Я уже не могу на это смотреть 😔.... решилась сделать обертывания и знаете что....? Это просто шок 😲 ‼️ Во время процедуры ляшки холодило приятно обёртывание , потом прошло... через какое то время после завершения ритуала захотелось в туалет... а вечером ноги стали заметно стройнее!!! Слилась отёчнос...',
  },
  {
    link: 'https://instagram.com/p/Bxc0lDUClLw',
    postImg: PostImg6,
    authorImg: AuthorPhoto6,
    authorName: '@pp_yulia56',
    likeCount: 20297,
    text:
      'Сегодня в сторис показывала свой ужасный живот, кожа очень растянулась за беременность ... Для меня в принципе не характерно показывать себя без одежды, а тут  ещё и со всеми своими изъянами.. Стесняюсь очень, но при этом работаю над собой  с момента вторых родов прошло всего ничего 7 месяцев..Мне очень помогает вернуть кожу в тонус Косметика Letique @letique.cosmetics холодный комплекс - это что-то потрясающее! Сначала делаю массаж свой щеткой. Потом после душа кокосовый скраб с самомассажем. Следом холодное мятное обёртывание и в плёнку на 30-40минут. Кожа медленно покрывается мурашка...',
  },
];

function ReviewsSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!prevRef.current || !nextRef.current) return;

    new Swiper(containerRef.current, {
      loop: true,
      slidesPerView: 'auto',
      watchOverflow: true,
      navigation: {
        nextEl: nextRef.current,
        prevEl: prevRef.current,
      },
    });
  }, []);

  return (
    <S.Wrapper>
      <PrevButton ref={prevRef} />
      <S.Container className="swiper-container" ref={containerRef}>
        <SliderInner className="swiper-wrapper">
          {POSTS.map((item, i) => (
            <S.SliderSlide className="swiper-slide" key={i}>
              <InstagramCard
                link={item.link}
                postImg={item.postImg}
                authorPhoto={item.authorImg}
                authorName={item.authorName}
                likeCount={item.likeCount}
                text={item.text}
              />
            </S.SliderSlide>
          ))}
        </SliderInner>
      </S.Container>
      <NextButton ref={nextRef} />
    </S.Wrapper>
  );
}

export default ReviewsSlider;
