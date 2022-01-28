import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { colors, timingFn } from '@constants/theme';

export type FilterOption = {
  label: string;
  value: number;
};

type Props = {
  onChange: (value: null | number) => void;
  itemList: Array<FilterOption>;
  placeholder: string;
};

function FilterSelect({ itemList, placeholder, onChange }: Props) {
  const [isOpen, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<null | FilterOption>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleToggleClick() {
    setOpen(!isOpen);
  }

  function handleItemClick(value: null | number) {
    const selectedItem = itemList.find((item) => item.value === value);

    if (selectedItem) setActiveItem(selectedItem);
    else setActiveItem(null);

    handleToggleClick();
    onChange(value);
  }

  function handleOutsideClick(e: MouseEvent) {
    const containerElem = containerRef.current;
    if (containerElem && !containerElem.contains(e.target as HTMLElement)) {
      setOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <SelectContainer ref={containerRef}>
      <Header isOpen={isOpen} onClick={handleToggleClick}>
        <HeaderIcon />
        <HeaderLabel>{activeItem ? activeItem.label : placeholder}</HeaderLabel>
      </Header>
      <Dropdown isOpen={isOpen}>
        <DropdownScroll>
          <DropdownList>
            <DropdownItem onClick={() => handleItemClick(null)}>
              Показать все
            </DropdownItem>
            {itemList.map((item, index) => (
              <DropdownItem
                onClick={() => handleItemClick(item.value)}
                key={index}
              >
                {item.label}
              </DropdownItem>
            ))}
          </DropdownList>
        </DropdownScroll>
      </Dropdown>
    </SelectContainer>
  );
}

export const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
  min-width: 22vw;
  max-width: 100%;

  &,
  * {
    user-select: none;
  }

  ${media.tablet(css`
    min-width: 42vw;
  `)}

  ${media.mobile(css`
    width: 100%;
  `)}
`;

export const HeaderIcon = styled.i`
  position: absolute;
  top: 50%;
  left: 1.4vw;
  transform: translateY(-50%);
  display: block;
  width: 1.1vw;
  height: 1.1vw;

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 2px;
    background-color: ${colors.black};
  }

  &:before {
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  &:after {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(90deg);
  }

  ${media.tablet(css`
    left: 2.7vw;
    width: 2.3vw;
    height: 2.3vw;
  `)}

  ${media.mobile(css`
    left: 4.4vw;
    width: 3.5vw;
    height: 3.5vw;
  `)}
`;

export const HeaderLabel = styled.span`
  font-size: 0.9vw;
  font-weight: 600;
  line-height: 4;
  text-transform: uppercase;
  letter-spacing: 0.1vw;
  color: ${colors.black};

  ${media.tablet(css`
    font-size: 2.2vw;
    line-height: 3.3;
  `)}

  ${media.mobile(css`
    font-size: 3.9vw;
    line-height: 3;
  `)}
`;

export const Header = styled.div<{ isOpen: boolean }>`
  position: relative;
  height: 3.7vw;
  padding: 0 2.2vw 0 3.7vw;
  background-color: ${colors.greyMiddle};
  cursor: pointer;

  ${(props) =>
    props.isOpen &&
    css`
      ${HeaderIcon} {
        &:after {
          display: none;
        }
      }
    `}
  
  ${media.tablet(css`
    height: 7.2vw;
    padding: 0 4.2vw 0 7vw;
  `)}

  ${media.mobile(css`
    height: 11.7vw;
    padding: 0 4.7vw 0 11.7vw;
  `)}
`;

export const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  display: none;
  width: 100%;
  background-color: ${colors.greyMiddle};
  z-index: 10;

  ${(props) =>
    props.isOpen &&
    css`
      display: block;
    `}
`;

export const DropdownScroll = styled.div`
  max-height: 350px;
  overflow-y: auto;
`;

export const DropdownList = styled.ul`
  padding: 0.7vw 0;

  ${media.tablet(css`
    padding: 2.2vw 0;
  `)}

  ${media.mobile(css`
    padding: 3.4vw 0;
  `)}
`;

export const DropdownItem = styled.li`
  padding: 0.7vw 2.2vw 0.7vw 3.7vw;
  font-size: 0.8vw;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.3px;
  color: ${colors.silver};
  cursor: pointer;
  transition: color 0.15s ${timingFn.ease};

  &:hover {
    color: ${colors.black};
  }

  ${media.tablet(css`
    padding: 2vw 4.2vw 2vw 7vw;
    font-size: 2.1vw;
  `)}

  ${media.mobile(css`
    padding: 2.2vw 4.7px 2.3vw 11.7vw;
    font-size: 3.8vw;
  `)}
`;

export default FilterSelect;
