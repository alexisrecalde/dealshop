import React from "react";
import Link from "next/link";

export default function BarBottom({ setOpen, open, setPlacement }) {
  const handleOpen = (key) => {
    setOpen(true);
    setPlacement(key);
  };

  return (
    <div className="bar-bottom-container">
      <Link href="/">
        <a href="">
          <i className="pi pi-home"></i>
        </a>
      </Link>
      <Link href="/favoritos">
        <a href="">
          <i className="pi pi-heart"></i>
        </a>
      </Link>
      <Link href="/miscompras">
        <a href="">
          <i className="pi pi-shopping-bag"></i>
        </a>
      </Link>
      <i
        className="pi pi-bars"
        // onClick={() => setOpen(!open)}
        onClick={() => handleOpen("bottom")}
      ></i>
    </div>
  );
}
