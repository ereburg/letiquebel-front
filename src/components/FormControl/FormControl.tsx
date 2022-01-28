import React from 'react';
import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { colors } from '@constants/theme';

type Props = {
  className?: string;
  children: React.ReactNode;
  error?: string | boolean;
};

function FormControl({ children, error, ...props }: Props) {
  return (
    <ControlContainer {...props}>
      {children}
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
    </ControlContainer>
  );
}

const ControlContainer = styled.div``;

const ErrorMessage = styled.span`
  display: block;
  max-width: 100%;
  font-size: 0.6vw;
  line-height: 1.3;
  color: ${colors.red};
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 3px;

  ${media.mobile(css`
    font-size: 1.6vw;
  `)}

  ${media.mobileL(css`
    font-size: 2.4vw;
  `)}
`;

export default FormControl;
