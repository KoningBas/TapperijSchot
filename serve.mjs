import { createServer } from 'http'
import { readFile } from 'fs/promises'
import { extname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const PORT = 3000

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
}

createServer(async (req, res) => {
  let pathname = req.url.split('?')[0]
  if (pathname === '/') pathname = '/index.html'
  const filePath = join(__dirname, pathname)
  try {
    const data = await readFile(filePath)
    const ext = extname(filePath).toLowerCase()
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' })
    res.end(data)
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('404 Not Found')
  }
}).listen(PORT, () => {
  console.log(`Tapperij Schot dev server: http://localhost:${PORT}`)
})
