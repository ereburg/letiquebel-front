import React, { useEffect, useRef, useState } from 'react';
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import Swiper from 'swiper';

import { CloseButton, Overlay } from '@components/Modal/Modal.style';

import * as S from './LightboxModal.style';
import { ReactComponent as CloseIcon } from '@assets/svg/close-icon.svg';
import { ReactComponent as PrevArrowIcon } from '@assets/svg/prev-arrow-icon.svg';
import { ReactComponent as NextArrowIcon } from '@assets/svg/next-arrow-icon.svg';

type Props = {
  slideList: Array<{ image: string; title: string }>;
  initialSlide: number;
  onClose: () => void;
};

function LightboxModal({ onClose, slideList, initialSlide }: Props) {
  const [isOpen, setOpen] = useState(false);
  const lightboxContainerRef = useRef<HTMLDivElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const sliderPrevRef = useRef<HTMLButtonElement>(null);
  const sliderNextRef = useRef<HTMLButtonElement>(null);
  const sliderRef = useRef<null | Swiper>(null);

  function handlerToggleClick() {
    setOpen(false);
  }

  function handleKeyClick(e: KeyboardEvent) {
    const sliderInstance = sliderRef.current;
    if (!sliderInstance) return;

    if (e.keyCode === 39) {
      sliderInstance.slideNext();
    } else if (e.keyCode === 37) {
      sliderInstance.slidePrev();
    }
  }

  function handleTransitionEnd() {
    if (!isOpen) onClose();
  }

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const lightboxElem = lightboxContainerRef.current;
        const sliderElem = sliderContainerRef.current;
        const sliderPrevElem = sliderPrevRef.current;
        const sliderNextElem = sliderNextRef.current;

        if (!lightboxElem || !sliderElem) return;
        if (!sliderPrevElem || !sliderNextElem) return;

        setOpen(true);
        disableBodyScroll(lightboxElem, {
          reserveScrollBarGap: true,
        });

        sliderRef.current = new Swiper(sliderElem, {
          speed: 700,
          initialSlide,
          navigation: {
            disabledClass: 'disabled',
            prevEl: sliderPrevElem,
            nextEl: sliderNextElem,
          },
        });

        document.addEventListener('keydown', handleKeyClick);
      });
    });

    return () => {
      document.removeEventListener('keydown', handleKeyClick);
      clearAllBodyScrollLocks();
    };
  }, [initialSlide]);

  return (
    <S.LightboxContainer ref={lightboxContainerRef}>
      <CloseButton onClick={handlerToggleClick} isOpen={isOpen}>
        <CloseIcon />
      </CloseButton>
      <Overlay onTransitionEnd={handleTransitionEnd} isOpen={isOpen} />
      <S.PrevButton ref={sliderPrevRef} isOpen={isOpen}>
        <PrevArrowIcon />
      </S.PrevButton>
      <S.SliderContainer
        className="swiper-container"
        ref={sliderContainerRef}
        isOpen={isOpen}
      >
        <S.SliderInner className="swiper-wrapper">
          {slideList.map((item, index) => (
            <S.SliderSlide className="swiper-slide" key={index}>
              <S.ImageWrap>
                <S.ImageElem src={item.image} alt={item.title} />
              </S.ImageWrap>
            </S.SliderSlide>
          ))}
        </S.SliderInner>
      </S.SliderContainer>
      <S.NextButton ref={sliderNextRef} isOpen={isOpen}>
        <NextArrowIcon />
      </S.NextButton>
    </S.LightboxContainer>
  );
}

export default LightboxModal;
