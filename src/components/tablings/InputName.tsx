import React, { useState } from 'react';

type Props = {
  value: string;
  onChange: (val: string) => void;
};

const InputName: React.FC<Props> = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let filteredInput = e.target.value.replace(/[^a-zA-Z0-9ㄱ-ㅎ가-힣 ]/g, '');
    if (filteredInput.length > 8) {
      filteredInput = filteredInput.slice(0, 8);
    }
    onChange(filteredInput);
  };

  return (
    <div className="w-full mb-4">
      <div className="text-xs">이름</div>
      <div className="h-11 w-full flex flex-row items-center py-2.5 gap-2.5">
        <img src="/icons/person-plus.svg" className="w-6 h-6" alt="person icon" />
        <input
          type="text"
          value={value}
          onChange={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 focus:outline-none bg-inherit"
          placeholder="티노"
          maxLength={8}
        />
      </div>
      <hr className={`border-0 h-[1px] ${isFocused ? 'bg-primary-900' : 'bg-secondary-300'}`} />
    </div>
  );
};

export default InputName;
