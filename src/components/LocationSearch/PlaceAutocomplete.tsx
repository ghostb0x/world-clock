// PlaceAutocomplete.tsx
import React from 'react';
import Autocomplete from './Autocomplete';
import GeoApi from 'wft-geodb-js-client/dist/api/GeoApi';
import { GEO_DB } from './config';  // Adjust the import based on your project structure

enum PopulatedPlaceType {
    ADM2 = "ADM2",
    CITY = "CITY",
    ISLAND = "ISLAND",
  }
  
  interface PlaceFromAPI {
    city: string | null; // The city name (legacy)
    country: string; // The country name (varies by languageCode)
    countryCode: string; // The ISO-3166 country code
    distance?: number; // Included if this is the result of a distance query (optional)
    id: number; // The place GeoDB native id
    latitude: number; // The place latitude (-90.0 to 90.0)
    longitude: number; // The place longitude (-180.0 to 180.0)
    name: string; // The place name (varies by languageCode)
    population: number; // The place population
    region: string; // The region name (varies by languageCode)
    regionCode: string; // The ISO or FIPS region code
    regionWdId: string; // The region Wikidata id
    type: PopulatedPlaceType; // Enumerated populated-place types known by the service
    wikiDataId: string; // The place WikiData id
  }
  

type PlaceAutocompleteProps = {
  onPlaceSelected: (place: { id: string; name: string }) => void;
};

const PlaceAutocomplete: React.FC<PlaceAutocompleteProps> = ({ onPlaceSelected }) => {
    const [currentResults, setCurrentResults] = React.useState<{ id: string; name: string }[]>([]);

    // added
    const geoApiInstance = new GeoApi(GEO_DB.ApiClient.instance);

    const onNamePrefixChanged = async (prefix: string) => {
        if (prefix.length < 3) {
            setCurrentResults([]);
            return;
        }

        try {
            // const response = await GEO_DB.findPlacesUsingGET({
            const response = await geoApiInstance.findPlacesUsingGET({
                namePrefix: prefix,
                limit: 5,
                offset: 0,
                hateoasMode: false,
                sort: '-population'
            });
            const places = response.data.map((place: PlaceFromAPI) => ({
                id: place.id,
                name: place.regionCode
                    ? `${place.name}, ${place.regionCode}, ${place.countryCode}`
                    : `${place.name}, ${place.countryCode}`
            }));
            setCurrentResults(places);
        } catch (error) {
            console.error(error);
            setCurrentResults([]);
        }
    };

    return (
        <Autocomplete
            options={currentResults}
            placeholder="Enter place"
            width="200px"
            onInputChange={onNamePrefixChanged}
            onSelect={(selectedPlace) => {
                onPlaceSelected(selectedPlace);
                setCurrentResults([]);  // Clear results after selection
            }}
        />
    );
};

export default PlaceAutocomplete;