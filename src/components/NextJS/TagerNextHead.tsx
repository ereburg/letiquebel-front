import React from 'react';

import Head from 'next/document';

class TagerNextHead extends Head {
  props: any;

  getCssLinks() {
    const { assetPrefix, files } = this.context._documentProps;
    const cssFiles =
      files && files.length ? files.filter((f: any) => /\.css$/.test(f)) : [];

    const cssLinkElements: JSX.Element[] = [];

    cssFiles.forEach((file: any) => {
      cssLinkElements.push(
        <link
          key={file}
          nonce={this.props.nonce}
          rel="stylesheet"
          href={`${assetPrefix}/_next/${encodeURI(file)}`}
          crossOrigin={this.props.crossOrigin}
        />
      );
    });

    return cssLinkElements.length === 0 ? null : cssLinkElements;
  }

  getPreloadMainLinks() {
    return [];
  }

  getPreloadDynamicChunks() {
    return [];
  }
}

export default TagerNextHead;
