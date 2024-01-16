import * as React from 'react';
import { formatInTimeZone } from 'date-fns-tz';
import Image from 'next/image';
import styled from 'styled-components';

interface ImageProps {
  children: React.ReactNode;
  timezone: string;
}

function BackgroundImage({ children, timezone }: ImageProps) {
  const [time, setTime] = React.useState(Date.now());

  React.useEffect(() => {
    // check once per hour to see if time has crossed into evening/morning
    const intervalId = window.setInterval(() => {
      setTime(Date.now());
    }, 60 * 60 * 1000);

    return () => {
      window.clearInterval(intervalId);
    };

    // NOTE: Intentionally running effect only on component mount
    // which occurs every hour by design
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayTime = formatInTimeZone(time, timezone, 'HH:mm');

  const hours = parseInt(displayTime.slice(0, 2));

  let timeOfDay: string;
  if (hours < 4) {
    timeOfDay = 'Evening';
  } else if (hours < 12) {
    timeOfDay = 'Morning';
  } else if (hours < 18) {
    timeOfDay = 'Afternoon';
  } else if (hours < 24) {
    timeOfDay = 'Evening';
  } else {
    timeOfDay = 'Day';
  }

  return (
    <Wrapper>
      <BGImage
        alt="Scenic background image"
        src={
          timeOfDay === 'Evening'
            ? '/assets/desktop/bg-image-nighttime.jpg'
            : '/assets/desktop/bg-image-daytime.jpg'
        }
        width={1440}
        height={800}
        quality={80}
        priority={true}
      />
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  overflow: clip;
  width: 100%;
  height: 100dvh;
`;

const BGImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  filter: brightness(80%)
`

export default BackgroundImage;
