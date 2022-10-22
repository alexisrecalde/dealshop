import React, { useState, useEffect } from "react";
import BannerBySearch from "./bannerBySearch";
import { Chip } from "primereact/chip";
import ItemListComponent from "../itemList/itemList.component";
import CardMain from "../card/cardMain";
import ContaineItemsSearch from "./containeItemsSearch";

export default function ItemListBySearch({
  products,
  setOpenDrawerFilter,
  openDrawerFilter,
}) {
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, [window.innerWidth]);

  return (
    <div>
      {/* <BannerBySearch /> */}
      {mobileView && (
        <div className="filter-mobile">
          <div
            className="filtro-mobile-div"
            onClick={() => setOpenDrawerFilter(!openDrawerFilter)}
          >
            <i className="pi pi-sliders-h" style={{ marginRight: "5px" }}></i>
            <span className="filtrar-span">Filtrar</span>
          </div>
        </div>
      )}
      {/* {!mobileView && (
        <div className="container-chips m-2">
          <span className="span-related-chips">Filtros Relacionados</span>
          <Chip label="Action" className="chip mr-2 mb-2" />
          <Chip label="Comedy" className="chip chip-selected mr-2 mb-2" />
          <Chip label="Mystery" className="chip mr-2 mb-2" />
          <Chip label="Thriller" className="chip mb-2" />
          <Chip label="Thriller" className="chip mb-2" />
          <Chip label="Thriller" className="chip mb-2" />
        </div>
      )} */}
      {mobileView && (
        <div className="title-filter-mobile">Todos los artículos</div>
      )}
      <ContaineItemsSearch productos={products} />
    </div>
  );
}
