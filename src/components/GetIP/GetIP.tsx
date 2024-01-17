import * as React from 'react';
import { headers } from 'next/headers';

function GetIP() {
  const forwardedFor = headers().get('x-forwarded-for');

  if (forwardedFor) {
    return forwardedFor.split(',')[0];
  }

  return headers().get('x-real-ip');
}

export default GetIP;
