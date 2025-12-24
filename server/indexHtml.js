import { getAppEnv } from "../config/env";

const env = getAppEnv();
const { NODE_ENV, PUBLIC_URL = "" } = env.raw;

let assetManifest;
if (NODE_ENV === "production") {
  assetManifest = require("../build/asset-manifest.json");
} else {
  assetManifest = {
    "main.js": "/main.bundle.js"
  };
}

const prefetchStyleLinks = bundles => {
  if (NODE_ENV !== "production") {
    return "";
  }

  const assetFilePaths = Object.keys(assetManifest)
    .filter(
      file =>
        file !== "main.css" &&
        file.match(/\.css$/) &&
        !bundles.find(b => b.publicPath === assetManifest[file])
    )
    .map(cssFile => `${PUBLIC_URL}${assetManifest[cssFile]}`);

  return assetFilePaths
    .map(
      cssFilePath => `<link rel="prefetch" as="style" href="${cssFilePath}">`
    )
    .join("");
};

const cssLinks = bundles => {
  if (NODE_ENV !== "production") {
    return "";
  }

  const mainCSS = assetManifest["main.css"];
  const bundleFilePaths = bundles
    .filter(bundle => bundle.file.match(/\.css$/))
    .map(cssBundle => `${PUBLIC_URL}/${cssBundle.file}`);

  return [mainCSS, ...bundleFilePaths]
    .map(cssFilePath => `<link rel="stylesheet" href="${cssFilePath}">`)
    .join("");
};

const preloadScripts = bundles => {
  const mainJS = assetManifest["main.js"];
  const bundleFilePaths = bundles
    .filter(bundle => bundle.file.match(/\.js$/))
    .map(jsBundle => `${PUBLIC_URL}/${jsBundle.file}`);

  return [...bundleFilePaths, mainJS]
    .map(jsFilePath => `<link rel="preload" as="script" href="${jsFilePath}">`)
    .join("");
};

const jsScripts = bundles => {
  const mainJS = assetManifest["main.js"];
  const bundleFilePaths = bundles
    .filter(bundle => bundle.file.match(/\.js$/))
    .map(jsBundle => `${PUBLIC_URL}/${jsBundle.file}`);

  return [...bundleFilePaths, mainJS]
    .map(
      jsFilePath =>
        `<script type="text/javascript" src="${jsFilePath}" defer></script>`
    )
    .join("");
};

export const indexHtml = ({ helmet, serverData, markup, bundles }) => {
  const htmlAttrs = helmet.htmlAttributes.toString();
  const bodyAttrs = helmet.bodyAttributes.toString();
  return `
    <!doctype html>
    <html lang="en" ${htmlAttrs}>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}

        ${preloadScripts(bundles)}
        ${prefetchStyleLinks(bundles)}
        ${helmet.link.toString()}
        ${cssLinks(bundles)}
        ${helmet.style.toString()}

        ${helmet.noscript.toString()}
        ${helmet.script.toString()}
        ${jsScripts(bundles)}
        <style>
        .loader {
          position: fixed;
          height: 100vh;
          width: 100vw;
          top: 0;
          left: 0;
          background: #fff;
          z-index: 115;
          transition: opacity 0.3s;

        }
        .spinner {
          position: absolute;
          top: calc(50%);
          left: calc(50%);
          width: 6em;
          height: 6em;
          border: 1.1em solid rgba(0, 0, 0, 0.2);
          border-left: 1.1em solid #000000;
          border-radius: 50%;
          animation: load8 1.1s infinite linear;
        }
        .loader--hide .spinner-2 {
          opacity: 0;
          top: calc(50% - 20em);
          transition: all 2s linear;
        }
        .loader--hide {
          height: 100vh;
          overflow: hidden;
          animation: slide 1s ease 1s forwards;

        }
        @keyframes slide {
          from {height: 100vh;}
          to {height: 0;}
        }
        @keyframes load8 {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        
        .spinner-2 {
          border: 16px solid #90c64e;
          border-radius: 50%;
          border-top: 16px solid #4dc0ea;
          border-bottom: 16px solid #4dc0ea;
          width: 6em;
          height: 6em;
          -webkit-animation: spin 2s linear infinite;
          animation: spin 2s linear infinite;
          position: absolute;
          top: calc(50% - 4em);
          left: calc(50% - 4em);
          opacity: 1;
        }
        
        @-webkit-keyframes spin {
          0% { -webkit-transform: rotate(0deg); }
          100% { -webkit-transform: rotate(360deg); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .loader-sqr {
          position: relative;
            border: 1px solid;
            display: flex;
            align-items: center;
             width: 150px;
             height: 150px;
             justify-content:center;
             margin: auto;
            
        }
        .loader-sqr .text {
          font-size: 3em;
        }
        </style>

      </head>
      <body ${bodyAttrs}>
        <div id="root">${markup}</div>
        <div class="loader">
          <div class="spinner-2"></div>
        </div>
      </body>
    </html>
  `;
};
{
  /* <script>
          window.process = ${env.forIndexHtml};
          window.__SERVER_DATA__ = ${JSON.stringify(serverData)}
          window.__ASSET_MANIFEST__ = ${JSON.stringify(assetManifest)}
        </script> */
}
