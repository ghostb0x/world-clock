// GetPlaceDetails.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import PlaceAutocomplete from './PlaceAutocomplete';
import { GEO_DB } from './config';
import { formatTimeZone } from './dateTimeUtils';

type PlaceDetails = {
  id: string;
  region?: string;
  latitude: string;
  longitude: string;
  timezone?: string;
  population?: number;
  elevationMeters?: number;
};

const GetPlaceDetails: React.FC = () => {
    const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null);

    const onPlaceSelected = async (place: { id: string; name: string }) => {
        try {
            const response = await GEO_DB.getPlaceUsingGET(place.id);
            setPlaceDetails(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <GetPlaceDetailsWrapper>
            <PlaceAutocomplete onPlaceSelected={onPlaceSelected} />
            {placeDetails && (
                <DetailsSection>
                    <DetailsTable>
                        <tbody>
                            {placeDetails.region && (
                                <TableRow>
                                    <TableData>State/Province/Region:</TableData>
                                    <TableData>{placeDetails.region}</TableData>
                                </TableRow>
                            )}
                            <TableRow>
                                <TableData>Location (latitude/longitude):</TableData>
                                <TableData>{`${placeDetails.latitude}/${placeDetails.longitude}`}</TableData>
                            </TableRow>
                            <TableRow>
                                <TableData>Time-Zone:</TableData>
                                <TableData>{formatTimeZone(placeDetails.timezone as string)}</TableData>
                            </TableRow>
                            <TableRow>
                                <TableData>Population:</TableData>
                                <TableData>{placeDetails.population}</TableData>
                            </TableRow>
                            {placeDetails.elevationMeters && (
                                <TableRow>
                                    <TableData>Elevation (meters):</TableData>
                                    <TableData>{placeDetails.elevationMeters}</TableData>
                                </TableRow>
                            )}
                        </tbody>
                    </DetailsTable>
                </DetailsSection>
            )}
        </GetPlaceDetailsWrapper>
    );
};

const GetPlaceDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const DetailsSection = styled.div`
  width: 100%;
`;

const DetailsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr``;

const TableData = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
`;

export default GetPlaceDetails;
