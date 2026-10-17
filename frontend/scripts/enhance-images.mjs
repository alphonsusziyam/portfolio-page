/**
 * Macht kleine Screenshots für Retina-Displays brauchbarer:
 * 2x hochskalieren (Lanczos3) + leicht nachschärfen.
 *
 * Wichtig: Das erfindet keine neuen Details. Es macht Kanten und Text
 * knackiger. Für wirklich scharfe Bilder Screenshots mit höherer
 * Auflösung aufnehmen (Chrome DevTools, Geräte-Pixelverhältnis 2 oder 3).
 *
 * Einmalig:   npm i -D sharp
 * Nutzung:    node scripts/enhance-images.mjs src/assets/ecocharge src/assets/orderly
 *             → schreibt nach <ordner>/enhanced/ (Originale bleiben unberührt)
 *
 *             node scripts/enhance-images.mjs public/projects/looply --in-place
 *             → überschreibt die Bilder direkt. Bilder ab 1000px Breite werden
 *               übersprungen, ein zweiter Lauf verändert also nichts mehr.
 */

import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const MIN_WIDTH_TO_SKIP = 1000;
const SCALE = 2;

const args = process.argv.slice(2);
const inPlace = args.includes("--in-place");
const dirs = args.filter((arg) => !arg.startsWith("--"));

if (dirs.length === 0) {
  console.error("Bitte mindestens einen Ordner angeben.");
  process.exit(1);
}

for (const dir of dirs) {
  const outDir = inPlace ? dir : path.join(dir, "enhanced");

  if (!inPlace) {
    await mkdir(outDir, { recursive: true });
  }

  const files = (await readdir(dir)).filter((file) =>
    /\.(png|jpe?g)$/i.test(file),
  );

  for (const file of files) {
    const source = path.join(dir, file);
    const { width = 0 } = await sharp(source).metadata();

    if (width >= MIN_WIDTH_TO_SKIP) {
      console.log(`übersprungen (bereits ${width}px): ${source}`);
      continue;
    }

    const pipeline = sharp(source)
      .resize({ width: width * SCALE, kernel: "lanczos3" })
      .sharpen({ sigma: 1.0, m1: 0.6, m2: 1.4 });

    const isJpeg = /\.jpe?g$/i.test(file);

    const buffer = isJpeg
      ? await pipeline.jpeg({ quality: 92, mozjpeg: true }).toBuffer()
      : await pipeline.png({ compressionLevel: 9 }).toBuffer();

    await writeFile(path.join(outDir, file), buffer);

    console.log(`${source}: ${width}px → ${width * SCALE}px`);
  }
}
