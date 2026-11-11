import { Star } from "lucide-react";
import { useState } from "react";

type Props = {
  value: number;
  onChange: (value: number) => void;
  error?: string;
  defaultValue?: number;
};

export default function InputRatingReview({
  value,
  onChange,
  error,
  defaultValue,
}: Props) {
  const [hover, setHover] = useState(defaultValue || 0);

  return (
    <div className="flex flex-col gap-2">
      <p className="font-light text-sidebar dark:text-white">التقييم</p>

      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star, index) => {
          const isActive = star <= (hover || value);

          return (
            <button
              key={index}
              type="button"
              onClick={() => onChange(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className={`text-3xl cursor-pointer transition bg-card dark:bg-card-dark p-2 rounded-xl ${isActive ? "text-star-active" : "text-star-inactive"
                }`}
            >
              <Star className={isActive ? "fill-star-active" : "fill-star-inactive"} />
            </button>
          );
        })}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
