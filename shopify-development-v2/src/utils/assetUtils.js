// We can use "process.env.VAR_NAME" on both the server and the client.
// See config/env.js and server/indexHtml.js

// const ImageUrl = "http://dqwpk0oa16wlh.cloudfront.net";
// export function imagePath(assetName) {
//   return `${ImageUrl}/${assetName}`;
// }

export function imagePath(assetName) {
  return `${process.env.PUBLIC_URL}/images/${assetName}`;
}

export function homesliderImagePath(assetName) {
  return `${process.env.PUBLIC_URL}/images/home-slider/${assetName}`;
}

export function clientcarouselImagePath(assetName) {
  return `${process.env.PUBLIC_URL}/images/client-slider/${assetName}`;
}

export function clienttestimonialsImagePath(assetName) {
  return `${process.env.PUBLIC_URL}/images/client-testimonials/${assetName}`;
}

export function servicesImagePath(assetName) {
  return `${process.env.PUBLIC_URL}/images/services/${assetName}`;
}

export function upgradeImagePath(assetName) {
  return `${process.env.PUBLIC_URL}/images/upgrade/${assetName}`;
}

export function aboutImagePath(assetName) {
  return `${process.env.PUBLIC_URL}/images/aboutus/${assetName}`;
}

export function workImagePath(assetName) {
  return `${process.env.PUBLIC_URL}/images/work/${assetName}`;
}
