import { useAppDispatch, useAppSelector } from "@/hooks/storeMap";
import { setCategory } from "@/features/map/mapSlice";
import styles from "@/styles/mapCategory.module.css";

const categories = ["전체", "인기", "감성", "하이틴", "캐릭터", "복고", "팝업"];

function MapCategory() {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.map.category);

  const handleCategoryClick = (selected: string) => {
    const categorySelected = selected === "전체" ? "" : selected;
    dispatch(setCategory(categorySelected));
  };

  return (
    <div className={styles.btnWrap}>
      {categories.map((cat) => {
        const selected = category === (cat === "전체" ? "" : cat);
        return (
          <button
            key={cat}
            className={`${styles.categoryBtn} ${
              selected ? styles.categoryBtnActive : ""
            }`}
            onClick={() => handleCategoryClick(cat)}
          >
            # {cat}
          </button>
        );
      })}
    </div>
  );
}

export default MapCategory;
