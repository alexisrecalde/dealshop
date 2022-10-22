import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useRouter } from "next/router";
import getConfig from "next/config";
import { Skeleton } from "primereact/skeleton";
import { Router } from "next/dist/client/router";

export default function FavoritosItem({ el, deleteFav }) {
  const { publicRuntimeConfig } = getConfig();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const load = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    load();
  }, []);

  const skeleton = () => {
    return (
      <>
        {" "}
        <div
          className=""
          style={{ border: "1px solid #dee2e6", margin: "20px 0" }}
        >
          <div className="">
            <div className="custom-skeleton p-4" style={{ display: "flex" }}>
              <Skeleton width="200px" height="150px"></Skeleton>
              <div className="flex mt-3" style={{ marginLeft: "20px" }}>
                <div>
                  <Skeleton width="10rem" className="mb-2"></Skeleton>
                  <Skeleton width="5rem" className="mb-2"></Skeleton>
                  <Skeleton height=".5rem"></Skeleton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  if (loading) {
    return <>{skeleton()}</>;
  }

  if (!loading) {
    return (
      <Card className="container-card-compras">
        <div className="card-compras-info-container container-favorito">
          <img
            src={`${
              el.photos
                ? `${publicRuntimeConfig.images_backend_url}${el.photos[0].image}`
                : "img/no-image.png"
            }`}
            alt={el.name}
          />
          <div className="info-description-compra">
            <span className="fecha-compra">${el.suggestedPrice}</span>
            <h5>{el.name}</h5>
          </div>
          <div>
            <button
              className="button-agregar-carrito-items button-ver-mas-favoritos"
              style={{
                cursor: "pointer",
              }}
            >
              <div
                onClick={() =>
                  router
                    .push(`/productos/${el.id}`)
                    .then(() => window.scrollTo(0, 0))
                }
                color="secondary"
                style={{
                  cursor: "pointer",
                  borderRadius: "15px",
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0 5px",
                }}
              >
                Ver mas
              </div>
            </button>
          </div>

          <div className="delete-favorito" onClick={() => deleteFav(el.id)}>
            Eliminar
          </div>
        </div>
      </Card>
    );
  }
}
