import Link from "next/link";
import React from "react";

const Menu = () => {
  return (
    <section>
      <div>로고</div>
      <div>
        <Link href="/">홈</Link>
        <Link href="/map">지도</Link>
        <Link href="/pose">포즈추천</Link>
        <Link href="/reviewWrite">리뷰등록</Link>
        <Link href="/user">마이페이지</Link>
      </div>
    </section>
  );
};

export default Menu;
