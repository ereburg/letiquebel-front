import React, { useEffect, useRef, useState } from 'react';

import * as S from './Accordion.style';

type Props = {
  label: string;
  content: string;
};

function Accordion({ label, content }: Props) {
  const [isActive, toggleActive] = useState(false);
  const [isOpen, toggleOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  function handleHeaderClick() {
    toggleActive(!isActive);
  }

  function handleTransitionEnd() {
    toggleOpen(isActive);
  }

  useEffect(() => {
    const bodyElement = bodyRef.current;
    if (!bodyElement) return;

    if (isActive) {
      const bodyScrollHeight = bodyElement.scrollHeight;
      bodyElement.style.height = `${bodyScrollHeight}px`;
    } else {
      bodyElement.style.height = ``;
    }
  }, [isActive]);

  return (
    <S.AccordContainer isActive={isActive}>
      <S.AccordHeader onClick={handleHeaderClick}>
        <S.AccordLabel>{label}</S.AccordLabel>
        <S.AccordArrow isActive={isActive} />
      </S.AccordHeader>
      <S.AccordBody
        ref={bodyRef}
        isOpen={isOpen}
        onTransitionEnd={handleTransitionEnd}
      >
        <S.AccordContent>{content}</S.AccordContent>
      </S.AccordBody>
    </S.AccordContainer>
  );
}

export default Accordion;
