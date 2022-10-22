import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Collapsible from "react-collapsible";
import List from "@mui/material/List";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import { InputText } from "primereact/inputtext";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Slider } from "primereact/slider";
import { Card } from "primereact/card";
import { InputSwitch } from "primereact/inputswitch";
import {
  ListItemContainer,
  PriceContainer,
  FilterMenu,
  FilterIconContainer,
} from "./itemsFilter.styles";
import { InputTextOutlined } from "../../input/input.styles";
import { GiConfirmed } from "react-icons/gi";
import { ImFilter } from "react-icons/im";
import CustomButtonComponent from "../../customButton/customButton.component";
import { CurrencyInput, CurrencyText } from "../../../utils/number.utils";
import { Sidebar } from "primereact/sidebar";
import { Divider } from "@mui/material";

const ItemsFilterComponent = ({
  brands,
  colors,
  products,
  setOpenDrawerFilter,
  openDrawerFilter,
}) => {
  const router = useRouter();
  const query = router.query;
  const { name, category, orderBySuggestedPrice, fromPrice, toPrice } = query;

  const [getFromPrice, setFromPrice] = useState("");
  const [getToPrice, setToPrice] = useState("");
  const [mobileView, setMobileView] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);
  const [openColors, setOpenColors] = useState(false);
  const [value5, setValue5] = useState([
    fromPrice ? fromPrice : 1000,
    toPrice ? toPrice : 3000,
  ]);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, [window.innerWidth]);

  const onDrawerClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const onSelectChange = (event) => {
    const value = event.target.value;

    const queryParams = { ...query, orderBySuggestedPrice: value };

    if (value == "default") {
      delete queryParams.orderBySuggestedPrice;
    }

    router
      .push({
        query: queryParams,
      })
      .then(() => window.scrollTo(0, 0));
  };

  const onBrandClick = (brandId) => {
    router
      .push({
        query: { ...query, brands: brandId },
      })
      .then(() => window.scrollTo(0, 0));
  };

  const onColorClick = (colorId) => {
    router
      .push({
        query: { ...query, colors: colorId },
      })
      .then(() => window.scrollTo(0, 0));
  };

  const onPriceClick = () => {
    const queryParams = { ...query };
    queryParams.fromPrice = value5[0];
    queryParams.toPrice = value5[1];

    router.push({
      query: queryParams,
    });
  };

  const onRemoveFilters = () => {
    if (name != undefined) {
      router.push({ query: { name } }).then(() => window.scrollTo(0, 0));
    } else if (category != undefined) {
      router.push({ query: { category } }).then(() => window.scrollTo(0, 0));
    }
  };

  const onChangeEnvio = (item) => {
    setChecked1(item);

    if (!checked1) {
      const queryParams = { ...query };
      queryParams.fromPrice = 25000;
      router
        .push({
          query: queryParams,
        })
        .then(() => window.scrollTo(0, 0));
    } else {
      const queryParams = { ...query };
      delete queryParams.fromPrice;
      router
        .push({
          query: queryParams,
        })
        .then(() => window.scrollTo(0, 0));
    }
  };

  const filters = () => {
    return (
      <Fragment>
        {/* <List>
          <FormControl>
            <Card className="card-container-filtros p-card-content">
              <span>Envío gratis</span>
              <InputSwitch
                checked={checked1}
                value={checked1}
                onChange={(e) => {
                  onChangeEnvio(e.value);
                }}
              />
            </Card>
          </FormControl>
        </List> */}
        <Card className="card-container-filtros card-filtro-column">
          <Collapsible
            trigger={
              <div
                data-testid="openHelpContactInfo"
                onClick={() => setOpenBrand(!openBrand)}
              >
                <div className="title-contain-row">
                  <span className="span-title-filter">Marca</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    color="#3D424D"
                    width="20"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline
                      data-testid="arrow"
                      points={!openBrand ? "6 9 12 15 18 9" : "18 15 12 9 6 15"}
                    ></polyline>
                  </svg>
                </div>
              </div>
            }
            open={openBrand}
          >
            <>
              {brands.map((brand) => (
                <ListItemContainer>
                  <ListItemText
                    id={brand.id}
                    primary={brand.description.toLowerCase()}
                    onClick={() => {
                      onBrandClick(brand.id);
                      setOpenDrawerFilter(false);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </ListItemContainer>
              ))}
            </>
          </Collapsible>
        </Card>
        <Card className="card-container-filtros card-filtro-column column-fil">
          <Collapsible
            trigger={
              <div
                data-testid="openHelpContactInfo"
                onClick={() => setOpenColors(!openColors)}
              >
                <div className="title-contain-row">
                  <span className="span-title-filter">Color</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    color="#3D424D"
                    width="20"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline
                      data-testid="arrow"
                      points={
                        !openColors ? "6 9 12 15 18 9" : "18 15 12 9 6 15"
                      }
                    ></polyline>
                  </svg>
                </div>
              </div>
            }
            open={openColors}
          >
            <>
              {colors.map((color) => (
                <ListItemContainer>
                  <ListItemText
                    id={color.id}
                    primary={color.description}
                    onClick={() => {
                      onColorClick(color.id);
                      setOpenDrawerFilter(false);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </ListItemContainer>
              ))}
            </>
          </Collapsible>
        </Card>
        <Card className="card-container-filtros card-filtro-column column-fil card-rango">
          <span className="span-title-filter">Precio</span>
          <div
            style={{
              width: "100%",
              margin: "15px 0",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontWeight: 400,
                fontSize: "15px",
                color: "#262626",
              }}
            >
              Rango:
            </span>{" "}
            <span
              style={{
                fontWeight: 100,
                fontSize: "14px",
                color: "#696969",
              }}
            >
              <CurrencyText value={value5[0]} />,{"  "}
              <CurrencyText value={value5[1]} />
              {/* {` $ ${value5[0]} , $ ${value5[1]}`} */}
            </span>
          </div>
          <Slider
            value={value5}
            onChange={(e) => setValue5(e.value)}
            range
            max={30000}
            min={100}
          />
          <button
            className="button-inicio-sesion"
            onClick={() => {
              onPriceClick();
              setOpenDrawerFilter(false);
            }}
          >
            Filtrar
          </button>
        </Card>
        <Card className="card-container-filtros card-filtro-column column-fil">
          {" "}
          <button className="button-inicio-sesion" onClick={onRemoveFilters}>
            Limpiar filtros
          </button>
        </Card>
      </Fragment>
    );
  };

  return (
    <Fragment>
      {mobileView ? (
        <Fragment>
          <Sidebar
            visible={openDrawerFilter}
            className="sidebar-filter"
            onHide={() => setOpenDrawerFilter(false)}
            style={{ paddingBottom: "100px" }}
          >
            {filters()}
          </Sidebar>
        </Fragment>
      ) : (
        <aside aria-label="filtros" style={{ paddingTop: "0px" }}>
          {filters()}
        </aside>
      )}
    </Fragment>
  );
};

export default ItemsFilterComponent;
