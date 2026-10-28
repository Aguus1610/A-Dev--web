import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const targets = [
  { url: 'https://aguus1610.github.io/EAD-web-nuevo/', name: 'ead-web' },
  { url: 'https://share--ead-oleohidraulica-2026-.base44.app', name: 'ead-suite' },
  { url: 'https://share--soft-price-flow-direct.base44.app', name: 'soft-price' },
]

mkdirSync('public/shots', { recursive: true })

const browser = await chromium.launch()
for (const t of targets) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
  try {
    await page.goto(t.url, { waitUntil: 'networkidle', timeout: 60000 })
    await page.waitForTimeout(6000)
    await page.screenshot({ path: `public/shots/${t.name}.jpg`, type: 'jpeg', quality: 72 })
    console.log('OK  ', t.name)
  } catch (err) {
    console.log('FAIL', t.name, err instanceof Error ? err.message : String(err))
  }
  await page.close()
}
await browser.close()
