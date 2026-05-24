import sharp from "sharp";
import { join } from "node:path";

const assets = join(process.cwd(), "public", "assets");

await sharp(join(assets, "biancos-building-1024x726.jpg"))
  .webp({ quality: 82 })
  .toFile(join(assets, "biancos-building-1024x726.webp"));

await sharp(join(assets, "biancos.jpg"))
  .resize(128, 128, { fit: "cover" })
  .webp({ quality: 85 })
  .toFile(join(assets, "biancos-128.webp"));

console.log("Wrote biancos-building-1024x726.webp and biancos-128.webp");
