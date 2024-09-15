import React, { useState } from 'react';

function InputBox({ id, label, type, placeholder, value, change }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full max-w-lg">
      <input
        type={type}
        id={id}
        value={value}
        onChange={change}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(!!value)}
        className={`block w-full px-4 py-3 mt-2 text-gray-700 duration-300 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#365486] ${
          isFocused || value ? 'pt-6' : ''
        }`}
      required />
      <label
        htmlFor={id}
        className={`absolute left-4 px-1 rounded-md  duration-300 transition-all transform bg-white ${
          isFocused || value
            ? '-translate-y-2 scale-75 top-1 text-[#365486]'
            : 'top-1/2 transform -translate-y-1/2 text-[#7FC7D9] text-xl'
        }`}
      >
        {placeholder}
      </label>
    </div>
  );
}

export default InputBox;
