import { useState } from "react";
import { InputNameProps } from "@/types/Tabling.types";


const InputName: React.FC<InputNameProps> = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let filtered = e.target.value.replace(/[^a-zA-Z0-9ㄱ-ㅎ가-힣 ]/g, '');
    if (filtered.length > 5) {
      filtered = filtered.slice(0, 5);
    }
    onChange(filtered);
  };

  return (
    <>
      <div className="text-xs">이름</div>
      <div className="h-11 w-full flex flex-row items-center py-2.5 gap-2.5">
        <img src="/icons/tablings/person.svg" className="w-6 h-6" />
        <input
          className="flex-1 focus:outline-none bg-inherit"
          value={value}
          placeholder="티노"
          type="text"
          onChange={handleInput}
          maxLength={5}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      <hr className={`mb-[30px] border-0 h-[1px] ${isFocused ? 'bg-primary-900' : 'bg-secondary-500-light-20'}`} />
    </>
  );
};

export default InputName;
