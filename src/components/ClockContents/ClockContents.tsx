'use client';
import * as React from 'react';
import TimeDisplay from '../TimeDisplay';
import BackgroundImage from '../BackgroundImage';

interface ClockProps {
  ip_address: string;
}

function ClockContents({ ip_address }: ClockProps) {
  let FALLBACK_IP_ADDRESS = '157.97.134.115';

  console.log(ip_address);

  // bulgaria
  FALLBACK_IP_ADDRESS = '2a00:7145::180d:b3da';

  const [ipAddress, setIpAddress] = React.useState(() => {
    if (ip_address) {
      return ip_address;
    }
    return FALLBACK_IP_ADDRESS;
  });

  const [city, setCity] = React.useState('');
  const [region, setRegion] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [timezone, setTimezone] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchTime = React.useCallback(
    async function fetchTime() {
      try {
        const response = await fetch(
          `http://ip-api.com/json/${ipAddress}`
        );
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

    [ipAddress]
  );

  React.useEffect(() => {
    if (ipAddress) {
      console.log('fetching time');
      fetchTime();
    }
  }, [ipAddress, fetchTime]);

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
