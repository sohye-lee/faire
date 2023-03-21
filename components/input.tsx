interface InputProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'phone' | 'price' | 'textarea';
  placeholder?: string;
  required?: boolean;
  [key: string]: any;
}

export default function Input({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  register,
  ...rest
}: InputProps) {
  return (
    <div className="w-full">
      <label htmlFor={name} className="text-lg mb-2 font-serif font-medium">
        {label}
      </label>
      <div className="flex items-center relative w-full">
        {type == 'text' || type == 'email' ? (
          <input
            {...rest}
            {...register}
            id={name}
            type={type}
            placeholder={placeholder}
            className="w-full px-3 focus:ring-2 text-sm font-serif focus:ring-purple-500 py-3 border border-black"
            required={required}
          />
        ) : null}
        {type == 'price' ? (
          <div className="flex items-center relative w-full">
            <div className="absolute left-2 top-1/2 -translate-y-1/2">
              <span className="text-lg font-serif font-medium">$</span>
            </div>
            <input
              id={name}
              type="number"
              step="0.01"
              placeholder={placeholder}
              className="w-full px-6 focus:ring-2 text-sm font-serif focus:ring-purple-500 py-3 border border-black"
              {...register}
              {...rest}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <span className="text-lg font-serif font-medium">USD</span>
            </div>
          </div>
        ) : null}
        {type == 'textarea' ? (
          <textarea
            id={name}
            placeholder={placeholder}
            className="w-full px-3 focus:ring-2 text-sm font-serif focus:ring-purple-500 py-3 border border-black"
            rows={5}
            {...rest}
            {...register}
          ></textarea>
        ) : null}
        {type == 'phone' ? (
          <div className="flex items-stretch w-full">
            <span className="p-3 text-center border border-gray-500 bg-slate-100 border-r-0">
              +1
            </span>
            <input
              {...rest}
              {...register}
              id={name}
              type="text"
              placeholder="123-456-7890"
              required
              className="w-full ml-0 p-3 focus:ring-2 text-sm font-serif focus:ring-purple-500 border border-black"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
