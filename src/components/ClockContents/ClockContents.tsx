'use client';
import * as React from 'react';
import TimeDisplay from '../TimeDisplay';
import BackgroundImage from '../BackgroundImage';
import MoreButton from '../MoreButton';
import styled from 'styled-components';
import { QUERIES } from '@/styles/constants';
import BottomShelf from '../BottomShelf';
import useTimeOfDay from '../useTimeOfDay';

function ClockContents() {
  const [bottomOpen, setBottomOpen] = React.useState(false);

  const nullWeather = {
    temp_f: 0,
    feelsLike_f: 0,
    condition: '',
    uv: 0,
  };

  const [city, setCity] = React.useState('');
  const [region, setRegion] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [timezone, setTimezone] = React.useState('');
  const [weather, setWeather] = React.useState(nullWeather);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchTime = React.useCallback(
    async function fetchTime(query?: string) {
      try {
        const response = await fetch(`api/location?q=${query}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (data.location.name) {
            setCity(data.location.name);
          }
          if (data.location.region) {
            setRegion(data.location.region);
          }
          if (data.location.country) {
            setCountry(data.location.country);
          }
          if (data.location.tz_id) {
            setTimezone(data.location.tz_id);
          }
          if (data.current) {
            setWeather({
              condition: data.current.condition.text,
              feelsLike_f: parseFloat(data.current.feelslike_f),
              temp_f: parseFloat(data.current.temp_f),
              uv: parseFloat(data.current.uv),
            });
          }
        } else {
          console.log('catch error on response if/else');

          throw new Error('Failed to fetch location data');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    },

    []
  );

  const [manualCity, setManualCity] = React.useState('');

  React.useEffect(() => {
    if (manualCity) {
      console.log(`fetching time for ${manualCity}`);
      fetchTime(manualCity);
    } else {
      fetchTime();
    }
  }, [fetchTime, manualCity]);

  const timeOfDay = useTimeOfDay(timezone);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <BackgroundImage timeOfDay={timeOfDay}>
      <TopRow className={bottomOpen ? 'visible' : 'hidden'}>
        <TimeDisplay
          timezone={timezone}
          location={{ city, region, country }}
          setManualCity={setManualCity}
        />
        <MoreButton
          bottomOpen={bottomOpen}
          onClick={() => setBottomOpen(!bottomOpen)}
        />
      </TopRow>
      <BottomShelf
        className={bottomOpen ? 'visible' : 'hidden'}
        timeOfDay={timeOfDay}
        weather={weather}
      />
    </BackgroundImage>
  );
}

const TopRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: clamp(1.1rem, 7.1vw + 0.25rem, 10rem);
  row-gap: 30px;
  column-gap: 40px;
  margin-bottom: 40px;
  margin-right: 15px;
  will-change: transform;
  transition: transform 1s ease-in-out;

  &.hidden {
    transform: translateY(70%); // Slide down
  }

  @media ${QUERIES.tabletAndUp} {
    row-gap: 50px;
    margin-right: 40px;

    &.hidden {
      transform: translateY(100%); // Slide down
    }
  }

  @media ${QUERIES.desktopAndUp} {
    width: 100%;
    flex-direction: revert;
    justify-content: space-between;
    row-gap: revert;
    align-items: flex-end;
  }
`;
export default ClockContents;
