import { QUERIES } from '@/styles/constants';
import * as React from 'react';
import styled from 'styled-components';

interface ShelfProps {
  timeOfDay: string;
  weather: {
    temp_f: number;
    feelsLike_f: number;
    condition: string;
  };
}
function BottomShelf({ timeOfDay, weather }: ShelfProps) {
  if (timeOfDay === 'Evening') {
    return (
      <Wrapper>
        <OverlayNight>
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
        </OverlayNight>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <OverlayDay></OverlayDay>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  height: 50vh;
`;

const OverlayNight = styled.div`
  color: var(--color-white);
  background-color: var(--color-black);
  height: 100%;
  opacity: 0.75;
  backdrop-filter: blur(100px);
`;

const OverlayDay = styled.div`
  color: var(--color-gray);
  background-color: var(--color-black);
  backdrop-filter: blur(20px);
`;

const StatGroup = styled.section`
  display: flex;
  flex-direction: column;
`;

const StatName = styled.h3`
  font: var(--font-h6-mobile);

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
