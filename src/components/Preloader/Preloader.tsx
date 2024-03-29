import React, { useEffect, useState } from 'react';

import { isPreloaderEnabled } from './Preloader.helpers';

import { isBrowser } from '@utils/common';

import * as S from './Preloader.style';

declare global {
  interface Window {
    isPreloaderHidden: boolean | undefined;
  }
}

type PreloaderStatus = 'VISIBLE' | 'FADING_OUT' | 'HIDDEN';

type Props = {
  hidden?: boolean;
  className?: string;
  debug?: boolean;
};

function Preloader({ hidden: hiddenProp, className }: Props) {
  const isControlled = hiddenProp !== undefined;

  function isInitiallyVisible(): boolean {
    const isVisible = isBrowser()
      ? isPreloaderEnabled() && !window.isPreloaderHidden
      : isPreloaderEnabled();

    return isControlled ? !hiddenProp : isVisible;
  }

  const [status, setStatus] = useState<PreloaderStatus>(
    isInitiallyVisible() ? 'VISIBLE' : 'HIDDEN'
  );

  function handleAnimationEnd(): void {
    setStatus('HIDDEN');
  }

  useEffect(() => {
    if (isControlled) {
      setStatus(hiddenProp ? 'FADING_OUT' : 'VISIBLE');
    }
  }, [hiddenProp]);

  useEffect(() => {
    if (isControlled || status !== 'VISIBLE') return;

    function hidePreloader() {
      setStatus('FADING_OUT');
      window.isPreloaderHidden = true;
    }

    if (document.readyState !== 'loading') {
      hidePreloader();
      return;
    }

    document.addEventListener('DOMContentLoaded', hidePreloader);

    return () => {
      document.removeEventListener('DOMContentLoaded', hidePreloader);
    };
  }, []);

  if (status === 'HIDDEN') {
    return null;
  }

  const containerClassName = [
    status === 'FADING_OUT' ? 'fade-out' : undefined,
    className,
  ]
    .filter((item) => !!item)
    .join(' ');

  return (
    <S.Overlay
      className={containerClassName}
      onAnimationEnd={handleAnimationEnd}
      data-preloader-overlay
    >
      <S.Inner data-preloader>
        <S.Item data-preloader-item />
        <S.Item data-preloader-item />
      </S.Inner>
    </S.Overlay>
  );
}

export default Preloader;
