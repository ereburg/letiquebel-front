import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';

import { Slide } from '@typings/models';

import { DYNAMIC_ROUTES } from '@constants/common';

import {
  SliderWrapper,
  SliderContainer,
  SliderInner,
  PrevButton,
  NextButton,
} from '@components/Slider/Slider.style';

import * as S from './HeroSlider.style';

type Props = {
  slideList: Array<Slide>;
  className?: string;
};

function HeroSlider({ slideList, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!prevRef.current || !nextRef.current) return;

    new Swiper(containerRef.current, {
      loop: true,
      speed: 500,
      autoplay: {
        delay: 4000,
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      slideActiveClass: 'active',
      slideDuplicateActiveClass: 'duplicate-active',
      slideDuplicateClass: 'duplicate',
      watchOverflow: true,
      navigation: {
        nextEl: nextRef.current,
        prevEl: prevRef.current,
      },
    });
  }, []);

  return (
    <SliderWrapper {...{ className }}>
      <PrevButton ref={prevRef} />
      <SliderContainer className="swiper-container" ref={containerRef}>
        <SliderInner className="swiper-wrapper">
          {slideList.map((item, index) => {
            const linkParts = item.link.replace(/\/$/, '').split('/');
            const linkTo = linkParts[linkParts.length - 1];

            return (
              <S.SliderSlide
                className="swiper-slide"
                bgImage={item.backgroundImage?.url}
                key={index}
              >
                <S.SlideInner
                  href={`${DYNAMIC_ROUTES.product}/[alias]`}
                  to={`${DYNAMIC_ROUTES.product}/${linkTo}`}
                >
                  <S.SlideTitle>
                    {item.title}
                    {item.status ? (
                      <S.SlideLabel>{item.status}</S.SlideLabel>
                    ) : null}
                  </S.SlideTitle>
                  <S.SlideAbout>{item.subtitle}</S.SlideAbout>
                  <S.SlideDescription>{item.description}</S.SlideDescription>
                  <S.SlideImage src={item.file?.url} alt={item.title} />
                  <S.SlideButton variant="underlineBold">
                    Подробнее
                  </S.SlideButton>
                </S.SlideInner>
              </S.SliderSlide>
            );
          })}
        </SliderInner>
      </SliderContainer>
      <NextButton ref={nextRef} />
    </SliderWrapper>
  );
}

export default HeroSlider;
