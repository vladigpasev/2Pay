import {
  NotificationType,
  useDispatchNotification,
} from "@/components/Notifyers";
import { trpc } from "@/trpc/client";
import React, { FormEvent, useCallback, useEffect, useRef } from "react";

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
  onSubmit: OnFormSubmit;
}>;

function getFormData(
  fields: Field<any>[],
  rawFormData: Record<string, string>
) {
  let error: string | null = null;
  const formData: any = {};

  for (const field of fields) {
    const transformFunc = field.transform ?? ((value: any) => value);
    const validateFunc = field.validate ?? (() => null);

    const value = transformFunc(rawFormData[field.id]);
    error = validateFunc(value);

    if (error != null) return [error, formData];

    formData[field.id] = value;
  }

  return [null, formData];
}

export function CustomForm({ buttonText, fields, onSubmit, children }: Props) {
  const rawFormData = useRef({} as Record<string, string>);
  const dispatchNotification = useDispatchNotification();

  useEffect(() => {
    for (const field of fields) rawFormData.current[field.id] = "";
  }, []);

  const submitCallback = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const [error, formData] = getFormData(fields, rawFormData.current);
      if (error != null) {
        dispatchNotification({
          type: NotificationType.Error,
          message: error,
        });

        return;
      }

      onSubmit(formData);
    },
    [onSubmit, dispatchNotification]
  );

  const registerMutation = trpc.authentication.registerUser.useMutation();

  return (
    <form className="space-y-5 w-full sm:w-[400px]" onSubmit={submitCallback}>
      {fields.map((field) => (
        <div className="grid w-full items-center gap-1" key={field.id}>
          <label htmlFor={field.id} className="mb-0 pb-0 leading-4 font-bold">
            {field.name}:
          </label>
          <input
            className="w-full rounded-lg bg-base-100 border border-base-content p-2"
            onInput={(e) =>
              (rawFormData.current[field.id] = (e.target as any).value)
            }
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
          />
        </div>
      ))}
      <div className="flex flex-col w-full border-opacity-50">
        <button
          type="button"
          onClick={() =>
            registerMutation.mutate({
              authProvider: "email",
              email: "andr.nikola.08@gmail.com",
              password: "123123123",
              username: "GoshkuPompata",
            })
          }
          className="w-full bg-primary rounded p-2 text-primary-content transition-all hover:brightness-125"
        >
          {buttonText}
        </button>
        {children}
      </div>
    </form>
  );
}
