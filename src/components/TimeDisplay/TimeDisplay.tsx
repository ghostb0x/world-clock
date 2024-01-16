'use client';
import { QUERIES } from '@/styles/constants';
import * as React from 'react';
import styled from 'styled-components';
import { formatInTimeZone } from 'date-fns-tz';

interface Props {
  timezone: string;
  location: {
    city: string;
    region: string;
    country: string;
  };
}

function TimeDisplay({ timezone, location }: Props) {
  const twentyFourHourFormat = 'HH:mm';
  const twelveHourFormat = 'hh:mm bbbb';

  // const timestamp = new Date(startTime).getTime()
  const [time, setTime] = React.useState(Date.now());

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(Date.now());
    }, 10 * 1000);

    return () => {
      window.clearInterval(intervalId);
    };

    // NOTE: Intentionally running effect only on component mount
    // which occurs every 10 seconds by design
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const locationText = `${location.city}, ${location.region}, ${location.country}`;

  return (
    <Wrapper>
      <Row>
        <H4>Good Evening, It&apos;s Currently</H4>
      </Row>
      <Row>
        <H1>
          {formatInTimeZone(time, timezone, twentyFourHourFormat)}
        </H1>
        <Timezone>{formatInTimeZone(time, timezone, 'zzz')}</Timezone>
      </Row>
      <Row>
        <H3>In {locationText}</H3>
      </Row>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: baseline;
  gap: 54.7px 10px;

  @media ${QUERIES.tabletAndUp} {
    gap: 15px;
  }
`;

const H4 = styled.h4`
  font: var(--font-h4-mobile);
  letter-spacing: 0.15rem;
  text-transform: uppercase;

  @media ${QUERIES.tabletAndUp} {
    font: var(--font-h4-tablet);
  }

  @media ${QUERIES.desktopAndUp} {
    font: var(--font-h4-desktop);
  }
`;

const H1 = styled.h1`
  font: var(--font-h1-mobile);

  @media ${QUERIES.tabletAndUp} {
    font: var(--font-h1-tablet);
  }

  @media ${QUERIES.desktopAndUp} {
    font: var(--font-h1-desktop);
  }
`;

const Timezone = styled.p`
  text-transform: uppercase;
  font: normal 300 0.9375rem/1.75rem var(--font-family);

  @media ${QUERIES.tabletAndUp} {
    font: normal 300 2rem/1.75rem var(--font-family);
  }

  @media ${QUERIES.desktopAndUp} {
    font: normal 300 2.5rem/1.75rem var(--font-family);
    text-transform: uppercase;
  }
`;

const H3 = styled.h3`
  font: var(--font-h3-mobile);
  letter-spacing: 0.15rem;
  text-transform: uppercase;

  @media ${QUERIES.tabletAndUp} {
    font: var(--font-h3-tablet);
  }

  @media ${QUERIES.desktopAndUp} {
    font: var(--font-h3-desktop);
  }
`;

export default TimeDisplay;
