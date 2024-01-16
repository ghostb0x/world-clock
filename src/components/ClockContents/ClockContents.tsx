'use client';
import * as React from 'react';
import TimeDisplay from '../TimeDisplay';

interface ClockProps {
  ip_address: string;
}

function ClockContents({ ip_address }: ClockProps) {
  const FALLBACK_IP_ADDRESS = '157.97.134.115';

  const [ipAddress, setIpAddress] = React.useState(
    FALLBACK_IP_ADDRESS
  );

  const [city, setCity] = React.useState('');
  const [region, setRegion] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [timezone, setTimezone] = React.useState('');
  const [tzAbbreviation, setTzAbbreviation] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

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
  }

  React.useEffect(() => {
    if (ipAddress) {
      console.log('fetching time');
      fetchTime();
    }
  }, [ipAddress]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <TimeDisplay
        timezone={timezone}
        location={{ city, region, country }}
      />
      <p>IP {ip_address}</p>
    </>
  );
}
export default ClockContents;
