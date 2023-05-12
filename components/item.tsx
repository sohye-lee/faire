import Slider from '@components/slider';
import { Category } from '@prisma/client';
import Link from 'next/link';
import { RiHeart3Line, RiChat3Line } from 'react-icons/ri';

interface ItemProps {
  id: number;
  name: string;
  price: number;
  description: string;
  comments: number;
  favorites: number;
  imageIds?: string;
  category?: Category;
  color?: string;
  condition?: string;
}

export default function Item({
  name,
  price = 0,
  comments = 0,
  favorites = 0,
  id,
  description,
  imageIds,
  color,
  condition,
  category,
}: ItemProps) {
  console.log(color);
  return (
    <div className="border border-gray-200 h-full">
      <div className="w-full aspect-square bg-gray-100 relative">
        <Slider imageIds={imageIds ? imageIds : ''} />
        <div className="absolute top-2 left-2 text-sm border border-black px-2 bg-gray-700 text-white">
          {category?.name}
        </div>
        <div className="absolute top-2 right-2 flex items-center justify-end space-x-3">
          <button className="flex items-center space-x-1">
            <RiHeart3Line className="" width="24" height="24" />
            <span>{favorites}</span>
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
          <p className="font-sans text-sm">${price}</p>
          <div className="flex items-center space-x-1 mt-2">
            {color && color !== '' && (
              <div
                className="w-5 h-5 rounded-full border border-gray-200 mr-2"
                style={{ backgroundColor: color }}
              ></div>
            )}
            <p className="text-xs font-light  ">{condition}</p>
          </div>
        </div>
        <p className="font-sans text-sm font-light text-gray-600 truncate mb-1">
          {description.length > 100 ? description.slice(0, 100) : description}
        </p>
      </div>
    </div>
  );
}
