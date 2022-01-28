import React, { useEffect, useRef, useState } from 'react';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import { CloseButton, Overlay } from '@components/Modal/Modal.style';

import { ReactComponent as CloseIcon } from '@assets/svg/close-icon.svg';

import * as S from './PopupModal.style';

type Props = {
  children: JSX.Element;
  disableWrapper?: boolean;
  onClose: () => void;
};

function PopupModal({ children, disableWrapper, onClose }: Props) {
  const [isOpen, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function handlerToggleClick() {
    setOpen(false);
  }

  function handleTransitionEnd() {
    if (!isOpen) onClose();
  }

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!containerRef.current) return;

        setOpen(true);
        disableBodyScroll(containerRef.current, {
          reserveScrollBarGap: true,
        });
      });
    });

    return () => clearAllBodyScrollLocks();
  }, []);

  return (
    <S.PopupContainer ref={containerRef}>
      <CloseButton isOpen={isOpen} onClick={handlerToggleClick}>
        <CloseIcon />
      </CloseButton>
      <Overlay isOpen={isOpen} onTransitionEnd={handleTransitionEnd} />
      <S.Inner isOpen={isOpen}>
        <S.Content>
          {!disableWrapper ? <S.Card>{children}</S.Card> : children}
        </S.Content>
      </S.Inner>
    </S.PopupContainer>
  );
}

export default PopupModal;
