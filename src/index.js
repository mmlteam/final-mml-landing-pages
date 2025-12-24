if (browserSupportsAllFeatures()) {
  preloader();
  runMain();
} else {
  loadScript(window.__ASSET_MANIFEST__["polyfills.js"], runMain);
}

function runMain() {
  const { main } = require("./main");
  main();
}

function browserSupportsAllFeatures() {
  return window.Promise && Object.assign;
}

function loadScript(src, done) {
  const script = document.createElement("script");

  script.src = src;
  script.onload = () => {
    done();
  };
  script.onerror = () => {
    done(new Error("Failed to load script " + src));
  };

  document.head.appendChild(script);
}

function preloader() {
  const loader = document.querySelector(".loader");
  const showLoader = () => loader.classList.remove("loader--hide");
  const hideLoader = () => loader.classList.add("loader--hide");
  showLoader();
  setTimeout(() => hideLoader(), 300);
}
