import React from 'react';

import { convertSrcSet, getImageTypeFromUrl } from '@utils/common';
import { breakpoints } from '@constants/theme';

type MediaQueryType =
  | 'mobileSmall'
  | 'mobileMedium'
  | 'mobileLarge'
  | 'tablet'
  | 'laptop'
  | 'desktop';

const MEDIA_QUERY_MAP: Record<MediaQueryType, string | undefined> = {
  mobileSmall: `(min-width: ${breakpoints.mobileS}px)`,
  mobileMedium: `(min-width: ${breakpoints.mobileM}px)`,
  mobileLarge: `(min-width: ${breakpoints.mobileL}px)`,
  tablet: `(min-width: ${breakpoints.tablet}px)`,
  laptop: `(min-width: ${breakpoints.laptop}px)`,
  desktop: `(min-width: ${breakpoints.desktop}px)`,
};

type ImageSource = Omit<
  React.SourceHTMLAttributes<HTMLSourceElement>,
  'srcSet'
> & {
  srcSet: Array<string>;
};

function Source({ srcSet, type, ...rest }: ImageSource) {
  return (
    <source
      srcSet={convertSrcSet(srcSet)}
      type={type ?? getImageTypeFromUrl(srcSet[0]) ?? undefined}
      {...rest}
    />
  );
}

type ImageType = {
  imageWebp?: Array<string> | string;
  image?: Array<string> | string;
  src?: string;
  src2x?: string;
  webp?: string;
  webp2x?: string;
};

type GroupProps = {
  media?: string;
  images?: ImageType;
};

function SourceGroup({ media, images }: GroupProps) {
  if (!images) return null;

  const { src, src2x, webp, webp2x } = images;

  if (!src && !webp) {
    return null;
  }

  return (
    <>
      {webp && webp2x ? (
        <Source srcSet={[webp, webp2x]} media={media} type="image/webp" />
      ) : webp ? (
        <Source srcSet={[webp]} media={media} type="image/webp" />
      ) : null}

      {src && src2x ? (
        <Source srcSet={[src, src2x]} media={media} />
      ) : src ? (
        <Source srcSet={[src]} media={media} />
      ) : null}
    </>
  );
}

export type Props = {
  mobileSmall?: ImageType;
  mobileMedium?: ImageType;
  mobileLarge?: ImageType;
  tablet?: ImageType;
  laptop?: ImageType;
  desktop?: ImageType;
  srcSet?: ImageType;
  src?: string;
  src2x?: string;
  srcWebp?: string;
  srcWebp2x?: string;
  alt?: string;
};

function Picture({
  mobileSmall,
  mobileMedium,
  mobileLarge,
  tablet,
  laptop,
  desktop,
  src,
  src2x,
  srcWebp,
  srcWebp2x,
  alt,
}: Props) {
  return (
    <picture>
      {desktop ? (
        <SourceGroup media={MEDIA_QUERY_MAP.desktop} images={desktop} />
      ) : null}
      {laptop ? (
        <SourceGroup media={MEDIA_QUERY_MAP.laptop} images={laptop} />
      ) : null}
      {tablet ? (
        <SourceGroup media={MEDIA_QUERY_MAP.tablet} images={tablet} />
      ) : null}
      {mobileLarge ? (
        <SourceGroup media={MEDIA_QUERY_MAP.mobileLarge} images={mobileLarge} />
      ) : null}
      {mobileMedium ? (
        <SourceGroup
          media={MEDIA_QUERY_MAP.mobileMedium}
          images={mobileMedium}
        />
      ) : null}
      {mobileSmall ? (
        <SourceGroup media={MEDIA_QUERY_MAP.mobileSmall} images={mobileSmall} />
      ) : null}
      {src2x || srcWebp || srcWebp2x ? (
        <SourceGroup
          images={{
            src: src,
            src2x: src2x,
            webp: srcWebp,
            webp2x: srcWebp2x,
          }}
        />
      ) : null}
      <img src={src} alt={alt} />
    </picture>
  );
}

export default Picture;
