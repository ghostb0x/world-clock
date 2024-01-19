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
      console.log(`fetching time for ${ip_address}`);
      fetchTime(ip_address);
    }

    // NOTE: Intentionally running effect only on component mount
    // or on fetchTime change (should not happen)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchTime]);

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
