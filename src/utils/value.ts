export type Value<T, TError = string> =
  | {
      value: T;
      error: null;
    }
  | {
      value: null;
      error: TError;
    };

export const value = {
  value: <T>(value: T): Value<T, any> => ({ value, error: null }),
  error: <TError>(error: TError): Value<any, TError> => ({ value: null, error })
};
