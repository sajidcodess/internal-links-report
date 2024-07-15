import { normalizeURL } from "./crawl.js";
import { test, expect } from "@jest/globals";

test("normalizeURL protocol", () => {
  const input = "https://sajidcodes.dev"
  const actual = normalizeURL(input)
  const expected = "sajidcodes.dev"
  expect(actual).toEqual(expected)
})

test("normalizeURL slash", () => {
  const input = "https://sajidcodes.dev/path/"
  const actual = normalizeURL(input)
  const expected = "sajidcodes.dev/path"
  expect(actual).toEqual(expected)
})
