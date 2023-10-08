import * as dayjs from 'dayjs';

export function getStartTime(date: Date | string) {
  return dayjs(date).startOf('day').hour(9).minute(15).valueOf().toString();
}
