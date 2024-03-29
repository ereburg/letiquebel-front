import React, { ScriptHTMLAttributes } from 'react';

import { NextScript } from 'next/document';
import { notEmpty, notFalsy } from '@utils/common';

/** Reference: https://medium.com/medwing-engineering-product-design/hacking-next-js-for-better-pagespeed-scores-6c651d19f218 */
class TagerNextScript extends NextScript {
  render() {
    /** Fragment */
    const nextScriptElement = super.render();

    type ScriptProps = ScriptHTMLAttributes<HTMLScriptElement>;
    type ScriptElement = React.ReactElement<ScriptProps>;

    const orgNextScripts: Array<ScriptElement | null> = nextScriptElement
      ? nextScriptElement.props.children.flat()
      : [];

    const scripts = orgNextScripts.filter(notFalsy).map((child) => {
      if (child.props.id === '__NEXT_DATA__') {
        return {
          props: { ...child.props },
          content: child.props.dangerouslySetInnerHTML?.__html,
        };
      }

      if (child.type === 'script') {
        return {
          props: { ...child.props },
          content: '',
        };
      }

      return null;
    });

    function isNextChunk(props: ScriptProps): boolean {
      return Boolean(props.src?.includes('chunk'));
    }
    const initialLoadScripts = scripts
      .filter(notEmpty)
      .filter(({ props }) => !isNextChunk(props));

    const chunkedScripts = scripts
      .filter(notEmpty)
      .filter(({ props }) => isNextChunk(props));

    const jsContent = `
      var chunkedScripts = ${JSON.stringify(chunkedScripts)};
        chunkedScripts.map((script) => {
          if (!script || !script.props) return;
          try {
            var scriptTag = document.createElement('script');
  
            scriptTag.src = script.props.src;
            scriptTag.async = script.props.async;
            scriptTag.defer = script.props.defer;
            
            if (script.props.id) scriptTag.id = script.props.id;
            if (script.content) scriptTag.innerHTML = script.content;
            document.body.appendChild(scriptTag);
          }
          catch(err) {
            console.log(err);
          }
        });
    `;

    return (
      <>
        {initialLoadScripts.map(({ props }) => (
          <script key={props.id} {...props} src={props.src} />
        ))}

        <script
          id="__NEXT_SCRIPT_CUSTOM"
          defer
          dangerouslySetInnerHTML={{ __html: jsContent }}
        />
      </>
    );
  }
}

export default TagerNextScript;
