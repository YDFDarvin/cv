import type {
  PDFOptions,
  WaitForOptions,
  LaunchOptions,
  ScreenshotOptions,
  Viewport
} from "puppeteer"

export type tOptions = Partial<{
  "launch": LaunchOptions
  "goto": WaitForOptions
  "viewport": Viewport
  "pdf": PDFOptions
  "waitFor": number
  "screenshot": ScreenshotOptions
  "outFolder":string
  "ext": string
}>

const typed: tOptions = {
  "launch": {
    //@ts-expect-error
    "args": ["--allow-file-access-from-files", "--enable-local-file-accesses",
      "--wait-for-browser"
    ],
    // "product": "firefox"
  },
  "viewport": {
    "width": 1100,
    "height": 1560
  },
  "goto": {
    "waitUntil": "networkidle2"
  },
  "waitFor": 1000,
  "screenshot": {
    "fullPage": true,
    "type": "png"
  },
  "pdf": {
    //@ts-expect-error
    "format": "A4",
    "printBackground": true,
    "pageRanges": "1",
    "scale": 0.73
  },
  "outFolder": "out",
  "ext": ".html"
}

export default typed