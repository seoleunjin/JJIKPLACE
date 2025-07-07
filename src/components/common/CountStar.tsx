import React, { useState } from "react";
import { Star27, StarActive27 } from "@/assets/icons";

const CountStar = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", gap: "3px", cursor: "pointer" }}>
      {[1, 2, 3, 4, 5].map((val) => {
        const isActive =
          hoverRating !== null ? val <= hoverRating : val <= value;

        return (
          <span
            key={val}
            onClick={() => onChange(val)}
            onMouseEnter={() => setHoverRating(val)}
            onMouseLeave={() => setHoverRating(null)}
          >
            {isActive ? <StarActive27 /> : <Star27 />}
          </span>
        );
      })}
    </div>
  );
};

export default CountStar;
