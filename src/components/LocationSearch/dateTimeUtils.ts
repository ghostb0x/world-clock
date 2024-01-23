// dateTimeUtils.ts
export const formatDateTime = (dateTime: string): string => {
    const dateTimeString = JSON.stringify(dateTime);
    return dateTimeString.slice(1, dateTimeString.length - 1);
  };
  
  export const formatTimeZone = (timeZone: string | null): string => {
    if (!timeZone) {
      return '';
    }
    return timeZone.replace('__', '/');
  };
  