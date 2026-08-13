import { NextResponse } from 'next/server';
import { getCategorizedMedia } from '../../../../lib/instagram';

export async function GET() {
  const data = await getCategorizedMedia();
  return NextResponse.json(data);
}
