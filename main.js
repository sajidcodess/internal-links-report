import { crawlPage, getURLsFromHTML } from './crawl.js';
import { printReport } from './printReport.js';


async function main() {
  if (process.argv.length > 3) {
    console.log('Too many arguments: Only 2 arguments required for this to run. For example (node file.js www.site.com)')
    return
  }

  if (process.argv.length < 3) {
    console.log('Make sure to include URL argument after file name. Example, node file.js www.example.com')
    return
  }

  let baseURL = process.argv[2]

  let pages = await crawlPage(baseURL)

  printReport(pages)
}

main()
