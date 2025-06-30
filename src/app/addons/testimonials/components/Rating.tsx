"use client";

import { Star } from "lucide-react";
import { useState } from "react";

const Rating = ({
  name,
  defaultRating = 0,
  disabled = false,
}: {
  name: string;
  defaultRating?: number;
  disabled?: boolean;
}) => {
  const [rating, setRating] = useState(defaultRating);

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    star: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (star === rating) {
      setRating(0);
    } else {
      setRating(star);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={(e) => handleClick(e, star)}
          className="focus:outline-none"
          aria-label={`Rate ${star} stars`}
          disabled={disabled}
        >
          <Star
            className={`h-6 w-6 ${
              star <= rating
                ? "fill-yellow-500 text-yellow-500"
                : "text-muted-foreground"
            } transition-colors`}
          />
        </button>
      ))}
      <input type="hidden" name={name} value={rating} />
      <span className="text-xl font-bold pl-3">{rating} / 5</span>
    </div>
  );
};

export { Rating };
