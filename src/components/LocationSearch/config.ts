import * as GeoDB from 'wft-geodb-js-client';

GeoDB.ApiClient.instance.basePath = 'http://geodb-free-service.wirefreethought.com/v1';
GeoDB.ApiClient.instance.defaultHeaders = {
    'X-API-KEY': process.env.GEO_DB_API_KEY as string,
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
};

export const GEO_DB = GeoDB;
