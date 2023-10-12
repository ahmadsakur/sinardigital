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
        <label htmlFor={props.id} className="text-gray-600 text-sm font-medium">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <div className={`absolute inset-y-0 left-2 flex items-center pl-2 ${hasError ?'text-red-500': 'text-gray-500'}`}>
          {props.icon}
        </div>
        <input
          {...field}
          {...props}
          className={`border-2 rounded-sm px-4 py-2 focus:outline-none pl-10 w-full placeholder:text-gray-500 placeholder:text-sm ${
            hasError ? "border-red-500" : "border-gray-200"
          }`}
        />
      </div>
      {hasError && (
        <div className="text-red-500 text-sm font-medium">{meta.error}</div>
      )}
    </div>
  );
};

export default TextInput;
