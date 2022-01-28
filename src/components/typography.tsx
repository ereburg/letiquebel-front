import styled, { css } from 'styled-components';

import { media } from '@utils/mixin';
import { colors } from '@constants/theme';

export const PageTitle = styled.h1`
  margin: 0 auto 5vw;
  font-size: 3.38vw;
  font-weight: 800;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.5vw;
  text-align: center;

  & + * {
    margin-top: 0;
  }

  ${media.tablet(css`
    font-size: 4.8vw;
    letter-spacing: 0.6vw;
  `)}

  ${media.mobile(css`
    margin-bottom: 9vw;
    font-size: 7.2vw;
    letter-spacing: 1vw;
  `)}
`;

export const SectionTitle = styled.h2<{ variant?: string; gutter?: string }>`
  margin-bottom: 4vw;
  font-size: 2.2vw;
  font-weight: 600;
  line-height: 1.5;
  text-transform: uppercase;
  letter-spacing: 0.3vw;
  text-align: center;
  
  img {
    width: 7vw;
    margin: 0 auto 2vw;
  }

  ${media.tablet(css`
    margin-bottom: 5vw;
    font-size: 3vw;
    letter-spacing: 0.45vw;

    img {
      width: 10vw;
      margin-bottom: 3vw;
    }
  `)}

  ${media.mobile(css`
    margin-bottom: 6vw;
    font-size: 5.6vw;
    letter-spacing: 0.6vw;

    img {
      width: 14vw;
      margin-bottom: 4vw;
    }
  `)}
  
   ${media.mobileM(css`
     margin-bottom: 7vw;

     img {
       width: 18vw;
       margin-bottom: 5vw;
     }
   `)}
   
   ${({ variant }) =>
     variant === 'accent' &&
     css`
       font-size: 1.7vw;
       font-weight: 800;
       letter-spacing: 0.2vw;
       color: ${colors.accent};

       ${media.tablet(css`
         font-size: 2.5vw;
         letter-spacing: 0.35vw;
       `)}

       ${media.mobile(css`
         font-size: 5vw;
         letter-spacing: 0.5vw;
       `)}
     `}
   
   ${({ gutter }) =>
     gutter === 'small' &&
     css`
     margin-bottom: 2vw;
     
     ${media.tablet(css`
       margin-bottom: 3vw;
     `)}

     ${media.mobile(css`
       margin-bottom: 4vw;
     `)}
  
      ${media.mobileM(css`
        margin-bottom: 5vw;
      `)}
   `}
`;

export const contentTitleCss = css`
  font-size: 1.2vw;
  font-weight: 700;
  letter-spacing: 0.14vw;
  text-transform: uppercase;

  ${media.tablet(css`
    font-size: 2.1vw;
  `)}

  ${media.mobile(css`
    font-size: 3.8vw;
    letter-spacing: 0.3vw;
  `)}
  
   ${media.mobileL(css`
     font-size: 4.2vw;
   `)}
`;

export const textCss = css`
  font-size: 1.1vw;
  line-height: 1.6;
  color: ${colors.silver};
  
  a {
    font-weight: 600;
    color: ${colors.accent}
  }
  
  ${media.tablet(css`
    font-size: 1.85vw;
    line-height: 1.4;
  `)}

  ${media.mobile(css`
    font-size: 3.5vw;
    line-height: 1.5;
  `)}

  ${media.mobileL(css`
    font-size: 3.9vw;
  `)}
`;

export const Text = styled.p<{ align?: string }>`
  ${textCss};

  a {
    white-space: nowrap;
  }

  ${({ align }) =>
    align === 'center' &&
    css`
      text-align: center;
    `}

  ${({ align }) =>
    align === 'right' &&
    css`
      text-align: right;
    `}
`;
