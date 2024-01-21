import { QUERIES } from '@/styles/constants';
import * as React from 'react';
import styled from 'styled-components';

interface ShelfProps {
  className: 'visible' | 'hidden';
  timeOfDay: string;
  weather: {
    temp_f: number;
    feelsLike_f: number;
    condition: string;
  };
}
function BottomShelf({ className, timeOfDay, weather }: ShelfProps) {
  const innerContents = (
    <>
      <StatGroup>
        <StatName>Current Weather</StatName>
        <StatValue>{weather.condition}</StatValue>
      </StatGroup>
      <StatGroup>
        <StatName>Current Temperature (℉)</StatName>
        <StatValue>{weather.temp_f}°</StatValue>
      </StatGroup>
      <StatGroup>
        <StatName>Feels Like (℉)</StatName>
        <StatValue>{weather.feelsLike_f}°</StatValue>
      </StatGroup>
    </>
  );

  return (
    <Wrapper className={className}>
      {timeOfDay === 'Evening' ? (
        <OverlayNight>{innerContents}</OverlayNight>
      ) : (
        <OverlayDay>{innerContents}</OverlayDay>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  will-change: transform;
  transition: transform 1s ease-in-out;
  transform: translateY(100%); // Start offscreen

  &.visible {
    transform: translateY(0); // Slide in
  }

  &.hidden {
    transform: translateY(100%); // Slide out
  }
`;

const Overlay = styled.div`
  padding: 48px 26px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

const OverlayNight = styled(Overlay)`
  color: var(--color-white);
  background-color: var(--color-black);
  height: 100%;
  backdrop-filter: blur(20px);
`;

const OverlayDay = styled(Overlay)`
  color: var(--color-black);
  background-color: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(5px);
`;

const StatGroup = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media ${QUERIES.tabletAndUp} {
    flex-direction: column;
  }
`;

const StatName = styled.h3`
  font: var(--font-h6-mobile);
  letter-spacing: 0.1625rem;
  text-transform: uppercase;

  @media ${QUERIES.tabletAndUp} {
    font: var(--font-h6-tablet);
  }

  @media ${QUERIES.desktopAndUp} {
    font: var(--font-h6-desktop);
  }
`;

const StatValue = styled.p`
  font: var(--font-h2-mobile);

  @media ${QUERIES.tabletAndUp} {
    font: var(--font-h2-tablet);
  }

  @media ${QUERIES.desktopAndUp} {
    font: var(--font-h2-desktop);
  }
`;

export default BottomShelf;
