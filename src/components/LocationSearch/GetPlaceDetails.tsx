// GetPlaceDetails.tsx
import React from 'react';
import styled from 'styled-components';
import PlaceAutocomplete from './PlaceAutocomplete';
import { PlaceType } from '../types/types';

function GetPlaceDetails({
  className,
  setManualCity,
}: {
  className: string;
  setManualCity: React.Dispatch<React.SetStateAction<string>>;
}) {
  const onPlaceSelected = (place: PlaceType) => {
    setManualCity(place.coordinates);
  };

  return (
    <GetPlaceDetailsWrapper className={className}>
      <PlaceAutocomplete onPlaceSelected={onPlaceSelected} />
    </GetPlaceDetailsWrapper>
  );
}

const GetPlaceDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export default GetPlaceDetails;
