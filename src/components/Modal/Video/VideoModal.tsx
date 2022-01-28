import React, { useEffect, useRef, useState } from 'react';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import { CloseButton, Overlay } from '@components/Modal/Modal.style';

import * as S from './VideoModal.style';
import { ReactComponent as CloseIcon } from '@assets/svg/close-icon.svg';

type Props = {
  onClose: () => void;
  videoId: string;
};

function VideoModal({ onClose, videoId }: Props) {
  const [isOpen, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

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
    <S.VideoContainer ref={containerRef}>
      <CloseButton onClick={handlerToggleClick} isOpen={isOpen}>
        <CloseIcon />
      </CloseButton>
      <Overlay isOpen={isOpen} onTransitionEnd={handleTransitionEnd} />
      <S.Inner>
        <S.Stage isOpen={isOpen}>
          <S.Player width={640} height={360} frameBorder="0" src={videoUrl} />
        </S.Stage>
      </S.Inner>
    </S.VideoContainer>
  );
}

export default VideoModal;
