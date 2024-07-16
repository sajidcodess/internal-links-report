import { normalizeURL, getURLsFromHTML } from "./crawl.js";
import { test, expect } from "@jest/globals";

test("normalizeURL protocol", () => {
  const input = "https://sajidcodes.dev";
  const actual = normalizeURL(input);
  const expected = "sajidcodes.dev";
  expect(actual).toEqual(expected);
});

test("normalizeURL slash", () => {
  const input = "https://sajidcodes.dev/path/";
  const actual = normalizeURL(input);
  const expected = "sajidcodes.dev/path";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML, absolute urls", () => {
  const input = `<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    </body>
</html>`;
  const actual = getURLsFromHTML(input, "https://blog.boot.dev");
  let expected = ["https://blog.boot.dev/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML, relative urls", () => {
  const input = `<html>
    <body>
        <a href="/path"><span>Go to Boot.dev</span></a>
    </body>
</html>`;
  const actual = getURLsFromHTML(input, "https://blog.boot.dev");
  let expected = ["https://blog.boot.dev/path"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML, both absolute and multiple URLs", () => {
  const input = `<html>
    <body>
<a href="https://other.com/path/id"><span>Go to Boot.dev</span></a>
        <a href="/path"><span>Go to Boot.dev</span></a>
    </body>
</html>`;
  const actual = getURLsFromHTML(input, "https://blog.boot.dev");
  let expected = ["https://other.com/path/id", "https://blog.boot.dev/path"];
  expect(actual).toEqual(expected);
});
