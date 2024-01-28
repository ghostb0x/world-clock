'use client';
import { QUERIES } from '@/styles/constants';
import * as React from 'react';
import styled from 'styled-components';
import { formatInTimeZone } from 'date-fns-tz';
import TimeIcon from '../TimeIcon';
import MapIcon from '../MapIcon';
import SearchDialog from '../SearchDialog';

interface Props {
  timezone: string;
  location: Record<string, string>;
  setManualCity: React.Dispatch<React.SetStateAction<string>>;
}

function TimeDisplay({ timezone, location, setManualCity }: Props) {
  const twentyFourHourFormat = 'HH:mm';
  const twelveHourFormat = 'h:mm';

  const [showLocationChange, setShowLocationChange] =
    React.useState(false);

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

  let locationText = '';

  for (const property in location) {
    if (!location[property]) {
      continue;
    }

    if (property === 'region' && location.region === location.city) {
      continue;
    }

    property === 'city'
      ? (locationText += location[property])
      : (locationText += `, ${location[property]}`);
  }

  const [timeOfDay, setTimeOfDay] = React.useState('Day');

  React.useEffect(() => {
    const displayTime = formatInTimeZone(
      time,
      timezone,
      twentyFourHourFormat
    );

    const hours = parseInt(displayTime.slice(0, 2));

    if (hours < 4) {
      setTimeOfDay('Evening');
    } else if (hours < 12) {
      setTimeOfDay('Morning');
    } else if (hours < 18) {
      setTimeOfDay('Afternoon');
    } else if (hours < 24) {
      setTimeOfDay('Evening');
    }
  }, [time, timezone]);

  return (
    <Wrapper>
      <Row1>
        <TimeIcon timeOfDay={timeOfDay} />
        <H4>Good {timeOfDay}</H4>
      </Row1>
      <Row3>
        <H3>It&apos;s {formatInTimeZone(time, timezone, 'PPPP')}</H3>
      </Row3>
      <Row2>
        <H1>{formatInTimeZone(time, timezone, twelveHourFormat)}</H1>
        <Timezone>{formatInTimeZone(time, timezone, 'aaa')}</Timezone>
      </Row2>

      <Row3>
        <H3>In {locationText}</H3>
      </Row3>
      <Row3>
        <SearchDialog
          setManualCity={setManualCity}
          className={showLocationChange ? 'visible' : ''}
        >
          <LocationButton
            onClick={() => setShowLocationChange(!showLocationChange)}
          >
            Change Location
            <Icon />
          </LocationButton>
        </SearchDialog>
      </Row3>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
`;
const Row1 = styled.div`
  align-items: start;
  display: flex;
  column-gap: 16px;
`;
const Row2 = styled.div`
  position: relative;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  @media ${QUERIES.tabletAndUp} {
    gap: 15px 10px;
  }
`;

const H4 = styled.h4`
  font: var(--font-h4-mobile);
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  color: var(--color-white);
  overflow-wrap: normal;

  @media ${QUERIES.tabletAndUp} {
    font: var(--font-h4-tablet);
  }

  @media ${QUERIES.desktopAndUp} {
    font: var(--font-h4-desktop);
  }
`;

const H1 = styled.h1`
  font: var(--font-h1-mobile);
  color: var(--color-white);
  margin-right: 10px;

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
  color: var(--color-white);

  @media ${QUERIES.tabletAndUp} {
    font: normal 300 2rem/1.75rem var(--font-family);
  }

  @media ${QUERIES.desktopAndUp} {
    font: normal 300 2.5rem/1.75rem var(--font-family);
    text-transform: uppercase;
  }
`;

const H3 = styled.h3`
  margin-top: 15px;
  font: var(--font-h3-mobile);
  letter-spacing: 0.15rem;
  text-transform: uppercase;
  color: var(--color-white);

  @media ${QUERIES.tabletAndUp} {
    font: var(--font-h3-tablet);
  }

  @media ${QUERIES.desktopAndUp} {
    font: var(--font-h3-desktop);
  }
`;

const Row3 = styled.div`
  margin-top: 10px;
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  @media ${QUERIES.tabletAndUp} {
    gap: 15px 10px;
  }
`;

const LocationButton = styled.button`
  --font-h7-desktop: normal var(--font-weight-regular) 1.2rem/1.75rem
    var(--font-family);
  --font-h7-tablet: normal var(--font-weight-regular) 1rem/1.75rem
    var(--font-family);
  --font-h7-mobile: normal var(--font-weight-regular) 1rem/1.75rem
    var(--font-family);
  font: var(--font-h7-mobile);
  color: var(--color-white);
  margin-left: -15px;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 1rem;

  &:hover {
    background-color: rgba(70, 70, 70, 0.7);
    transition: background-color 0.5s ease-in-out;
  }

  @media ${QUERIES.tabletAndUp} {
    font: var(--font-h7-tablet);
  }

  @media ${QUERIES.desktopAndUp} {
    font: var(--font-h7-desktop);
  }
`;

const Icon = styled(MapIcon)`
  margin-left: 15px;
`;


export default TimeDisplay;
