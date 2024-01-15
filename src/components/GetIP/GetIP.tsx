import * as React from 'react';
import { headers } from 'next/headers';

function GetIP() {
  const FALLBACK_IP_ADDRESS = '157.97.134.115';
  const forwardedFor = headers().get('x-forwarded-for');

  if (forwardedFor) {
    return forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS;
  }

  return headers().get('x-real-ip') ?? FALLBACK_IP_ADDRESS;
}

export default GetIP;
