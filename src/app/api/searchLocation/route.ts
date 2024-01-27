import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import GeoApi from 'wft-geodb-js-client/dist/api/GeoApi';
import ApiClient from 'wft-geodb-js-client/dist/ApiClient';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const namePrefix = params.get('namePrefix');

  // Initialize the GeoApi instance with the ApiClient
  const apiClientInstance = new ApiClient();
  apiClientInstance.basePath = 'http://geodb-free-service.wirefreethought.com/v1';
  apiClientInstance.defaultHeaders = {
    'X-API-KEY': process.env.GEO_DB_API_KEY as string,
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  };
  const geoApiInstance = new GeoApi(apiClientInstance);

  // Construct the request to the GeoDB API
  try {
    const response = await geoApiInstance.findPlacesUsingGET({
      namePrefix: namePrefix,
      limit: 5,
      offset: 0,
      hateoasMode: false,
      sort: '-population',
    });

    if (response) {
      return NextResponse.json(response);
    } else {
      return NextResponse.json(
        { error: 'No response from GeoDB API' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'An error occurred while fetching data from GeoDB.' },
      { status: 500 }
    );
  }
}
