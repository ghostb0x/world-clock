import React from 'react';
import Autocomplete from './Autocomplete';
import { PlaceType } from '../types/types';

enum PopulatedPlaceType {
  ADM2 = 'ADM2',
  CITY = 'CITY',
  ISLAND = 'ISLAND',
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
  onPlaceSelected: (place: PlaceType) => void;
};

const PlaceAutocomplete: React.FC<PlaceAutocompleteProps> = ({
  onPlaceSelected,
}) => {
  const [currentResults, setCurrentResults] = React.useState<
    PlaceType[]
  >([]);

  const onNamePrefixChanged = async (prefix: string) => {
    if (prefix.length < 3) {
      setCurrentResults([]);
      return;
    }

    try {
      const response = await fetch(
        `/api/searchLocation?namePrefix=${encodeURIComponent(prefix)}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      const places: PlaceType[] = data.data.map((place: PlaceFromAPI) => {
        return {
          id: place.id,
          name: place.regionCode
            ? `${place.name}, ${place.regionCode}, ${place.countryCode}`
            : `${place.name}, ${place.countryCode}`,
          coordinates: `${place.latitude},${place.longitude}`,
        };
      });
      setCurrentResults(places);
    } catch (error) {
      console.error(error);
      setCurrentResults([]);
    }
  };

  return (
    <Autocomplete
      options={currentResults}
      placeholder="Enter Location"
      onInputChange={onNamePrefixChanged}
      onSelect={(selectedPlace) => {
        onPlaceSelected(selectedPlace);
        setCurrentResults([]); // Clear results after selection
      }}
    />
  );
};

export default PlaceAutocomplete;
