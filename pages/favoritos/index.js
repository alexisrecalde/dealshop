import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FavoritosItem from "../../components/favoritosItem";
import { Button } from "primereact/button";
import ItemSearch from "../../components/itemListBySearch/itemSearch";

export default function Favoritos() {
  const router = useRouter();
  const [favoritos, setFavortos] = useState([]);
  const getArray = JSON.parse(localStorage.getItem("favoritos") || "0");

  useEffect(() => {
    if (getArray !== 0) {
      setFavortos([...getArray]);
    }
  }, []);

  const deleteFav = (id) => {
    let array = getArray.filter(function (item) {
      return item.id !== id;
    });
    localStorage.setItem("favoritos", JSON.stringify(array));
    +setFavortos([...array]);
  };

  const goToAllProducts = () => {
    router.push("/productos").then(() => window.scrollTo(0, 0));
  };

  return (
    <div className="container-mis-compras">
      <h2 className="title-compras">Mis Favoritos</h2>
      {favoritos.length == 0 ? (
        <>
          <div>No hay items Favoritos</div>
          <Button
            className="button-slide sign-in-button"
            style={{
              width: "auto",
              margin: "0 auto",
              marginTop: "20px",
              zIndex: 1000,
            }}
            onClick={() => {
              goToAllProducts();
            }}
          >
            Ver productos
          </Button>
        </>
      ) : (
        favoritos.map((el) => (
          <ItemSearch
            data={el}
            fromFavoritos={true}
            deleteFav={deleteFav}
          ></ItemSearch>
        ))
      )}
    </div>
  );
}
