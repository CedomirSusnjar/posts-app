import { ChangeEvent } from 'react';

type SelectProps = {
  defaultValue: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
};

export const Select = ({ defaultValue, onChange, options }: SelectProps) => {
  return (
    <select
      onChange={onChange}
      value={defaultValue === null ? '' : defaultValue}
      className="w-[300px] h-[32px] border border-slate-200 bg-white rounded-[8px] pl-2"
    >
      <option value="" hidden>
        Select option
      </option>
      {options.map((option: string) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
};
