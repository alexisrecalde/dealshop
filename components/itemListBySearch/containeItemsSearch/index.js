import React, { useState, useEffect } from "react";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import getConfig from "next/config";
import ItemSearch from "../itemSearch";
import { Paginator } from "primereact/paginator";

export default function ContaineItemsSearch({ productos }) {
  const [products, setProducts] = useState(null);
  const [layout, setLayout] = useState("grid");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [customFirst3, setCustomFirst3] = useState(0);
  const [customRows3, setCustomRows3] = useState(10);
  const [favoritos, setFavoritos] = useState([]);
  const getArray = JSON.parse(localStorage.getItem("favoritos") || "0");

  const sortOptions = [
    { label: "Price High to Low", value: "!price" },
    { label: "Price Low to High", value: "price" },
  ];

  const d = new Date();
  const timeLimitToPurchase = d.getHours();

 
  useEffect(() => {
    if (getArray !== 0) {
      setFavoritos([...getArray]);
    }
  }, []);

  useEffect(() => {
    setProducts(productos);
  }, [productos]); // eslint-disable-line react-hooks/exhaustive-deps

  const megusta = (id) => {
    let array = favoritos;
    let addArray = true;
    array.map((item, key) => {
      if (item.id === id.id) {
        addArray = false;
      }
    });
    if (addArray) {
      array.push(id);
    } else {
      array = array.filter(function (item) {
        return item.id !== id.id;
      });
    }
    setFavoritos([...array]);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  };

  const onSortChange = (event) => {
    const value = event.value;

    if (value.indexOf("!") === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };

  // const onCustomPageChange3 = (event) => {
  //   setCustomFirst3(event.first);
  //   setCustomRows3(event.rows);
  // };

  const renderGridItem = (data) => {
    return (
      <div
        className=""
        style={productos.length <= 2 ? { width: "300px" } : null}
      >
        <ItemSearch
          data={data}
          megusta={megusta}
          favoritos={favoritos}
          limitHour={timeLimitToPurchase}
        ></ItemSearch>
      </div>
    );
  };

  const itemTemplate = (product, layout) => {
    if (!product) {
      return;
    }

    if (layout === "list") return renderGridItem(product);
    else if (layout === "grid") return renderGridItem(product);
  };

  return (
    <div className="dataview-demo">
      <div className="card">
        <DataView
          value={products}
          layout={layout}
          itemTemplate={itemTemplate}
          paginator
          paginatorTemplate="RowsPerPageDropdown PrevPageLink PageLinks NextPageLink"
          rows={12}
          sortOrder={sortOrder}
          sortField={sortField}
          // paginatorTemplate={template3}
        />
      </div>
    </div>
  );
}
