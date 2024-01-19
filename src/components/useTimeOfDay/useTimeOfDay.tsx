import * as React from 'react';
import { formatInTimeZone } from 'date-fns-tz';


function useTimeOfDay(tz: string) {

  const [time, setTime] = React.useState(Date.now());

  React.useEffect(() => {
    // check every 10 mins see if time has crossed into evening/morning
    const intervalId = window.setInterval(() => {
      setTime(Date.now());
    }, 10 * 60 * 1000);

    return () => {
      window.clearInterval(intervalId);
    };

    // NOTE: Intentionally running effect only on component mount
    // which occurs every hour by design
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


    const displayTime = formatInTimeZone(time, tz, 'HH:mm');
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
  

  return timeOfDay
}

export default useTimeOfDay;
