import { useState } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "@/styles/pose.module.css"; // optional

interface Props {
  src: string;
  alt: string;
}

const ImageWithSkeleton = ({ src, alt }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={styles.imageWrapper}>
      {!isLoaded && <Skeleton className={styles.skeleton} />}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        onLoad={() => setIsLoaded(true)}
        style={{
          objectFit: "cover",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      />
    </div>
  );
};

export default ImageWithSkeleton;
