import { JSDOM } from "jsdom";

function normalizeURL(url) {
  const urlObj = new URL(url);
  const hostname = urlObj.hostname;
  let path = urlObj.pathname;

  if (path.length > 0 && path.slice(-1) === "/") {
    path = path.slice(0, -1);
  }

  const normalized = hostname + path;
  return normalized;
}

function getURLsFromHTML(htmlBody, baseURL) {
  let foundURLs = [];
  const dom = new JSDOM(htmlBody);
  const anchors = dom.window.document.querySelectorAll("a");

  for (let anchor of anchors) {
    if (anchor.href) {
      let href = anchor.href;
      href = new URL(href, baseURL).href;
      foundURLs.push(href);
    }
  }

  return foundURLs;
}

export { normalizeURL, getURLsFromHTML };
