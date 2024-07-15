
function normalizeURL(url) {
  const urlObj = new URL(url)
  const hostname = urlObj.hostname
  let path = urlObj.pathname

  if(path.length > 0 && path.slice(-1) === '/') {
    path = path.slice(0, -1)
  }

  const normalized = hostname + path
  return normalized
}

export { normalizeURL }
