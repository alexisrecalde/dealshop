import React, { useEffect, useState } from "react";
import { Divider } from "primereact/divider";
import { ImSearch } from "react-icons/im";
import getConfig from "next/config";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

export default function ContainerSearchSideMobile({ setOpenSearchSide }) {
  const [prod, setProd] = useState([]);
  const [getKeyword, setKeyword] = useState("");
  const { publicRuntimeConfig } = getConfig();

  const config = {
    headers: {
      "x-client-id": "6eb59dd2-7a48-4a13-9110-b78c56a3f861",
      "content-type": "application/json",
      "Access-Control-Allow-Methods": "*",
      "x-auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibWFpbCI6ImRpZWdvLm9uYUBsaXZlLmNvbS5hciIsImZpcnN0TmFtZSI6IkRpZWdvIiwibGFzdE5hbWUiOiJPw7FhIiwicGhvbmUiOjQ0MTI2Mzc0LCJkbmkiOjM3Njc3MjEyLCJpc0VuYWJsZWQiOnRydWUsImlzQWN0aXZlIjp0cnVlLCJkYXRlQ3JlYXRlZCI6IjIwMjEtMDEtMDFUMDE6MzA6MjIuMzIyWiIsInVzZXJUeXBlIjp7ImlkIjoyLCJkZXNjcmlwdGlvbiI6ImFkbWluIn0sIndhbGxldCI6bnVsbCwiaWF0IjoxNjA5NjE0OTkxfQ._I8a3D3VDewI-gSCIh72IgOkPCUUbvhkSr_JxC71Hg0",
    },
  };

  useEffect(() => {
    const getProd = async () => {
      const url = `${publicRuntimeConfig.backend_url}/public/search-products`;
      const { data } = await axios.get(url, config);
      setProd(data.products.results);
    };

    getProd();
  }, []);

  return (
    <div className="container-menu-mobile-all">
      <div className="app-bar-container">
        <div className="app-bar-container-input-image">
          <form style={{ position: "relative" }} className="form-search-side">
            <div style={{ cursor: "pointer" }} className="icon-container">
              <ImSearch style={{ color: "#787885" }} />
            </div>
            <input
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Buscar productos"
              inputProps={{ "aria-label": "search" }}
              className="input-search"
              value={getKeyword}
            />
          </form>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        {getKeyword === ""
          ? null
          : prod
              .filter((data) => {
                return (
                  data.name.toLowerCase().search(getKeyword.toLowerCase()) != -1
                );
              })
              .slice(0, 4)
              .map((obj) => {
                return (
                  <>
                    <Link href={`/productos/${obj.id}`} passHref>
                      <div
                        className="item-search-card-dropdown"
                        style={{ cursor: "pointer" }}
                        onClick={() => setOpenSearchSide(false)}
                      >
                        <Image
                          src={`https://www.dealshop.com.ar/${
                            obj.photos
                              ? `images${obj.photos[0].image}`
                              : "img/no-image.png"
                          }`}
                          width={100}
                          height={100}
                          alt={obj.name}
                          // priority
                        />
                        <div
                          className=""
                          style={{
                            fontSize: "13px",
                            marginLeft: "10px",
                            textTransform: "capitalize",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {obj.name.toLowerCase()}
                        </div>
                      </div>
                    </Link>
                    <Divider />
                  </>
                );
              })}
      </div>
      <div>
        {getKeyword !== "" ? (
          <Link href={`/productos/?name=${getKeyword}`}>
            <button
              type=""
              className="button-ver-resultados-side"
              onClick={() => {
                setOpenSearchSide(false);
              }}
            >
              Ver todos los resultados
            </button>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
