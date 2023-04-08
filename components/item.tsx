import Link from 'next/link';
import { RiHeart3Line, RiChat3Line } from 'react-icons/ri';

interface ItemProps {
  id: number;
  name: string;
  price: number;
  description: string;
  comments: number;
  liked: number;
}

export default function Item({
  name,
  price = 0,
  comments = 0,
  liked = 0,
  id,
  description,
}: ItemProps) {
  return (
    <div className="border border-gray-200 h-full">
      <div className="w-full aspect-square bg-gray-100 relative">
        <div className="absolute top-2 right-2 flex items-center justify-end space-x-3">
          <button className="flex items-center space-x-1">
            <RiHeart3Line className="" width="24" height="24" />
            <span>{liked}</span>
          </button>
          <button className="flex items-center space-x-1">
            <RiChat3Line className="" width="24" height="24" />
            <span>{comments}</span>
          </button>
        </div>
      </div>
      <div className="p-3 h-32 flex flex-col justify-between">
        <div>
          <Link href={`/products/${[id]}`}>
            <a>
              <p className="font-serif font-bold text-md capitalize truncate">
                {name}
              </p>
            </a>
          </Link>
          <p className="font-sans text-sm font-light text-gray-600 truncate mb-1">
            {description}
          </p>
          <p className="font-sans text-sm">${price}</p>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-md bg-blue-400"></div>
          <div className="w-3 h-3 rounded-md bg-purple-400"></div>
          <div className="w-3 h-3 rounded-md bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-md bg-red-400"></div>
          <div className="w-3 h-3 rounded-md bg-black"></div>
          <div className="w-3 h-3 rounded-md bg-white border"></div>
        </div>
      </div>
    </div>
  );
}
