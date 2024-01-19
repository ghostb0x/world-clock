import * as React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

interface ImageProps {
  children: React.ReactNode;
  timeOfDay: string;
}

function BackgroundImage({ children, timeOfDay }: ImageProps) {
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
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  filter: brightness(70%);
`;

export default BackgroundImage;
