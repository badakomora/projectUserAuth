import React from "react";

interface AccountInputs {
  name: string;
  type: string;
  value: string;
  onchange: React.ChangeEventHandler<HTMLInputElement>;
}

export const FancyInput: React.FC<AccountInputs> = ({
  name,
  type,
  value,
  onchange,
}) => {
  return (
    <div className="row">
      <label>{name}</label>
      <input type={type} value={value} onChange={onchange} required/>
    </div>
  );
};
