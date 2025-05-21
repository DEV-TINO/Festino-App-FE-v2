import { useState } from 'react';
import { InputPersonNumberProps } from '@/types/Tabling.types';

const InputPersonNum: React.FC<InputPersonNumberProps> = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handlePersonNumInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    const num = Number(digitsOnly.slice(0, 2));
    onChange(num);
  };

  return (
    <>
      <div className="text-xs">인원 수</div>
      <div className="h-11 w-full flex flex-row items-center py-2.5 gap-2.5">
        <img src="/icons/tablings/person-plus.svg" className="w-6 h-6" />
        <input
          className="flex-1 focus:outline-none bg-inherit"
          type="text"
          placeholder="00명"
          inputMode="numeric"
          pattern="\d*"
          value={value ? value : ''}
          maxLength={2}
          onChange={handlePersonNumInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      <hr className={`border-0 h-[1px] ${isFocused ? 'bg-primary-700' : 'bg-secondary-500-light-20'}`} />
    </>
  );
};

export default InputPersonNum;
