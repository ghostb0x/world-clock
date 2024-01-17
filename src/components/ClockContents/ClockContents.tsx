'use client';
import * as React from 'react';
import TimeDisplay from '../TimeDisplay';
import BackgroundImage from '../BackgroundImage';

interface ClockProps {
  ip_address: string;
}

function ClockContents({ ip_address }: ClockProps) {

  console.log(`GetIP address = ${ip_address}`);

  const [city, setCity] = React.useState('');
  const [region, setRegion] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [timezone, setTimezone] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchTime = React.useCallback(
    async function fetchTime() {
      try {
        const response = await fetch(`api/location?ip=${ip_address}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setCity(data.city);
          setRegion(data.regionName);
          setCountry(data.country);
          setTimezone(data.timezone);
        } else {
          throw new Error('Failed to fetch location data');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    },

    [ip_address]
  );

  React.useEffect(() => {
    if (ip_address) {
      console.log('fetching time');
      fetchTime();
    }
  }, [ip_address, fetchTime]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <BackgroundImage timezone={timezone}>
      <TimeDisplay
        timezone={timezone}
        location={{ city, region, country }}
      />
    </BackgroundImage>
  );
}
export default ClockContents;
