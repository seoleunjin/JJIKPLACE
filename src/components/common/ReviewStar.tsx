import styles from "@/styles/common.module.css";
import { Star, StarActive } from "@/assets/icons";
interface ReviewStarProps {
  rating: number;
}
function ReviewStar({ rating }: ReviewStarProps) {
  return (
    <div>
      <div className={styles.starWrap}>
        <div className={styles.star}>
          {[...Array(5)].map((_, index) => (
            <Star key={index} />
          ))}
        </div>
        <div>
          <div
            className={styles.StarActive}
            style={{ width: `${(rating / 5) * 100}%` }}
          >
            {[...Array(5)].map((_, index) => (
              <StarActive key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewStar;
