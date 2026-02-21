/**
 * 將任意格式的圖示轉成 Tauri 所需的 PNG（正方形、RGBA），並輸出到 app-icon.png
 * 用法: node scripts/prepare-icon.mjs [輸入路徑]
 * 預設輸入: app-icon.png（若存在）或 ../assets 內第一個圖片
 */
import { readFile, writeFile } from 'fs/promises';
import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const defaultOut = path.join(root, 'app-icon.png');

async function getSharp() {
  try {
    return (await import('sharp')).default;
  } catch {
    console.error('請先安裝 sharp: npm install -D sharp');
    process.exit(1);
  }
}

function findInput() {
  const args = process.argv.slice(2);
  if (args[0]) return path.resolve(args[0]);
  const candidate = path.join(root, 'app-icon.png');
  return candidate;
}

async function main() {
  const sharp = await getSharp();
  const inputPath = findInput();

  const buf = await readFile(inputPath);
  const meta = await sharp(buf).metadata();
  const size = Math.max(meta.width || 512, meta.height || 512);

  await sharp(buf)
    .resize(size, size)
    .png()
    .toFile(defaultOut);

  console.log('已輸出:', defaultOut, `(${size}x${size} PNG)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
