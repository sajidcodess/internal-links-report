
function ensureProtocol(url) {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "https://" + url;
  }
  return url;
}

function urlObject(url) {
  try {
    url = new URL(ensureProtocol(url))
  } catch (err) {
    console.log(`The URL(${url}) is not valid: Error {err.message}`)
  }
  return url
}

export { urlObject, ensureProtocol }
