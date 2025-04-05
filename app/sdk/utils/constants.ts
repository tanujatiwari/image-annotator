import moment from 'moment';

export function getFormattedTimeDifferenceFromNow(
  startTime: Date | string,
  endTime?: Date | string
): string {
  const diffInMinutes = moment(endTime).diff(startTime, 'minutes');
  let result = '';
  if (diffInMinutes >= 60) {
    const diffInHours = moment(endTime).diff(startTime, 'hours');
    if (diffInHours >= 24) {
      const diffInDays = moment(endTime).diff(startTime, 'days');
      result = `${diffInDays} day(s) ${diffInHours % 24} hour(s) ago`;
    } else {
      result = `${diffInHours} hour(s) ${diffInMinutes % 60} min ago`;
    }
  } else {
    result = diffInMinutes === 0 ? 'Just now' : `${diffInMinutes} mins ago`;
  }
  return result;
}
