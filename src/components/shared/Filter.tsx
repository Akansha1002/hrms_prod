
import DatePicker from '@/components/ui/DatePicker'
import dayjs from 'dayjs'
import { Column } from '@tanstack/react-table';


import { useState, useEffect } from 'react';
import Input from '../ui/Input';




// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();

  const { filterVariant } = column.columnDef.meta ?? {};

  const [dateRange, setDateRange] = useState<
    [Date | null, Date | null]>
    ([null, null]);




  const handleChange = (value: string | number) => {
    column.setFilterValue(value);
  };

  const handleRangePickerChange = (date: [Date | null, Date | null]) => {
    console.log('Selected range date', date)
    setDateRange(date)
    column.setFilterValue(date);

  }

  return filterVariant === 'date' ? (
    <div>
      <DatePicker.DatePickerRange
        placeholder="Select dates range"
        value={dateRange}
        onChange={handleRangePickerChange}
        size='sm'
      />
    </div>
  ) : filterVariant === 'number' ? (
    <DebouncedInput
      className="w-24 rounded border shadow placeholder:text-center"
      onChange={handleChange}
      placeholder="Search"
      type="number"
      value={(columnFilterValue ?? '') as string}
    />
  ) : filterVariant === 'text' ? (
    <DebouncedInput
      className="w-24 rounded border shadow placeholder:text-center"
      onChange={handleChange}
      placeholder="Search"
      type="text"
      value={(columnFilterValue ?? '') as string}
    />
  ) : null; // No filter applied

}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 200,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return <Input {...props} size='sm' value={value} onChange={(e) => setValue(e.target.value)} />;
}