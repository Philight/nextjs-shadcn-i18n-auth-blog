'use server';

import fs from 'node:fs/promises';
import { getPlaiceholder } from 'plaiceholder';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import { isValidUrl } from 'src/utils/functions';

// ================================================

const loadBufferLocal = async (src) => await fs.readFile(`./public/${src}`);
const loadBufferExternal = async (src) => await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()));

export async function generateBlurDataURL(image: string | StaticImport): Promise<string> {
  const buffer = await (isValidUrl(image as string) ? loadBufferExternal(image) : loadBufferLocal(image));

  const { base64 } = await getPlaiceholder(buffer);

  return base64;
}

export const getImageWithPlaiceholder = async (src: string) => {
  // const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()));
  const buffer = await loadBufferExternal(src);

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    ...plaiceholder,
    img: { src, height, width },
  };
};
