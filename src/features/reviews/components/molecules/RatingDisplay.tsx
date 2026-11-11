import { Star } from "lucide-react";

type RatingDisplayProps = {
  value: number;
  max?: number;
};

export default function RatingDisplay({ value, max = 5 }: RatingDisplayProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, index) => {
        const starNumber = index + 1;
        const isActive = starNumber <= value;

        return (
          <div
            key={index}
            className={`p-1 rounded ${isActive ? "text-star-active" : "text-star-active/25"
              }`}
          >
            <Star className={isActive ? "fill-star-active" : "fill-star-active/25"} size={18} />
          </div>
        );
      })}
    </div>
  );
}