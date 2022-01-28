import React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { colors, timingFn } from '@constants/theme';

import { ProductPackage } from '@typings/models';

import { RootState } from '@store/reducers';

type Props = {
  data: ProductPackage;
  isActive: boolean;
  onClick: () => void;
};

function PackagePreview({ data, isActive, onClick }: Props) {
  const { currency } = useSelector(
    (state: RootState) => state.globalParams.data
  );

  return (
    <PackageContainer isActive={isActive} onClick={onClick}>
      <PackageImageWrap>
        <PackageImage src={data.file?.url} alt={data.title} />
      </PackageImageWrap>
      <PackageDetails>
        <PackageTitle>{data.title}</PackageTitle>
        <PackagePrice>
          {data.price} {currency}
        </PackagePrice>
      </PackageDetails>
    </PackageContainer>
  );
}

const PackageContainer = styled.figure<{ isActive: boolean }>`
  min-height: 21vw;
  border: 2px solid ${colors.greyMiddle};
  transition: border-color 0.3s ${timingFn.ease};
  cursor: pointer;

  &:hover {
    border-color: ${colors.accent};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      border-color: ${colors.accent};
    `}
`;

const PackageImageWrap = styled.div`
  padding-top: 2vw;
  margin-bottom: 0.5vw;

  ${media.mobile(css`
    padding-top: 4vw;
    margin-bottom: 0;
  `)}
`;

const PackageImage = styled.img`
  width: 19vw;
  max-width: 87%;
  margin-left: auto;

  ${media.mobile(css`
    width: 94vw;
  `)}
`;

const PackageDetails = styled.div`
  padding: 0 0.7vw 1.2vw;
  margin-top: -1vw;
  text-align: center;

  ${media.mobile(css`
    padding: 0 1.4vw 5.9vw;
    margin-top: -6.5vw;
  `)}
`;

const PackageTitle = styled.span`
  display: block;
  margin-bottom: 0.7vw;
  font-size: 1.1vw;
  color: ${colors.silver};

  ${media.mobile(css`
    margin-bottom: 1.6vw;
    font-size: 3.6vw;
  `)}

  ${media.mobileL(css`
    font-size: 3.9vw;
  `)}
`;

const PackagePrice = styled.span`
  font-size: 1vw;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${colors.delta};

  ${media.mobile(css`
    font-size: 3.3vw;
  `)}

  ${media.mobileL(css`
    font-size: 3.6vw;
  `)}
`;

export default PackagePreview;
