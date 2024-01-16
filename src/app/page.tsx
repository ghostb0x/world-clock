import React from 'react';
import TimeDisplay from '@/components/TimeDisplay';
import GetIP from '@/components/GetIP';
import ClockContents from '@/components/ClockContents';

export default function Home() {
  const ip_address = GetIP();

  return <ClockContents ip_address={ip_address} />;
}
