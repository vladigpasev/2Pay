import { NotificationType, useDispatchNotification } from '@/components/utils/Notifyers';
import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react';

export interface Field<T> {
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  transform?: (input: string) => T;
  validate?: (value: T) => string | null;
}

type OnFormSubmit = (formData: any) => void;

type Props = React.PropsWithChildren<{
  buttonText: string;
  fields: Field<any>[];
  canSubmit: boolean;
  error: string | null;
  onSubmit: OnFormSubmit;
}>;

function getFormData(fields: Field<any>[], rawFormData: Record<string, string>): [Record<string, string>, any] {
  const formData: any = {};

  const errors: Record<string, string> = {};
  for (const field of fields) {
    const transformFunc = field.transform ?? ((value: any) => value);
    const validateFunc = field.validate ?? (() => null);

    const value = transformFunc(rawFormData[field.id]);
    const error = validateFunc(value);

    if (error != null) errors[field.id] = error;

    formData[field.id] = value;
  }

  return [errors, formData];
}

export function CustomForm({ buttonText, fields, canSubmit, error, onSubmit, children }: Props) {
  const [errors, setErrors] = useState({} as Record<string, string>);
  const rawFormData = useRef({} as Record<string, string>);
  const dispatchNotification = useDispatchNotification();

  useEffect(() => {
    for (const field of fields) rawFormData.current[field.id] = '';
  }, []);

  const submitCallback = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!canSubmit) return;

      const [errors, formData] = getFormData(fields, rawFormData.current);
      setErrors(errors);

      if (Object.keys(errors).length === 0) onSubmit(formData);
    },
    [canSubmit, setErrors, onSubmit, dispatchNotification]
  );

  return (
    <form className='space-y-5 w-full sm:w-[400px]' onSubmit={submitCallback} noValidate>
      {fields.map(field => (
        <div className='grid w-full items-center gap-1' key={field.id}>
          <label htmlFor={field.id} className='mb-0 pb-0 leading-4 font-bold'>
            {field.name}:
          </label>
          <input
            className={`w-full rounded-lg bg-base-100 border border-base-content p-2 ${
              errors[field.id] ? 'border-rose-600' : ''
            }`}
            onInput={e => (rawFormData.current[field.id] = (e.target as any).value)}
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
          />
          {errors[field.id] && <p className='text-rose-600 text-sm'>{errors[field.id]}</p>}
        </div>
      ))}
      {error && <p className='text-rose-600 text-lg text-center'>{error}</p>}
      <div className='flex flex-col w-full border-opacity-50'>
        <button
          className={`w-full bg-primary rounded p-2 text-primary-content transition-all ${
            canSubmit ? 'hover:brightness-125' : 'cursor-default opacity-50'
          }`}
        >
          {buttonText}
        </button>
        {children}
      </div>
    </form>
  );
}
