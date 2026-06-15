import { createRequire } from 'module'
import { existsSync, mkdirSync, readdirSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const require = createRequire(import.meta.url)
const puppeteer = require('C:/Users/jbfok/AppData/Local/Temp/puppeteer-test/node_modules/puppeteer')

const url   = process.argv[2] || 'http://localhost:3000'
const label = process.argv[3] || ''
const dir   = path.join(__dirname, 'temporary screenshots')

if (!existsSync(dir)) mkdirSync(dir, { recursive: true })

const existing = readdirSync(dir).filter(f => /^screenshot-\d+/.test(f)).length
const num      = existing + 1
const filename = label ? `screenshot-${num}-${label}.png` : `screenshot-${num}.png`
const filepath = path.join(dir, filename)

const browser = await puppeteer.launch({ headless: 'new' })
const page    = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })
await page.screenshot({ path: filepath, fullPage: true })
await browser.close()

console.log(`Screenshot opgeslagen: ${filepath}`)
