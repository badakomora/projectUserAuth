import React from "react";

interface AccountInputs {
  name: string;
  type: string;
  value: string;
  disabled: boolean;
  onchange: React.ChangeEventHandler<HTMLInputElement>;
}

export const FancyInput: React.FC<AccountInputs> = ({
  name,
  type,
  value,
  disabled,
  onchange,
}) => {
  return (
    <div className="row">
      <label>{name}</label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={onchange}
        required
      />
    </div>
  );
};
