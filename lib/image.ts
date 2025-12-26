import fs from "node:fs/promises";
import path from "node:path";
import { getPlaiceholder } from "plaiceholder";

export async function getImageBlur(src: string) {
  try {
    const buffer = await fs.readFile(path.join(process.cwd(), "public", src));
    const { base64 } = await getPlaiceholder(buffer);
    return base64;
  } catch (error) {
    console.error(`Failed to generate blur for image: ${src}`, error);
    return "";
  }
}
