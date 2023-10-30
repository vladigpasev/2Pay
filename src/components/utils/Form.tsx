import { NotificationType, useDispatchNotification } from '@/components/utils/Notifyers';
import React, { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface Field<T> {
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  isDisabled?: boolean;
  transform?: (input: string) => T;
  validate?: (value: T) => string | null;
}

export type Fields = (any[] | Field<any>)[];

type OnFormSubmit = (formData: any) => void;

type Props = React.PropsWithChildren<{
  buttonText: string;
  fields: Fields;
  canSubmit: boolean;
  error: string | null;
  onSubmit: OnFormSubmit;
  icon?: IconDefinition;
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

function flatten(value: any) {
  const array = [] as any[];

  for (const field of value) Array.isArray(field) ? array.push(...flatten(field)) : array.push(field);

  return array;
}

function renderFields(
  fields: Fields,
  rawFormData: any,
  setRawFormData: (data: any) => void,
  errors: Record<string, string | null>
) {
  return fields.map((field, index) =>
    Array.isArray(field) ? (
      <div key={index} className='grid grid-cols-2 gap-3'>{renderFields(field, rawFormData, setRawFormData, errors)}</div>
    ) : (
      <div className='flex align-top flex-col w-full items-start gap-1' key={field.id}>
        <label htmlFor={field.id} className='mb-0 pb-1 leading-4 font-bold'>
          {field.name}:
        </label>
        {field.type === 'longText' ? (
          <textarea
            className={`w-full rounded-lg bg-base-100 border border-base-content p-2 text-base-content ${errors[field.id] ? 'border-rose-600' : ''
              } ${field.isDisabled ? 'brightness-50' : ''}`}
            onInput={e => setRawFormData({ ...rawFormData, [field.id]: (e.target as any).value })}
            id={field.id}
            placeholder={field.placeholder}
            value={rawFormData[field.id]}
            disabled={field.isDisabled}
          />
        ) : (
          <input
            className={`w-full rounded-lg bg-base-100 border border-base-content p-2 text-base-content ${errors[field.id] ? 'border-rose-600' : ''
              } ${field.isDisabled ? 'brightness-50' : ''}`}
            onInput={e => setRawFormData({ ...rawFormData, [field.id]: (e.target as any).value })}
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            value={rawFormData[field.id]}
            disabled={field.isDisabled}
          />
        )}
        {errors[field.id] && <p className='text-rose-600 text-sm'>{errors[field.id]}</p>}
      </div>
    )
  );
}

export function CustomForm({ buttonText, fields, canSubmit, error, onSubmit, children, icon }: Props) {
  const flatFields = useMemo<Field<any>[]>(() => flatten(fields), []);

  const [rawFormData, setRawFormData] = useState<Record<string, string>>(() =>
    Object.fromEntries(flatFields.map(field => [field.id, field.defaultValue ?? '']))
  );
  const [errors, setErrors] = useState({} as Record<string, string>);
  const dispatchNotification = useDispatchNotification();

  const submitCallback = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!canSubmit) return;

      const [errors, formData] = getFormData(flatFields, rawFormData);
      setErrors(errors);

      if (Object.keys(errors).length === 0) onSubmit(formData);
    },
    [rawFormData, canSubmit, setErrors, onSubmit, dispatchNotification]
  );

  return (
    <form className='space-y-5 w-full sm:w-[400px]' onSubmit={submitCallback} noValidate>
      {renderFields(fields, rawFormData, setRawFormData, errors)}
      {error && <p className='text-rose-600 text-lg text-center'>{error}</p>}
      <div className='flex flex-col w-full border-opacity-50'>
        <button
          className={`w-full bg-primary rounded flex p-2 text-primary-content transition-all ${canSubmit ? 'hover:brightness-125' : 'cursor-default opacity-50'
            }`}
        >
          {icon && <FontAwesomeIcon className='my-auto' icon={icon!} />}
          <span className='flex flex-grow justify-center'>{buttonText}</span>
        </button>
        {children}
      </div>
    </form>
  );
}

