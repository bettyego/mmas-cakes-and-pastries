/**
 * Optimise photos for the website.
 *
 *   npm run images                      → reads ./image-sources, writes ./public/images
 *   npm run images -- <input> <output>  → custom folders
 *
 * Put original photos (JPG/PNG/WebP/HEIC-converted JPG) in sub-folders that
 * match the website folders, e.g.  image-sources/cupcakes/red-velvet.jpg
 * becomes  public/images/cupcakes/red-velvet.webp  — then reference
 * '/images/cupcakes/red-velvet.webp' in src/data/products.js or gallery.js.
 */
import { readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const [inputDir = 'image-sources', outputDir = 'public/images'] = process.argv.slice(2)
const EXT = /\.(jpe?g|png|webp|avif|tiff?)$/i

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else if (EXT.test(entry.name)) yield full
  }
}

let count = 0
for await (const file of walk(inputDir)) {
  const rel = path.relative(inputDir, file)
  const out = path.join(outputDir, rel).replace(EXT, '.webp')
  const isHero = path.basename(file).startsWith('hero')
  await mkdir(path.dirname(out), { recursive: true })
  const info = await sharp(file)
    .rotate() // respect phone camera orientation
    .resize({ width: isHero ? 2000 : 1400, withoutEnlargement: true })
    .webp({ quality: isHero ? 80 : 78 })
    .toFile(out)
  const kb = Math.round(info.size / 1024)
  console.log(`✓ ${rel} → ${path.relative('.', out)}  (${info.width}×${info.height}, ${kb} KB)`)
  count++
}
console.log(count ? `\nDone — ${count} image(s) optimised.` : `No images found in ${inputDir}`)
