import React from "react";
import Link from "next/link";

export default function SeccionInteres() {
  return (
    <div className="seccionInteres">
      <Link href="/">
        <a className="interes-1">
        </a>
      </Link>
      <Link href="/">
        <a className="interes-2"></a>
      </Link>
    </div>
  );
}
