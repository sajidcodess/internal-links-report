
async function printReport(pages) {
  console.log('===================')
  console.log('START PRINT REPORT')
  console.log('===================')

  for (let page of Object.entries(pages)) {
    console.log(`Found ${page[1]} internal links to ${page[0]}`)
  } 

  console.log('===================')
  console.log('END PRINT REPORT')
  console.log('===================')
}

export { printReport }
