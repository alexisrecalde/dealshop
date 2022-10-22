import React from "react";
import { useRouter } from "next/router";
import CompraIdByOne from "../../components/compraIdByOne";

export default function CompraID() {
  const router = useRouter();
  const { compraId } = router.query;

  return (
    <div className="compra-id-container">
      <h2 className="title-compras">Compras</h2>
      <CompraIdByOne compraId={compraId} />
    </div>
  );
}
