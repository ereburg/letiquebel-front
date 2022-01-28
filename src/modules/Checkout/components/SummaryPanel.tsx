import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';

import { RootState } from '@store/reducers';

import { media } from '@utils/mixin';
import { colors } from '@constants/theme';

import Button from '@components/Button';

type Props = {
  className?: string;
  variant?: string;
  extraPriceLabel?: string;
  extraPriceValue?: number;
  totalPrice?: number;
  actionButtonLabel?: string;
  actionButtonHandler?: () => void;
  checkoutState?: string;
};

function SummaryPanel({
  variant,
  extraPriceLabel,
  extraPriceValue,
  totalPrice,
  actionButtonLabel,
  actionButtonHandler,
  checkoutState,
  ...props
}: Props) {
  const { currency } = useSelector(
    (state: RootState) => state.globalParams.data
  );

  return (
    <SummaryContainer variant={variant} {...props}>
      {extraPriceLabel && (
        <SummaryPriceCell>
          <PackagePriceLabel>{extraPriceLabel}:</PackagePriceLabel>
          <PackagePriceValue>
            {extraPriceValue} {currency}
          </PackagePriceValue>
        </SummaryPriceCell>
      )}

      <SummaryPriceCell>
        <TotalPriceLabel>Итого:</TotalPriceLabel>
        <TotalPriceValue>
          {totalPrice} {currency}
        </TotalPriceValue>
      </SummaryPriceCell>

      <SummaryButtonCell>
        {checkoutState !== 'IN_PROGRESS' ? (
          <SummaryButton variant="containedBig" onClick={actionButtonHandler}>
            {actionButtonLabel}
          </SummaryButton>
        ) : (
          <SummaryButton variant="containedBigLoading">
            <span />
          </SummaryButton>
        )}
      </SummaryButtonCell>
    </SummaryContainer>
  );
}

const SummaryContainer = styled.div<{ variant?: string }>`
  display: flex;
  align-items: center;
  width: 64%;
  margin-left: auto;
  padding-top: 3.5vw;
  border-top: 0.15vw solid ${colors.black};

  ${media.mobile(css`
    flex-direction: column;
    justify-content: flex-start;
    width: auto;
    padding-top: 6.6vw;
  `)}

  ${({ variant }) =>
    variant === 'vertical' &&
    css`
      flex-direction: column;
      justify-content: flex-start;
      padding-top: 3vw;

      ${SummaryPriceCell} {
        &:not(:first-child) {
          margin-top: 1.3vw;
        }

        ${media.mobile(css`
          &:not(:first-child) {
            margin-top: 2.9vw;
          }
        `)}
      }

      ${SummaryButtonCell} {
        margin-top: 2.1vw;

        ${media.mobile(css`
          margin-top: 4.9vw;
        `)}
      }

      ${SummaryButton} {
        width: 30vw;

        ${media.tablet(css`
          width: 35vw;
        `)}

        ${media.mobile(css`
          width: 65vw;
        `)}
      }
    `}
`;

const summaryCellCss = css`
  flex: 1;
  text-align: center;

  &:first-child {
    text-align: left;
  }

  &:last-child {
    text-align: right;
  }
`;

const SummaryPriceCell = styled.div`
  ${summaryCellCss};

  ${media.mobile(css`
    &:not(:first-child) {
      margin-top: 2.9vw;
    }
  `)}
`;

const priceLabelCss = css`
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.12vw;
  text-transform: uppercase;

  ${media.mobile(css`
    letter-spacing: 0.3vw;
  `)}
`;

const TotalPriceLabel = styled.span`
  ${priceLabelCss};
  font-size: 1vw;

  ${media.mobile(css`
    font-size: 3vw;
  `)}
`;

const PackagePriceLabel = styled.span`
  ${priceLabelCss};
  font-size: 0.8vw;

  ${media.mobile(css`
    font-size: 2.5vw;
  `)}
`;

const priceValueCss = css`
  letter-spacing: 0.2vw;
  margin-left: 1.8vw;
  text-transform: uppercase;

  ${media.mobile(css`
    letter-spacing: 0.6vw;
  `)}
`;

const TotalPriceValue = styled.span`
  ${priceValueCss};
  font-size: 1.8vw;

  ${media.mobile(css`
    font-size: 5vw;
  `)}
`;

const PackagePriceValue = styled.span`
  ${priceValueCss};
  font-size: 1.2vw;

  ${media.mobile(css`
    font-size: 4.5vw;
  `)}
`;

const SummaryButtonCell = styled.div`
  ${summaryCellCss};

  ${media.mobile(css`
    margin-top: 4.9vw;
  `)}
`;

const SummaryButton = styled(Button)`
  width: 20vw;
  font-size: 1.3vw;
  
  ${media.tablet(css`
    width: 25vw;
  `)}

  ${media.mobile(css`
    width: 55vw;
    font-size: 3.1vw;
  `)}

  ${media.mobileL(css`
    font-size: 3.6vw;
  `)}
  
   ${media.mobileM(css`
     font-size: 4vw;
   `)}
   
   ${media.mobileS(css`
     font-size: 4.4vw;
   `)}
`;

export default SummaryPanel;
