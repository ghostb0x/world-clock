import * as React from 'react';
import Image from 'next/image';

interface TimeIconProps {
  timeOfDay: string;
}

function TimeIcon({ timeOfDay }: TimeIconProps) {
  return (
    <div>
      <Image
        src={
          timeOfDay === 'Evening'
            ? 'assets/desktop/icon-moon.svg'
            : 'assets/desktop/icon-sun.svg'
        }
        priority={true}
        alt={timeOfDay === 'Evening' ? 'moon icon' : 'sun icon'}
        width={28}
        height={28}
        quality={80}
      />
    </div>
  );
}

export default TimeIcon;
