import type {tOptions} from "./config"
import puppeteer from "puppeteer"
import options from "./config"
import { sync } from "globby"
import { basename, join} from "path"
export default pdfGen


if (module.parent === null) {
  const cwd = process.cwd()
  , {outFolder} = options
  outFolder && process.chdir(outFolder)

  pdfGen(options)
  .finally(() => process.chdir(cwd))
}
  
async function pdfGen({
  goto, launch, pdf, waitFor, ext
}: tOptions = {}) {
  const cwd = process.cwd()
  , browser = await puppeteer.launch(launch)
  , page = await browser.newPage()  
  , {
    "npm_package_author_name": author
  } = process.env

  for (const outFile of sync(`*${ext}`)) {
    const baseName = basename(outFile, ext)
    
    if (["404", "index"].includes(baseName))
      continue

    await page.goto(`file://${join(cwd, outFile)}`, goto)
    waitFor && await page.waitFor(waitFor)
    await page.pdf({
      //TODO Pick from links
      "path": join(cwd, `${author}-${baseName}.pdf`),
      ...pdf
    })  
  }

  await page.close()
  await browser.close()
}
