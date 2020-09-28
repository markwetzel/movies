export const isString = (value: any): boolean =>
  typeof value === 'string' || value instanceof String;

export const isStringEmpty = (value: string): boolean =>
  !value || value.length === 0;
