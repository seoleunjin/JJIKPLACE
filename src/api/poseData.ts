export const poseImages = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  src: `/images/pose/pose/pose${String(i + 1).padStart(2, "0")}.png`,
}));

export const frameImages = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  src: `/images/pose/frame/frame${String(i + 1).padStart(2, "0")}.png`,
}));
