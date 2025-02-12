import { getImageWithPlaiceholder } from '@/utils/server/functions/images';
import {
  NextRequest, NextResponse 
} from 'next/server';

export interface GetImageWithPlaiceholderResponseType {
  img: {
    src: string;
    height: number;
    width: number;
  };
  base64: string;
}

// PUBLIC
// GET PLAICEHOLDER IMAGE
export async function GET(req: NextRequest): Promise<NextResponse> {
  const imageUrl = req.nextUrl.searchParams.get('imageUrl');

  if (!imageUrl || typeof imageUrl !== 'string') {
    return NextResponse.json({ statusText: 'Invalid url.' }, { status: 400 });
  }

  try {
    const { base64, img } = await getImageWithPlaiceholder(imageUrl);

    const res = { base64, img };

    return NextResponse.json(res, { statusText: 'Fetched image plaiceholder succesfully.', status: 200 });
  } catch (error) {
    return NextResponse.json({ statusText: 'There was an error fetching the image plaiceholder.' }, { status: 500 });
  }
}
