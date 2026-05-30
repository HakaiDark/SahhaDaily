import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const productDataPath = path.join(root, "src/data/products.ts");
const imageDir = path.join(root, "public/products");
const galleryDir = path.join(imageDir, "gallery");

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|h2|h3|li|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+\n/g, "\n")
    .replace(/\n\s+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function cleanHtmlText(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractNutrition(html) {
  const nutritionIndex = html.indexOf("Nutritional Information");

  if (nutritionIndex === -1) {
    return null;
  }

  const nutritionEndIndex = html.indexOf("</table>", nutritionIndex);
  const chunkEnd = nutritionEndIndex === -1 ? nutritionIndex + 30000 : nutritionEndIndex + "</table>".length;
  const chunk = html.slice(nutritionIndex, chunkEnd);
  const rawRows = [...chunk.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)]
    .map((match) => [...match[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)]
      .map((cell) => cleanHtmlText(cell[1]))
      .filter(Boolean))
    .filter((row) => row.length > 0);

  const serving = rawRows.find((row) => row[0]?.includes("Serving Size"))?.[0] ?? "";
  const rows = rawRows
    .filter((row) => row.length >= 2)
    .filter((row) => !row[0].includes("Amount per Serving"))
    .filter((row) => !row[0].includes("Serving Size"))
    .filter((row) => !row.some((cell) => /Delivery|working days|€|Charges|Service/i.test(cell)))
    .map((row) => ({
      nutrient: row[0],
      amount: row[1] ?? "",
      nrv: row[2] ?? ""
    }));

  const otherIngredients = rawRows
    .find((row) => row[0]?.startsWith("Other Ingredients:"))?.[0]
    ?.replace(/^Other Ingredients:\s*/i, "") ?? "";

  const afterNutrition = html.slice(chunkEnd, chunkEnd + 12000);
  const advice = afterNutrition
    .match(/<h3[^>]*>\s*Advice\s*<\/h3>\s*<p>([\s\S]*?)<\/p>/i)?.[1];
  const storage = afterNutrition
    .match(/<h3[^>]*>\s*Storage\s*<\/h3>\s*<p>([\s\S]*?)<\/p>/i)?.[1];

  return {
    serving,
    rows,
    otherIngredients,
    advice: advice ? cleanHtmlText(advice) : "",
    storage: storage ? cleanHtmlText(storage) : ""
  };
}

function imageUrl(url) {
  if (!url) return "";
  return url.startsWith("//") ? `https:${url}` : url;
}

function productImageName(product, index) {
  const sku = product.sku.toLowerCase();
  const safeSlug = product.slug.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
  return `${String(index + 1).padStart(2, "0")}-${sku}-${safeSlug}.webp`;
}

function galleryImageName(index, url) {
  const cleanUrl = url.split("?")[0];
  const extension = path.extname(cleanUrl).toLowerCase();
  const safeExtension = [".webp", ".jpg", ".jpeg", ".png"].includes(extension) ? extension : ".webp";
  return `${String(index + 1).padStart(2, "0")}${safeExtension}`;
}

function parseLaunchProducts(source) {
  const blocks = source.split(/\n\s*{\n/).slice(1);

  return blocks.map((block) => {
    const get = (field) => block.match(new RegExp(`${field}: "([^"]+)"`))?.[1] ?? "";
    const number = Number(block.match(/number: (\d+)/)?.[1]);
    return {
      number,
      sku: get("sku"),
      name: get("name"),
      slug: get("slug"),
      sourceUrl: get("sourceUrl")
    };
  }).filter((item) => item.sourceUrl);
}

async function fetchJson(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }
  return response.json();
}

async function fetchBuffer(url, timeout = 20000) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(timeout) });
    if (!response.ok) {
      return null;
    }

    return Buffer.from(await response.arrayBuffer());
  } catch (error) {
    console.warn(`Skipped image after timeout/error: ${url}`);
    return null;
  }
}

