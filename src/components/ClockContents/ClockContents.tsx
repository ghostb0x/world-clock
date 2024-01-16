'use client';
import * as React from 'react';
import TimeDisplay from '../TimeDisplay';

interface ClockProps {
  ip_address: string;
}

interface TimeApiData {
  abbreviation: string;
  client_ip: string;
  datetime: string;
  day_of_week: number;
  day_of_year: number;
  dst: boolean;
  dst_from: string;
  dst_offset: number;
  dst_until: string;
  raw_offset: number;
  timezone: string;
  unixtime: number;
  utc_datetime: string;
  utc_offset: string;
  week_number: number;
}

function ClockContents({ ip_address }: ClockProps) {
  const FALLBACK_IP_ADDRESS = '157.97.134.115';

  const [ipAddress, setIpAddress] = React.useState(
    FALLBACK_IP_ADDRESS
  );

  const [timeResponse, setTimeResponse] =
    React.useState<TimeApiData | null>(null);
  const [city, setCity] = React.useState('');
  const [region, setRegion] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [timezone, setTimezone] = React.useState('');
  const [tzAbbreviation, setTzAbbreviation] = React.useState('');
  const [startTime, setStartTime] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  async function fetchTime() {
    try {
      const response = await fetch(
        `http://worldtimeapi.org/api/ip/${ipAddress}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTimeResponse(data);
        setStartTime(data.datetime);
        setTzAbbreviation(data.abbreviation);
        setTimezone(data.timezone);

        try {
          const location = await fetch(
            `http://ip-api.com/json/${ipAddress}`
          );
          if (location.ok) {
            const data = await location.json();
            console.log(data);
            setCity(data.city);
            setCountry(data.country);
            setRegion(data.regionName);
          } else {
            throw new Error('Failed to fetch location data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        throw new Error('Failed to fetch time');
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

  React.useEffect(() => {
    // if time is not set,
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <TimeDisplay
        tzAbbreviation={tzAbbreviation}
        timezone={timezone}
        location={{city, region, country}}
      />
      <p>IP {ip_address}</p>
    </>
  );
}
export default ClockContents;
