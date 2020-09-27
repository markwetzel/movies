import { isString } from './string';

export const parseDate = (date: string) => new Date(Date.parse(date));

export const formatDate = (dateInput: string | Date) => {
  let parsedDate: Date;
  parsedDate = isString(dateInput)
    ? parseDate(dateInput as string)
    : (dateInput as Date);

  return parsedDate.toLocaleDateString();
};
