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
    uv: number;
  };
}
function BottomShelf({ className, timeOfDay, weather }: ShelfProps) {
  const innerContents = (
    <ContentsWrapper>
      <Stats>
        <StatGroup>
          <StatName>Current Weather</StatName>
          <StatValue>{weather.condition}</StatValue>
        </StatGroup>
        <StatGroup>
          <StatName>UV Index</StatName>
          <StatValue>{weather.uv}</StatValue>
        </StatGroup>
        <StatGroup>
          <StatName>Current Temperature (°F)</StatName>
          <StatValue>{weather.temp_f}°</StatValue>
        </StatGroup>
        <StatGroup>
          <StatName>Feels Like (°F)</StatName>
          <StatValue>{weather.feelsLike_f}°</StatValue>
        </StatGroup>
      </Stats>
    </ContentsWrapper>
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
    transform: translateY(0); // Slide up
  }

  &.hidden {
    transform: translateY(100%); // Slide down
  }
`;

const Overlay = styled.div`
  padding: 48px 26px;
  padding-right: clamp(26px, 15vw - 38px, 120px);

  @media ${QUERIES.tabletAndUp} {
    padding: 120px clamp(1.1rem, 7.1vw + 0.25rem, 10rem);
  }
`;

const OverlayNight = styled(Overlay)`
  color: var(--color-white);
  background-color: rgba(0, 0, 0, 0.75);
  height: 100%;
  backdrop-filter: blur(20px);
`;

const OverlayDay = styled(Overlay)`
  color: var(--color-black);
  background-color: rgba(255, 255, 255, 0.5);

  backdrop-filter: blur(5px);
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatGroup = styled.article`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media ${QUERIES.tabletAndUp} {
    flex-direction: column;
  }
`;

const Stats = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  @media ${QUERIES.tabletAndUp} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px 80px;
  }
`;

const StatName = styled.h3`
  font: var(--font-h6-mobile);
  letter-spacing: 0.1625rem;
  text-transform: uppercase;
  margin-right: 50px;

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

const LocationInfo = styled.div`
  margin-top: 50px;
`;

const LocationNote = styled.p`
  font: var(--font-h6-mobile);

  @media ${QUERIES.tabletAndUp} {
    font: var(--font-h6-tablet);
  }

  @media ${QUERIES.desktopAndUp} {
    font: var(--font-h6-desktop);
  }
`;

export default BottomShelf;
