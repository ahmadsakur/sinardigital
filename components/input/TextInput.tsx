import React from "react";
import { useField } from "formik";

interface TextInputProps {
  id: string;
  name: string;
  placeholder: string;
  type: string;
  icon: React.ReactElement;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  defaultValue?: string | number;
  ref?: React.Ref<HTMLInputElement>;
}

const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const hasError = meta.touched && meta.error;
  return (
    <div className="flex flex-col gap-2 w-full relative">
      {label && (
        <label htmlFor={props.id} className="text-neutral-200 text-sm font-medium">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <div className={`absolute inset-y-0 left-2 flex items-center pl-2 ${hasError ?'text-red-400': 'text-neutral-200'}`}>
          {props.icon}
        </div>
        <input
          {...field}
          {...props}
          autoComplete="off"
          className={` bg-black border text-sm text-neutral-300 focus:border-neutral-200 rounded-lg px-4 focus:outline-none pl-10 py-2.5 w-full placeholder:text-neutral-600 placeholder:text-sm ${
            hasError ? "border-red-400" : "border-neutral-700"
          }`}
        />
      </div>
      {hasError && (
        <div className="text-red-400 text-sm font-medium">{meta.error}</div>
      )}
    </div>
  );
};

export default TextInput;
