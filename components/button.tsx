import { mergeClass } from '../libs/client/utils';

interface ButtonProps {
  large?: boolean;
  filled?: boolean;
  text: string;
  addClass?: string;
  children?: React.ReactNode;
  loading?: boolean;
  [key: string]: any;
}

export default function Button({
  large = true,
  filled,
  onClick,
  text,
  addClass,
  children,
  loading = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={mergeClass(
        `capitalize transition flex items-center justify-center ${
          filled
            ? 'bg-black hover:bg-gray-800 text-white border-black'
            : 'bg-white hover:bg-slate-100 text-gray-800 border-gray-800'
        }  border-2  focus:outline-none focus:ring-1 focus:ring-purple-500`,
        large ? `w-full text-sm py-3 ${addClass}` : `text-xs py-3  ${addClass}`
      )}
      onClick={onClick}
    >
      <span
        dangerouslySetInnerHTML={{ __html: loading ? 'Loading···' : text }}
      />
      {children}
    </button>
  );
}
