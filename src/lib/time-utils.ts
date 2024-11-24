export const getFormattedDate = (unixTimestamp: number | undefined, locale: string): string => {
  if (!unixTimestamp || isNaN(unixTimestamp)) {
    return '-';
  }
  const date = new Date(unixTimestamp * 1000);
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
};

export const formatLocalizedUTCTimestamp = (unixTimestamp: number | undefined, locale: string): string => {
  if (!unixTimestamp || isNaN(unixTimestamp)) {
    return '-';
  }
  const date = new Date(unixTimestamp * 1000);
  return (
    new Intl.DateTimeFormat(locale, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC',
      hour12: false,
    })
      .format(date)
      .replace(/,/g, '') + ' UTC'
  );
};
