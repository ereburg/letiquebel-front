import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '@store/reducers';

import { isPromoTime, updateLastViewDate } from './PromoPreview.helpers';

import PopupModal from '@components/Modal/Popup';

function PromoPreview() {
  const [isVisible, setVisible] = useState(false);

  const { data } = useSelector((state: RootState) => state.promo);

  function handleClickModalToggle() {
    setVisible(false);
  }

  useEffect(() => {
    if (!data?.url) return;
    if (!isPromoTime()) return;
    updateLastViewDate(Date.now());
    setVisible(true);
  }, [data]);

  return isVisible ? (
    <PopupModal disableWrapper onClose={handleClickModalToggle}>
      <Container>
        <img src={data.url} />
      </Container>
    </PopupModal>
  ) : null;
}

export const Container = styled.div`
  background: #ffffff;

  img {
    max-height: calc(100vh - 20px);
  }
`;

export default PromoPreview;
