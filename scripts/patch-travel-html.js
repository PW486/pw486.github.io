import { readFileSync, writeFileSync } from 'fs'

const path = 'dist/travel/index.html'
let html = readFileSync(path, 'utf-8')

html = html
  .replaceAll('href="/favicon.png"', 'href="/traveler/favicon.png"')
  .replaceAll('href="/favicon.ico"', 'href="/traveler/favicon.ico"')
  .replaceAll('href="/profile.jpg"', 'href="/traveler/profile.jpg"')
  .replaceAll('href="/site.webmanifest"', 'href="/traveler/site.webmanifest"')
  .replaceAll('https://pw486.github.io/og-image.jpg', 'https://pw486.github.io/traveler/og-image.jpg')
  .replaceAll('content="https://pw486.github.io/"', 'content="https://pw486.github.io/travel"')
  .replaceAll('content="Software Engineer"', 'content="Traveler"')

// Ensure og:url is travel (already handled above, but double-check)
html = html.replace(
  '<meta property="og:url" content="https://pw486.github.io/" />',
  '<meta property="og:url" content="https://pw486.github.io/travel" />'
)

// Keep title as PW486 (unified)
writeFileSync(path, html)
console.log('patched', path)