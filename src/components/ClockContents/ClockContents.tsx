'use client';
import * as React from 'react';
import TimeDisplay from '../TimeDisplay';

interface ClockProps{
  ip_address: string;
}

function ClockContents({ip_address}: ClockProps) {

  const FALLBACK_IP_ADDRESS = '157.97.134.115';


  const [ipAddress, setIpAddress] = React.useState(
    FALLBACK_IP_ADDRESS
  );
  const [time, setTime] = React.useState('');
  const [timezone, setTimezone] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchTime() {
      try {
        const response = await fetch(
          `http://worldtimeapi.org/api/ip/${ipAddress}.txt`
        );
        if (response.ok) {
          const text = await response.text();
          setTime(text);
        } else {
          throw new Error('Failed to fetch time');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (ipAddress) {
      fetchTime();
    }
    if (time) {
      console.log(time)
    }

  }, [ipAddress]);

  

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <TimeDisplay
        timezone="BST"
        time={'23:14'}
      />
      <p>IP {ip_address}</p>
    </>
  );
}
export default ClockContents;
