import React, { ReactEventHandler, useEffect, useRef, useState } from 'react';

import * as S from './Select.style';

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  placeholder?: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  isInvalid?: boolean;
  onBlur?: ReactEventHandler;
};

function Select({
  label,
  placeholder,
  options,
  isInvalid,
  onBlur,
  ...rest
}: Props) {
  const [isActive, setActive] = useState(false);
  const [isFilled, setFilled] = useState(false);

  const selectRef = useRef<HTMLSelectElement>(null);

  function handleFocus() {
    setActive(true);
    toggleFilledState();
  }

  function handleBlur(e: React.FocusEvent<HTMLSelectElement>) {
    setActive(false);
    toggleFilledState();

    onBlur && onBlur(e);
  }

  function toggleFilledState() {
    const selectElem = selectRef.current;
    if (!selectElem) return;

    if (selectElem.value !== undefined) setFilled(true);
    else setFilled(false);
  }

  useEffect(() => {
    toggleFilledState();
  }, []);

  return (
    <S.SelectContainer>
      <S.Select
        {...rest}
        ref={selectRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        isActive={isActive}
        isInvalid={isInvalid}
        data-invalid={isInvalid}
      >
        {placeholder !== undefined ? (
          <option value="" hidden disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </S.Select>
      {label ? (
        <S.Label {...{ isActive, isFilled, isInvalid }}>{label}</S.Label>
      ) : null}
      <S.Arrow isActive={isActive} />
    </S.SelectContainer>
  );
}

export default Select;
