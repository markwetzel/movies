import { isString, isStringEmpty } from './string';

export const parseDate = (date: string): Date => new Date(Date.parse(date));

export const formatDate = (dateInput: string | Date): string | undefined => {
  let parsedDate: Date;

  if (!isString(dateInput) || isStringEmpty(dateInput as string)) return;

  parsedDate = parseDate(dateInput as string);
  return parsedDate.toLocaleDateString();
};
