import {toMatchImageSnapshot} from "jest-image-snapshot"
import puppeteer, {Browser, Page} from "puppeteer"
import opts from "./config"
import { sync } from "globby"
import {basename} from "path"
 
expect.extend({toMatchImageSnapshot})

const {
  launch,
  goto,
  waitFor,
  viewport,
  screenshot,
  outFolder,
  ext
} = opts
, {env} = process

let browser: Browser, page :Page

beforeAll(async () => {
  browser = await puppeteer.launch(launch)
  page = await browser.newPage()  
})

afterAll(async () => {
  await page.close()
  await browser.close()
})

sync(`${outFolder}/*${ext}`, {absolute: true})
.forEach((filePath) => {
  const fileBase = basename(filePath, ext)
  
  it(fileBase, async () => {
    await page.goto(`file://${filePath}`, goto)
    waitFor && await page.waitFor(waitFor)
    viewport && await page.setViewport(viewport)

    const screenshotData = await page.screenshot(screenshot)

    expect(screenshotData).toMatchImageSnapshot({
      "customSnapshotIdentifier": fileBase,
      "dumpDiffToConsole": true,
      "failureThresholdType": "percent",
      "failureThreshold": +(env.npm_config_threshold ?? ''),
      "blur": +(env.npm_config_blur ?? '')
    })
  })
})

/** @see https://github.com/microsoft/playwright/issues/3509#issuecomment-675441299 */
it.skip("pdf https://bugs.chromium.org/p/chromium/issues/detail?id=761295", async () => {
  
  // await page.goto(`file://${baseName}.pdf`, goto)

  // const screenshotData = await page.screenshot(screenshot)

  // expect(screenshotData).toMatchImageSnapshot( {
  //   "customSnapshotIdentifier": `${fileName}-pdf`
  // })
})

