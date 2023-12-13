import React from "react";

export const CustomInput = ({
  name,
  type,
  placeholder,
  onChange,
  dataLabel,
  label,
  value,
  readOnly,
  icon: Icon,
}) => {
  return (
    <div className="flex flex-col gap-1 relative">
      <label>
        {label}
        {dataLabel === "" && <span className="text-red-700">*</span>}
      </label>
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        name={name}
        className="p-2 text-black outline-none rounded-lg"
        onChange={onChange}
        readOnly={readOnly || ""}
      />
      <div className="absolute bottom-2 right-2 text-2xl text-black">
        <Icon size="20" />
      </div>
    </div>
  );
};
