import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const getLoc = params.get('q');

  const ip = request.headers.get('X-Forwarded-For');
  console.log(`from get route - current ip is ${ip}`);

  const apiKey = process.env.WEATHER_API_KEY;
  const source_url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&aqi=no&q=`;

  // bulgaria
  const FALLBACK_IP_ADDRESS = '2a00:7145::180d:b3da';

  let get_url: string = source_url + `${FALLBACK_IP_ADDRESS}`; // Default assignment

  const env = process.env.NODE_ENV;
  if (env == 'development') {
    console.log('dev env');
    get_url = source_url + `${FALLBACK_IP_ADDRESS}`;
    console.log(`fetching with backup ip: ${get_url}`);
  } else if (env == 'production') {
    console.log('prod env');

    if (ip) {
      get_url = source_url + `${ip}`;
      console.log(`fetching with direct ip: ${get_url}`);
    } else if (params) {
      get_url = source_url + `${getLoc}`;
      console.log(`fetching with params location: ${get_url}`);
    } else {
      console.log(`fetching with backup ip: ${get_url}`);
    }
  }

  try {
    const response = await fetch(get_url);
    const data: unknown = await response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.log('catch error on route');
    console.error(error);
    return NextResponse.json({ error });
  }
}
