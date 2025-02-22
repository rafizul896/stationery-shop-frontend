interface FInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: any;
  error?: string;
  className?:string;
}

export default function FInput({
  label,
  type,
  placeholder,
  value,
  defaultValue,
  onChange,
  register,
  error,
  className
}: FInputProps) {
  return (
    <div className="flex flex-col space-y-2">
      {label && <label className="text-gray-700 font-medium">{label}</label>}
      <input
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...register}
        className={`text-sm w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-secondar focus:outline-none text-gray-900 ${className}`}
      />

      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}