async function scrapeLaunchProducts() {
  const source = await readFile(productDataPath, "utf8");
  const launchProducts = parseLaunchProducts(source);
  const scraped = [];

  await mkdir(imageDir, { recursive: true });
  await mkdir(galleryDir, { recursive: true });

  for (const [index, product] of launchProducts.entries()) {
    console.log(`Scraping ${index + 1}/${launchProducts.length}: ${product.sku} ${product.name}`);
    const jsonUrl = `${product.sourceUrl}.js`;
    const [data, pageResponse] = await Promise.all([
      fetchJson(jsonUrl),
      fetch(product.sourceUrl, { signal: AbortSignal.timeout(20000) })
    ]);
    const pageHtml = pageResponse.ok ? await pageResponse.text() : "";
    const remoteImages = [...new Set((data.images ?? []).map(imageUrl).filter(Boolean))];
    const remoteImage = imageUrl(data.featured_image ?? remoteImages[0]);
    const localImage = productImageName(product, index);
    const productGalleryDir = path.join(galleryDir, product.sku.toLowerCase());
    const localImages = [];

    if (remoteImage) {
      const imageBuffer = await fetchBuffer(remoteImage);
      if (imageBuffer) {
        await writeFile(path.join(imageDir, localImage), imageBuffer);
      }
    }

    await mkdir(productGalleryDir, { recursive: true });

    for (const [galleryIndex, remoteGalleryImage] of remoteImages.entries()) {
      const imageBuffer = await fetchBuffer(remoteGalleryImage);
      if (!imageBuffer) {
        continue;
      }

      const galleryFileName = galleryImageName(galleryIndex, remoteGalleryImage);
      await writeFile(path.join(productGalleryDir, galleryFileName), imageBuffer);
      localImages.push(`/products/gallery/${product.sku.toLowerCase()}/${galleryFileName}`);
    }

    scraped.push({
      ...product,
      sourceUrl: product.sourceUrl,
      sourceJsonUrl: jsonUrl,
      weightworldTitle: data.title,
      handle: data.handle,
      productType: data.type,
      tags: data.tags,
      price: data.price,
      variants: data.variants?.map((variant) => ({
        title: variant.title,
        sku: variant.sku,
        price: variant.price,
        available: variant.available
      })),
      image: remoteImage,
      images: remoteImages,
      localImage: `/products/${localImage}`,
      localImages,
      descriptionText: stripHtml(data.description ?? ""),
      nutrition: extractNutrition(pageHtml)
    });
  }

  return scraped;
}

async function scrapeAllProducts() {
  const all = [];
  for (let page = 1; ; page += 1) {
    const data = await fetchJson(`https://www.weightworld.ie/products.json?limit=250&page=${page}`);
    if (!data.products?.length) break;
    all.push(...data.products);
  }

  return all.map((product) => ({
    id: product.id,
    title: product.title,
    handle: product.handle,
    productType: product.product_type,
    tags: product.tags,
    sourceUrl: `https://www.weightworld.ie/products/${product.handle}`,
    image: imageUrl(product.images?.[0]?.src),
    variants: product.variants?.map((variant) => ({
      title: variant.title,
      sku: variant.sku,
      price: variant.price,
      available: variant.available
    })),
    descriptionText: stripHtml(product.body_html ?? "")
  }));
}

const scrapeEverything = process.argv.includes("--all");
const scrapedProducts = scrapeEverything ? await scrapeAllProducts() : await scrapeLaunchProducts();
const outputPath = path.join(
  root,
  "src/data",
  scrapeEverything ? "weightworld-scraped-all-products.json" : "weightworld-scraped-launch-products.json"
);

await writeFile(outputPath, `${JSON.stringify({
  scrapedAt: new Date().toISOString(),
  mode: scrapeEverything ? "all-products" : "launch-products",
  count: scrapedProducts.length,
  products: scrapedProducts
}, null, 2)}\n`);

console.log(`Scraped ${scrapedProducts.length} WeightWorld product${scrapedProducts.length === 1 ? "" : "s"} into ${outputPath}`);
