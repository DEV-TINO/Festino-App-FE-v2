import React, { useState } from 'react';

type Props = {
  value: string;
  onChange: (val: string) => void;
};

const formatPhoneNumber = (inputValue: string) => {
  const onlyNums = inputValue.replace(/\D/g, '');
  if (onlyNums.length > 3 && onlyNums.length < 8) {
    return onlyNums.replace(/(\d{3})(\d{1,4})/, '$1-$2');
  } else if (onlyNums.length >= 8) {
    return onlyNums.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
  }
  return onlyNums;
};

const InputPhoneNum: React.FC<Props> = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  return (
    <div className="w-full mb-4">
      <div className="text-xs">전화번호</div>
      <div className="h-11 w-full flex flex-row items-center py-2.5 gap-2.5">
        <img src="/icons/phone.svg" className="w-6 h-6" alt="phone icon" />
        <input
          type="tel"
          value={value}
          onChange={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 focus:outline-none bg-inherit"
          placeholder="010-1234-5678"
          maxLength={13}
        />
      </div>
      <hr className={`border-0 h-[1px] ${isFocused ? 'bg-primary-900' : 'bg-secondary-300'}`} />
    </div>
  );
};

export default InputPhoneNum;
