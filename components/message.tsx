interface MessageProps {
  message: string;
  reversed?: boolean;
  avatarUrl?: string;
  name: string | null;
}

export default function MessageText({
  avatarUrl,
  message,
  reversed = false,
  name = 'anonyme',
}: MessageProps) {
  return reversed ? (
    <div className="flex space-x-2 justify-end mb-3">
      <div className="flex flex-col items-end">
        <p className="text-sm text-gray-600 text-end">{name}</p>
        <div className="mb-0 w-2 h-0 mt-0 border-transparent border-t-0 border-r-0 border-l-8 border-b-8 border-b-white"></div>
        <p className="text-md font-serif text-gray-900 px-3 py-2 bg-white mt-0">
          {message}
        </p>
      </div>
      <div
        className={`w-8 h-8 rounded-full bg-purple-300 bg-center bg-cover `}
        style={{ backgroundImage: 'url(' + avatarUrl + ')' }}
      />
    </div>
  ) : (
    <div className="flex space-x-2 mb-3">
      <div
        className={`w-8 h-8 rounded-full bg-purple-300 bg-center bg-cover `}
        style={{ backgroundImage: 'url(' + avatarUrl + ')' }}
      />
      <div>
        <p className="text-sm text-gray-600 ">{name}</p>
        <div className="mb-0 w-2 h-0 mt-0 border-transparent border-t-0 border-l-0 border-r-8 border-b-8 border-b-white"></div>
        <p className="text-md font-serif text-gray-900 px-3 py-2 bg-white mt-0">
          {message}
        </p>
      </div>
    </div>
  );
}
