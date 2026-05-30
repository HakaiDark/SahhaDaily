import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const productsDir = path.join(root, "public/products");
const immersiveDir = path.join(productsDir, "immersive");
const launchDataPath = path.join(root, "src/data/weightworld-scraped-launch-products.json");

function isEdgeBackground(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return min > 232 && max - min < 34;
}

function transparentPathFor(publicPath) {
  return publicPath.replace("/products/", "/products/immersive/").replace(/\.(jpe?g|png|webp)$/i, ".webp");
}

async function removeEdgeBackground(inputPath, outputPath) {
  const image = sharp(inputPath).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const total = width * height;
  const visited = new Uint8Array(total);
  const queue = [];

  function enqueue(x, y) {
    const index = y * width + x;
    if (visited[index]) return;

    const offset = index * channels;
    if (!isEdgeBackground(data[offset], data[offset + 1], data[offset + 2])) return;

    visited[index] = 1;
    queue.push(index);
  }

  for (let x = 0; x < width; x += 1) {
    enqueue(x, 0);
    enqueue(x, height - 1);
  }

  for (let y = 0; y < height; y += 1) {
    enqueue(0, y);
    enqueue(width - 1, y);
  }

  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const index = queue[cursor];
    const x = index % width;
    const y = Math.floor(index / width);

    if (x > 0) enqueue(x - 1, y);
    if (x < width - 1) enqueue(x + 1, y);
    if (y > 0) enqueue(x, y - 1);
    if (y < height - 1) enqueue(x, y + 1);
  }

  for (let index = 0; index < total; index += 1) {
    if (!visited[index]) continue;
    data[index * channels + 3] = 0;
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(data, { raw: { width, height, channels } })
    .webp({ quality: 92, effort: 5 })
    .toFile(outputPath);
}

async function processPublicImage(publicPath) {
  const inputPath = path.join(root, "public", publicPath.replace(/^\//, ""));
  const outputPublicPath = transparentPathFor(publicPath);
  const outputPath = path.join(root, "public", outputPublicPath.replace(/^\//, ""));

  await removeEdgeBackground(inputPath, outputPath);

  return outputPublicPath;
}

async function updateLaunchData() {
  const launchData = JSON.parse(await readFile(launchDataPath, "utf8"));

  for (const product of launchData.products) {
    if (product.localImage) {
      product.localImage = transparentPathFor(product.localImage);
    }

    if (Array.isArray(product.localImages)) {
      product.localImages = product.localImages.map(transparentPathFor);
    }
  }

  await writeFile(launchDataPath, `${JSON.stringify(launchData, null, 2)}\n`);
}

async function main() {
  const topLevelFiles = await readdir(productsDir);
  const heroImages = topLevelFiles
    .filter((file) => /^\d{2}-.+\.(jpe?g|png|webp)$/i.test(file))
    .map((file) => `/products/${file}`);

  const launchData = JSON.parse(await readFile(launchDataPath, "utf8"));
  const galleryImages = launchData.products.flatMap((product) => product.localImages ?? []);
  const imagePaths = [...new Set([...heroImages, ...galleryImages])];

  await mkdir(immersiveDir, { recursive: true });

  for (const [index, publicPath] of imagePaths.entries()) {
    console.log(`Processing ${index + 1}/${imagePaths.length}: ${publicPath}`);
    await processPublicImage(publicPath);
  }

  await updateLaunchData();
  console.log(`Created ${imagePaths.length} immersive product images.`);
}

await main();
