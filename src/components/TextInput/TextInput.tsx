import React, { ReactEventHandler, useEffect, useRef, useState } from 'react';

import * as S from './TextInput.style';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  isInvalid?: boolean;
  disabled?: boolean;
  className?: string;
  onBlur?: ReactEventHandler;
};

function TextInput({
  label,
  placeholder = '',
  isInvalid,
  className,
  autoFocus,
  onBlur,
  ...rest
}: Props) {
  const [isActive, setActive] = useState(false);
  const [isFilled, setFilled] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleFocus() {
    const inputElem = inputRef.current;
    if (!inputElem) return;

    inputElem.placeholder = placeholder;
    setActive(true);
    toggleFilledState();
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const inputElem = inputRef.current;
    if (!inputElem) return;

    inputElem.removeAttribute('placeholder');
    setActive(false);
    toggleFilledState();

    onBlur && onBlur(e);
  }

  function toggleFilledState() {
    const inputElem = inputRef.current;
    if (!inputElem) return;

    if (inputElem.value !== '') setFilled(true);
    else setFilled(false);
  }

  useEffect(() => {
    toggleFilledState();

    const inputElem = inputRef.current;
    if (inputElem && autoFocus) inputElem.focus();
  }, [autoFocus]);

  return (
    <S.Container className={className}>
      <S.Input
        {...rest}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        isActive={isActive}
        isInvalid={isInvalid}
        data-invalid={isInvalid}
      />
      {label ? (
        <S.Label {...{ isActive, isFilled, isInvalid }}>{label}</S.Label>
      ) : null}
    </S.Container>
  );
}

export default TextInput;
