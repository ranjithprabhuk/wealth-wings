import * as dayjs from 'dayjs';

export function getEndTime(date: Date | string) {
  return dayjs(date).startOf('day').hour(15).minute(30).valueOf().toString();
}
