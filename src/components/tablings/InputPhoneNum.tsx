import { useRef, useState } from 'react';
import { InputPhoneNumProps } from '@/types/Tabling.types';

const InputPhoneNum: React.FC<InputPhoneNumProps> = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const digitsOnly = rawValue.replace(/\D/g, '');

    const cursorPosition = e.target.selectionStart ?? rawValue.length;

    const countBeforeCursor = rawValue.slice(0, cursorPosition).replace(/\D/g, '').length;

    const formatted = formatPhoneNumber(digitsOnly);

    onChange(formatted);

    requestAnimationFrame(() => {
      if (inputRef.current) {
        const newCursor = getCursorPositionAfterFormat(formatted, countBeforeCursor);
        inputRef.current.setSelectionRange(newCursor, newCursor);
      }
    });
  };

  const formatPhoneNumber = (input: string): string => {
    if (input.length < 4) return input;
    if (input.length < 8) return input.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    return input.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
  };

  const getCursorPositionAfterFormat = (formatted: string, count: number) => {
    let digitsSeen = 0;
    for (let i = 0; i < formatted.length; i++) {
      if (/\d/.test(formatted[i])) digitsSeen++;
      if (digitsSeen === count) return i + 1;
    }
    return formatted.length;
  };

  return (
    <>
      <div className="text-xs select-none">전화번호</div>
      <div className="h-11 w-full flex flex-row items-center py-2.5 gap-2.5">
        <img src="/icons/tablings/phone.svg" className="w-6 h-6" />
        <input
          ref={inputRef}
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
      <hr className={`border-0 h-[1px] ${isFocused ? 'bg-primary-700' : 'bg-secondary-500-light-20'}`} />
    </>
  );
};

export default InputPhoneNum;
