import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const Rating = ({ rating }) => {
  const stars = [];
  const maxRating = 5;

  for (let i = 1; i <= maxRating; i++) {
    if (i <= rating) {
      stars.push(
        <AiFillStar
          key={i}
          size={16}
          color="#f6b100"
          className="cursor-pointer"
        />
      );
    } else {
      stars.push(
        <AiOutlineStar
          key={i}
          size={16}
          color="#f6b100"
          className="cursor-pointer"
        />
      );
    }
  }

  return (
    <div className="flex gap-1" title={`Rating: ${rating} out of 5`}>
      {stars}
      {rating > 0 && (
        <span className="text-sm text-gray-500 ml-1">({rating.toFixed(1)})</span>
      )}
    </div>
  );
};

export default Rating;
