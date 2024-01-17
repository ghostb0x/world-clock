import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const source_url = `http://ip-api.com/json/`;

  const params = request.nextUrl.searchParams;
  const getIp = params.get('ip')

  const ip = request.ip;
  console.log(`from get route - current ip is ${ip}`);

  // bulgaria
  const FALLBACK_IP_ADDRESS = '2a00:7145::180d:b3da';

  let get_url: string;
  if (ip) {
    get_url = source_url + `/${ip}`;
    console.log(`fetching with direct ip: ${get_url}`);
  } else if (params) {
    get_url = source_url + `/${getIp}`;
    console.log(`fetching with params ip: ${get_url}`);
  } else {
    get_url = source_url + `/${FALLBACK_IP_ADDRESS}`;
    console.log(`fetching with backup ip: ${get_url}`);
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
