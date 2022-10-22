import React from "react";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../lotties/deliver.json";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function ModalEnvios({setCloseModalEntregado}) {
  return (
    <div className="container-lottie-modal-entregado">
      <AiOutlineCloseCircle
        className="close-modal-entregado"
        onClick={()=>setCloseModalEntregado(false)}
      />
      <h2 className="title-modal-entregado">
        !La orden ha sido cambiada a Entregada!
      </h2> 

      <Lottie animationData={groovyWalkAnimation} height={200} width={200} />
      <p className="p-entregado-modal">
        Podras ver los pedidos entregados desde la seccion de{" "}
        <strong>pedidos</strong>.
      </p>
    </div>
  );
}
