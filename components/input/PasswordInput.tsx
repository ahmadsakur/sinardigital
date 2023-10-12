import React from "react";
import { useField } from "formik";
import { BiShow, BiHide } from "react-icons/bi";

interface PasswordInputProps {
  id: string;
  name: string;
  placeholder: string;
  icon: React.ReactElement;
  label?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, ...props }) => {
  const [showPassword, setShowPassword] = React.useState(false);
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
        <div
          className={`absolute inset-y-0 left-2 flex items-center pl-2 ${
            hasError ? "text-red-400" : "text-gray-500"
          }`}
        >
          {props.icon}
        </div>
        <input
          {...field}
          {...props}
          type={showPassword ? "text" : "password"}
          className={` bg-black border text-sm text-neutral-300 focus:border-neutral-200 rounded-lg px-4 focus:outline-none pl-10 py-2.5 w-full placeholder:text-neutral-600 placeholder:text-sm ${
            hasError ? "border-red-400" : "border-neutral-700"
          }`}
        />
        <div
          className={`absolute inset-y-0 right-2 flex items-center pr-2 text-gray-500 cursor-pointer`}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <BiHide /> : <BiShow />}
        </div>
      </div>
      {hasError && (
        <div className="text-red-400 text-sm font-medium">{meta.error}</div>
      )}
    </div>
  );
};

export default PasswordInput;
