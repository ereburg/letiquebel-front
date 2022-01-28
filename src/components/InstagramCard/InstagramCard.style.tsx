import styled, { css } from 'styled-components';

import { media, objectFit } from '@utils/mixin';
import { colors } from '@constants/theme';

import IGIcon from '@assets/images/icons/ig.png';
import LikeIcon from '@assets/images/icons/like.png';
import CommentIcon from '@assets/images/icons/comment.png';
import BookmarkIcon from '@assets/images/icons/bookmark.png';

export const Container = styled.a`
  display: block;
  border-radius: 0.4vw;
  overflow: hidden;

  ${media.mobile(css`
    border-radius: 2vw;
  `)}
`;

export const ImageWarp = styled.div`
  position: relative;

  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 0;
    padding-top: 115%;
  }

  &:after {
    content: '';
    position: absolute;
    top: 1.3vw;
    right: 1.3vw;
    width: 1vw;
    height: 1vw;
    background: url("${IGIcon}") no-repeat center / contain;
    
    ${media.tablet(css`
      top: 2.5vw;
      right: 2.5vw;
      width: 2vw;
      height: 2vw;
    `)}
    
    ${media.mobile(css`
      top: 4.7vw;
      right: 4.7vw;
      width: 4vw;
      height: 4vw;
    `)}
  }
`;

export const ImageElem = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  ${objectFit('cover')};
`;

export const Author = styled.div`
  position: absolute;
  left: 0.7vw;
  right: 0.7vw;
  bottom: 0.7vw;
  display: flex;
  align-items: center;
  max-width: calc(100% - 1.4vw);

  ${media.tablet(css`
    left: 1.7vw;
    right: 1.7vw;
    bottom: 1.7vw;
  `)}

  ${media.mobile(css`
    left: 3.2vw;
    right: 3.2vw;
    bottom: 3.2vw;
  `)}
`;

export const AuthorPhoto = styled.img`
  flex-shrink: 0;
  width: 3.7vw;
  height: 3.7vw;
  margin-right: 1vw;
  border-radius: 50%;

  ${media.tablet(css`
    width: 4.8vw;
    height: 4.8vw;
  `)}

  ${media.mobile(css`
    width: 13.6vw;
    height: 13.6vw;
    margin-right: 3.2vw;
  `)}
`;

export const AuthorName = styled.span`
  max-width: calc(100% - 4.7vw);
  font-size: 1vw;
  font-weight: 700;
  color: ${colors.white};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  ${media.tablet(css`
    max-width: calc(100% - 6.8vw);
    font-size: 1.6vw;
  `)}

  ${media.mobile(css`
    max-width: calc(100% - 15.8vw);
    font-size: 3.8vw;
  `)}
`;

export const Content = styled.div`
  padding: 1.1vw 1.1vw 2.1vw;
  background-color: ${colors.white};

  ${media.tablet(css`
    padding: 1.7vw 1.7vw 2.7vw;
  `)}

  ${media.mobile(css`
    padding: 3.5vw 3.5vw 4.5vw;
  `)}
`;

export const OptionList = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.9vw;

  ${media.tablet(css`
    margin-bottom: 1.5vw;
  `)}

  ${media.mobile(css`
    margin-bottom: 2.1vw;
  `)}
  
  ${media.mobileL(css`
    margin-bottom: 3.5vw;
  `)}
`;

const OptionItem = css`
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;

  &:not(:last-child) {
    margin-right: 1vw;
  }

  ${media.tablet(css`
    &:not(:last-child) {
      margin-right: 2vw;
    }
  `)}

  ${media.mobile(css`
    &:not(:last-child) {
      margin-right: 3vw;
    }
  `)}
`;

export const Like = styled.i`
  ${OptionItem};
  width: 1.6vw;
  height: 1.4vw;
  background-image: url("${LikeIcon}");
  
  ${media.tablet(css`
    width: 2.3vw;
    height: 2.1vw;
  `)}
  
  ${media.mobile(css`
    width: 4.4vw;
    height: 4.2vw;
  `)}
  
  ${media.mobileL(css`
    width: 5.4vw;
    height: 5.2vw;
  `)}
`;

export const Comment = styled.i`
  ${OptionItem};
  width: 1.5vw;
  height: 1.4vw;
  background-image: url("${CommentIcon}");
  
    
  ${media.tablet(css`
    width: 2.2vw;
    height: 2.1vw;
  `)}
  
  ${media.mobile(css`
    width: 4.3vw;
    height: 4.2vw;
  `)}
  
  ${media.mobileL(css`
    width: 5.3vw;
    height: 5.2vw;
  `)}
`;

export const Bookmark = styled.i`
  ${OptionItem};
  width: 1.2vw;
  height: 1.4vw;
  margin-left: auto;
  background-image: url("${BookmarkIcon}");
  
    
  ${media.tablet(css`
    width: 1.9vw;
    height: 2.1vw;
  `)}
  
  ${media.mobile(css`
    width: 4vw;
    height: 4.2vw;
  `)}
  
  ${media.mobileL(css`
    width: 5vw;
    height: 5.2vw;
  `)}
`;

export const LikeCounter = styled.span`
  display: block;
  margin-bottom: 1.5vw;
  font-size: 0.85vw;
  line-height: 1.1vw;
  color: ${colors.black};

  ${media.tablet(css`
    margin-bottom: 2vw;
    font-size: 1.45vw;
    line-height: 1.3vw;
  `)}

  ${media.mobile(css`
    margin-bottom: 2.5vw;
    font-size: 2.55vw;
    line-height: 1.7vw;
  `)}
  
  ${media.mobileL(css`
    margin-bottom: 3.5vw;
    font-size: 3.35vw;
  `)}
`;

export const Descript = styled.p`
  font-size: 0.95vw;
  line-height: 1.5vw;
  color: ${colors.silver};

  ${media.tablet(css`
    font-size: 1.6vw;
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
