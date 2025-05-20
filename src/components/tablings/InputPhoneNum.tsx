import { useState } from "react";
import { InputPhoneNumProps } from "@/types/Tabling.types";

const InputPhoneNum: React.FC<InputPhoneNumProps> = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formatted = formatPhoneNumber(rawValue);
    onChange(formatted);
  };

  const formatPhoneNumber = (input: string): string => {
    const digits = input.replace(/\D/g, '');
    if (digits.length < 4) return digits;
    if (digits.length < 8) return digits.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    return digits.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
  };

  return (
    <>
      <div className="text-xs">전화번호</div>
      <div className="h-11 w-full flex flex-row items-center py-2.5 gap-2.5">
        <img src="/icons/tablings/phone.svg" className="w-6 h-6" />
        <input
          className="flex-1 focus:outline-none bg-inherit"
          type="tel"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="010-1234-5678"
          maxLength={13}
        />
      </div>
      <hr className={`border-0 h-[1px] ${isFocused ? 'bg-primary-900' : 'bg-secondary-500-light-20'}`} />
    </>
  );
};

export default InputPhoneNum;
