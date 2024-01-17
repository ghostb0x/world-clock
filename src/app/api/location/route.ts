import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    
  const source_url = `http://ip-api.com/json/`;

  const ip = request.ip;

  // bulgaria
  const FALLBACK_IP_ADDRESS = '2a00:7145::180d:b3da';

  let get_url: string;
  if (ip) {
    get_url = source_url + `/${ip}`;
  } else {
    get_url = source_url + `/${FALLBACK_IP_ADDRESS}`;
  }

  try {
    const response = await fetch(get_url);
    const data: unknown = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
