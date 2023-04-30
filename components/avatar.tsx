interface AvatarProps {
  size: number;
  name: string;
  imageUrl: string;
}

export default function Avatar({ size, name, imageUrl }: AvatarProps) {
  return (
    <>
      {imageUrl && imageUrl !== '' ? (
        <div
          className={`w-${size} h-${size} rounded-full bg-center bg-cover`}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      ) : (
        <div
          className={`w-${size} h-${size} bg-purple-300 text-white font-light font-serif font-3xl`}
        >
          {name && name != '' ? name.toUpperCase().substring(0, 1) : '?'}
        </div>
      )}
    </>
  );
}
