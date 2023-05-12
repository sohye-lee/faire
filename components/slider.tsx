import { getImageUrl } from '@libs/client/myFuncs';
import { useState } from 'react';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';

interface SliderProps {
  imageIds: string;
}
export default function Slider({ imageIds }: SliderProps) {
  const [index, setIndex] = useState(0);
  const imagesIdsList = JSON.parse(imageIds);
  console.log(imagesIdsList);
  const toRight = () => {
    if (imagesIdsList && imagesIdsList?.length > 1) {
      setIndex((index + 1) % imagesIdsList?.length);
      console.log(index);
    }
  };
  const toLeft = () => {
    if (imagesIdsList && imagesIdsList?.length > 1 && index > 0) {
      setIndex((index - 1) % imagesIdsList?.length);
    } else if (index === 0 && imagesIdsList) {
      setIndex(imagesIdsList?.length - 1);
    }
  };
  return (
    <div className="w-full h-full relative">
      {imagesIdsList && imagesIdsList.length > 0 ? (
        imagesIdsList.length > 1 ? (
          <>
            <div
              key={imagesIdsList[index].id}
              className="w-full h-full bg-center bg-cover"
              style={{
                backgroundImage: `url(${getImageUrl(imagesIdsList[index])})`,
              }}
            ></div>
            <div className=" absolute left-0 top-1/2 w-full px-3 -translate-y-1/2 flex items-center justify-between">
              <button
                className={`p-2 hover:bg-slate-100 hover:text-white opacity-50 z-30 ${
                  !imagesIdsList || imagesIdsList?.length < 2 ? 'hidden' : null
                }`}
                onClick={toLeft}
              >
                <RiArrowLeftLine color="#565656" size={24} />
              </button>
              <button
                className={`p-2 hover:bg-slate-100 hover:text-white opacity-50 z-30 ${
                  !imagesIdsList || imagesIdsList?.length < 2 ? 'hidden' : null
                }`}
                onClick={toRight}
              >
                <RiArrowRightLine color="#565656" size={24} />
              </button>
            </div>
          </>
        ) : (
          <div
            className="w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url(${getImageUrl(imagesIdsList[0])})`,
            }}
          ></div>
        )
      ) : (
        <div
          className="w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: 'url(/images/no-image.png)',
          }}
        ></div>
      )}
    </div>
  );
}
