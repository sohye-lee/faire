import { RiStarHalfSFill, RiStarSFill, RiStarSLine } from 'react-icons/ri';

interface Rating {
  rating: number;
}
const createArrayFromNum = (rating: number) => {
  const stars = [];

  let rate = rating;
  for (let i = 0; i < 5; i++) {
    if (rate > 0.5) {
      stars.push(1);
    } else if (rate <= 0.5 && rate > 0) {
      stars.push(0.5);
    } else {
      stars.push(0);
    }
    rate--;
  }
  return stars;
};
export default function Rating({ rating }: Rating) {
  const stars = createArrayFromNum(rating);

  return (
    <div className="flex items-center">
      {stars.map((star, i) =>
        star == 0 ? (
          <RiStarSLine style={{ color: 'purple' }} key={i} />
        ) : star == 0.5 ? (
          <RiStarHalfSFill style={{ color: 'purple' }} key={i} />
        ) : (
          <RiStarSFill style={{ color: 'purple' }} key={i} />
        )
      )}
    </div>
  );
}
