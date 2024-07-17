import { JSDOM } from "jsdom";
import { ensureProtocol, urlObject } from "./utils.js";

function normalizeURL(url) {
  const urlObj = urlObject(url)
  const hostname = urlObj.hostname;
  let path = urlObj.pathname;

  if (path.length > 0 && path.slice(-1) === "/") {
    path = path.slice(0, -1);
  }

  const normalized = hostname + path;
  return normalized
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

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  currentURL = ensureProtocol(currentURL)
  baseURL = ensureProtocol(baseURL)

  const currentURLObj = urlObject(currentURL)
  const baseURLObj = urlObject(baseURL)
  if (baseURLObj.hostname != currentURLObj.hostname) {
    return pages;
  }

  const normalizedURL = normalizeURL(currentURL);

  if (pages[normalizedURL] > 0) {
    pages[normalizedURL] += 1;
    return pages;
  }
  pages[normalizedURL] = 1;

  console.log(`crawling: ${currentURL}`)
  let htmlBody = "";
  try {
    htmlBody = await fetchHTML(currentURL);
  } catch (err) {
    console.log(`Error in the fetchHTML:  ${err.message}`);
    return pages;
  }

  let nextURLs = getURLsFromHTML(htmlBody, baseURL);

  for (const nextURL of nextURLs) {
    // console.log(nextURLs);
    pages = await crawlPage(baseURL, nextURL, pages);
  }
  return pages;
}

async function fetchHTML(url) {
  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    throw new Error(`got network error: ${err.message}`);
  }
  if (res.status > 399) {
    throw new Error(`got http error: ${res.status} ${res.statusText}`);
  }

  const contentType = res.headers.get("Content-Type");
  if (!contentType || !contentType.includes("text/html")) {
    throw new Error(`got non-html resoponse: ${contentType}`);
  }

  return res.text();
}

export { normalizeURL, getURLsFromHTML, crawlPage };
