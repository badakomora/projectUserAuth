import React from "react";

interface AccountInputs {
  name: string;
  type: string;
  value: string;
  placeholder: string;
  disabled: boolean;
  onchange: React.ChangeEventHandler<HTMLInputElement>;
}

export const FancyInput: React.FC<AccountInputs> = ({
  name,
  type,
  value,
  placeholder,
  disabled,
  onchange,
}) => {
  return (
    <div className="row">
      <label>{name}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onchange}
        required
      />
    </div>
  );
};
