import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { FormikProps } from 'formik';

import { ProductPackage } from '@typings/models';
import { RootState } from '@store/reducers';

import { media } from '@utils/mixin';

import { Text } from '@components/typography';

import PackagePreview from './PackagePreview';
import SummaryPanel from './SummaryPanel';

type Props = {
  orderState: FormikProps<any>;
  totalPrice: number;
  packageList: Array<ProductPackage>;
  handleNextStepClick: () => void;
};

function Packages({
  orderState,
  totalPrice,
  packageList,
  handleNextStepClick,
}: Props) {
  const { currency } = useSelector(
    (state: RootState) => state.globalParams.data
  );

  packageList.sort((a, b) => a.freeFrom - b.freeFrom);
  const premiumPackage = packageList.find((item) => item.freeFrom !== 0);
  const resultPackageList = packageList.map((item) =>
    item.freeFrom <= totalPrice ? { ...item, price: 0 } : item
  );

  const activePackage =
    resultPackageList.find(
      (packageItem) => packageItem.id === orderState.values.wrap.id
    ) || resultPackageList[0];
  const resultTotalPrice = activePackage.price + totalPrice;

  function onChangePackageType(id: number, price: number) {
    orderState.setFieldValue('wrap.id', id);
    orderState.setFieldValue('wrap.price', price);
  }

  return (
    <PackagesContainer>
      {premiumPackage ? (
        <HintMessage align="center">
          {premiumPackage.freeFrom > totalPrice
            ? `Подарочная упаковка бесплатно при заказе от ${premiumPackage.freeFrom} ${currency}`
            : 'Для вас доступна подарочная коробка бесплатно'}
        </HintMessage>
      ) : null}
      <GridContainer>
        {resultPackageList.map((item, index) => (
          <GridItem key={index}>
            <PackagePreview
              isActive={item.id === activePackage.id}
              onClick={() => onChangePackageType(item.id, item.price)}
              data={item}
            />
          </GridItem>
        ))}
      </GridContainer>
      <SummaryContainer
        extraPriceLabel="Коробка"
        actionButtonLabel="Продолжить"
        extraPriceValue={activePackage.price}
        totalPrice={resultTotalPrice}
        actionButtonHandler={handleNextStepClick}
      />
    </PackagesContainer>
  );
}

const PackagesContainer = styled.div`
  &,
  * {
    user-select: none;
  }
`;

const HintMessage = styled(Text)`
  max-width: 80%;
  margin: 0 auto 2.6vw;

  ${media.mobile(css`
    margin-bottom: 4.5vw;
  `)}
`;

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 -10px;
`;

const GridItem = styled.div`
  flex: 1 1 25%;
  max-width: 25%;
  padding: 0 10px;

  &:not(:nth-child(-n + 4)) {
    margin-top: 20px;
  }

  ${media.mobile(css`
    flex-basis: auto;
    max-width: 100%;
    margin: 0 auto;

    &:not(:first-child) {
      margin-top: 3vw;
    }
  `)}
`;

const SummaryContainer = styled(SummaryPanel)`
  width: 100%;
  margin-top: 4.5vw;

  ${media.mobile(css`
    margin-top: 6.6vw;
  `)}
`;

export default Packages;
