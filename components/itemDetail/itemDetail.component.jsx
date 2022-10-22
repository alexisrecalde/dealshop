import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import getConfig from "next/config";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import Backdrop from "@mui/material/Backdrop";
import CustomButtonComponent from "../customButton/customButton.component";
import { Rating } from "primereact/rating";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button } from "primereact/button";
import {
  selectIsUserLogged,
  selectUserType,
} from "../../redux/user/user.selector";
import { addItemToCart } from "../../redux/cart/cart.actions";
import { Card } from "primereact/card";
import TableDetails from "./tableDetails";
import { useRouter } from "next/router";
import GetCategories from "../utils/getCategories";
import axios from "axios";
import {
  ItemDetailContainer,
  RowContainer,
  CarouselContainer,
} from "./itemDetail.styles";
import { CurrencyText } from "../../utils/number.utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OpinionesProductos from "./opinionesProductos";
import ItemSearch from "../itemListBySearch/itemSearch";
import { BreadCrumb } from "primereact/breadcrumb";
import ShareModal from "../shareModal";
import ModalMenorCantidad from "./modalMenorCantidad";
import {
  ItemAddContainer,
  ItemAmountContainer,
  ItemQtyInput,
} from "../card/itemCard/itemCard.styles";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { CustomSecondaryButtonAgregarNuevo } from "../customButton/customButton.styles";

const ItemDetailComponent = ({
  item,
  isUserLogged,
  addItemToCart,
  userType,
}) => {
  const { publicRuntimeConfig } = getConfig();
  const [mobileView, setMobileView] = useState(false);
  const [getShow, setGetShow] = useState(false);
  const [getQty, setQty] = useState(1);
  const [getImgOpen, setImgOpen] = useState(false);
  const [getActiveImg, setActiveImg] = useState("");
  const [productosRelacionados, setProductosRelacionados] = useState();
  const [showModalShare, setShowModalShare] = useState(false);
  const [showMenorCantidad, setShowMenorCantidad] = useState(false);
  const [getAmount, setAmount] = useState(0);
  const toastCopy = useRef(null);

  const {
    photos,
    name,
    description,
    suggestedPrice,
    mainBranchQuantity,
    secondaryBranchQuantity,
    weight,
    color,
    subcategory,
    brand,
    stars,
    material,
  } = item;
  const availableQuantity = mainBranchQuantity + secondaryBranchQuantity;
  const { getCategoriesById, getSubCategoriesById } = GetCategories();
  const router = useRouter();

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, [window.innerWidth]);

  const config = {
    headers: {
      "x-client-id": "6eb59dd2-7a48-4a13-9110-b78c56a3f861",
      "content-type": "application/json",
      "Access-Control-Allow-Methods": "*",
      "x-auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibWFpbCI6ImRpZWdvLm9uYUBsaXZlLmNvbS5hciIsImZpcnN0TmFtZSI6IkRpZWdvIiwibGFzdE5hbWUiOiJPw7FhIiwicGhvbmUiOjQ0MTI2Mzc0LCJkbmkiOjM3Njc3MjEyLCJpc0VuYWJsZWQiOnRydWUsImlzQWN0aXZlIjp0cnVlLCJkYXRlQ3JlYXRlZCI6IjIwMjEtMDEtMDFUMDE6MzA6MjIuMzIyWiIsInVzZXJUeXBlIjp7ImlkIjoyLCJkZXNjcmlwdGlvbiI6ImFkbWluIn0sIndhbGxldCI6bnVsbCwiaWF0IjoxNjA5NjE0OTkxfQ._I8a3D3VDewI-gSCIh72IgOkPCUUbvhkSr_JxC71Hg0",
    },
  };

  const fromDetails = true;

  const categorieItem = getCategoriesById(item.subcategory.categoryId);
  const subCategoriaItem = getSubCategoriesById(item.subcategory.id);

  useEffect(() => {
    const getProductRelation = async () => {
      const url = `${publicRuntimeConfig.backend_url}/public/products`;
      const { data } = await axios.get(url, config);
      const filterResult = data.results.filter(
        (el) => el.subcategory.categoryId === subcategory.categoryId
      );
      const filterResultFive = filterResult.slice(0, 4);
      setProductosRelacionados(filterResultFive);
    };
    getProductRelation();
  }, []);

  const onInputChange = (event) => {
    event.preventDefault();
    let quantity = parseInt(event.target.value);

    if (quantity > availableQuantity) {
      quantity = availableQuantity;
    }

    setAmount(quantity);
  };

  const onPlusItem = () => {
    const quantity = getAmount + 1;

    if (quantity <= availableQuantity) {
      setAmount(quantity);
    }
  };

  const onMinusItem = () => {
    const quantity = getAmount == 1 ? 1 : getAmount - 1;

    setAmount(quantity);
  };

  const onConfirmItem = (item) => {
    item.quantity = getAmount;
    item.clientSellingPrice = item.suggestedPrice;

    addItemToCart(item);
    setGetShow(false);
    setAmount(0);

    toast.info(
      <div>
        <h4>{`🎉 Se agregó ${item.quantity} ${item.name} al carrito.`}</h4>
        <CustomButtonComponent
          style={{ width: "100%", height: "35px" }}
          onClick={() => {
            if (userType == 6) {
              router.push("/cart").then(() => window.scrollTo(0, 0));
            } else {
              router.push("/carrito").then(() => window.scrollTo(0, 0));
            }
          }}
        >
          Ir al carrito
        </CustomButtonComponent>
      </div>,
      {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  const onAddToCartClick = () => {
    setGetShow(true);
    setAmount(1);
  };

  const onComprarAhora = (item) => {
    item.quantity = getQty;
    item.clientSellingPrice = item.suggestedPrice;

    addItemToCart(item);
    setQty(1);

    setTimeout(() => {
      if (userType == 6) {
        router.push("/cart").then(() => window.scrollTo(0, 0));
      } else {
        router.push("/carrito").then(() => window.scrollTo(0, 0));
      }
    }, 1000);
  };

  const onImageClick = (imgUrl) => {
    setActiveImg(imgUrl);
    setImgOpen(!getImgOpen);
  };

  const returnDescription = (description) => {
    return description ? description : "-";
  };

  const toProductosRelacionados = () => {
    router
      .push(`/productos?category=${subcategory.categoryId}`)
      .then(() => window.scrollTo(0, 0));
  };

  const items = [
    {
      label: `${categorieItem}`,
      url: `${process.env.NEXT_PUBLIC_URL}productos?category=${item.subcategory.categoryId}`,
    },
    {
      label: `${subCategoriaItem}`,
      url: `${process.env.NEXT_PUBLIC_URL}productos?category=${item.subcategory.categoryId}`,
    },
    {
      label: `${item.name}`,
      url: `${process.env.NEXT_PUBLIC_URL}productos/${item.id}`,
    },
  ];

  const home = {
    icon: "pi pi-home",
    url: `${process.env.NEXT_PUBLIC_URL}`,
  };

  return (
    <ItemDetailContainer>
      {!mobileView && (
        <div className="">
          <BreadCrumb model={items} home={home} />
        </div>
      )}
      <RowContainer>
        <CarouselContainer
          infiniteLoop
          showThumbs={true}
          showIndicators={false}
          showStatus={false}
        >
          {photos.length > 0 ? (
            photos.map((photo) => (
              <div
                style={{ cursor: "pointer" }}
                onClick={() =>
                  onImageClick(
                    `${publicRuntimeConfig.images_backend_url}${photo.image}`
                  )
                }
              >
                <img
                  key={photo.id}
                  src={`${publicRuntimeConfig.images_backend_url}${photo.image}`}
                  style={{ maxHeight: "280px", width: "auto" }}
                />
              </div>
            ))
          ) : (
            <img
              key={1}
              src="/img/no-image.png"
              style={{ maxHeight: "300px", width: "auto" }}
            />
          )}
        </CarouselContainer>
        <Card className="card-container-item-detail">
          <div className="title-card-item">{name}</div>
          <div className="i-megusta-details">
            <i
              className="i-megusta press-i pi pi-heart-fill"
              // className={
              //   fav
              //     ? "i-megusta press-i pi pi-heart-fill"
              //     : "i-megusta pi pi-heart"
              // }
            ></i>
          </div>
          <div className="share-button" onClick={() => setShowModalShare(true)}>
            <i className="pi pi-share-alt i-share-button"></i>
          </div>
          <div className="stars-product-item-search rating-unidades">
            <Rating value={stars} readOnly cancel={false}></Rating>
            {isUserLogged && (
              <span className="span-cantidades-disponibles">
                {" "}
                Quedan {availableQuantity} unidades disponibles!
              </span>
            )}
          </div>
          {isUserLogged ? (
            <div className="price-card-item">
              <CurrencyText
                value={suggestedPrice}
                className="price-real-card-item"
              />
              {/* <span className="promo-card-item">10% off</span> */}
            </div>
          ) : (
            <div style={{ color: "#e91e63" }}>
              Inicia sesion para ver el precio del producto
            </div>
          )}

          {/* {
            <div className="cuotas-card-item">
              <span>6 cuotas de $1560 sin interés</span>
            </div>
          } */}
          <div
            style={{ whiteSpace: "pre-wrap", userSelect: "text" }}
            className="description-card-item"
          >
            {description}
          </div>
          {isUserLogged ? (
            <div className="buttons-card-item">
              <Button
                onClick={() => {
                  if (availableQuantity > 0) {
                    onComprarAhora(item);
                  } else {
                    setShowMenorCantidad(true);
                  }
                }}
                label="Comprar ahora"
                className="p-button-success button-comprar-item-card"
                disabled={availableQuantity > 0 ? false : true}
              />
              {getShow ? (
                <ItemAddContainer>
                  <ItemAmountContainer>
                    <MdKeyboardArrowLeft
                      onClick={onMinusItem}
                      style={{
                        fontSize: "1.6rem",
                        cursor: "pointer",
                        color: "#ffff",
                      }}
                    />
                    <ItemQtyInput
                      type="number"
                      onChange={(event) => onInputChange(event)}
                      value={getAmount}
                    />
                    <MdKeyboardArrowRight
                      onClick={onPlusItem}
                      style={{
                        fontSize: "1.6rem",
                        cursor: "pointer",
                        color: "#ffff",
                      }}
                    />
                  </ItemAmountContainer>
                  <CustomSecondaryButtonAgregarNuevo
                    onClick={() => onConfirmItem(item)}
                    color="secondary"
                    style={{
                      cursor: "pointer",
                      borderRadius: "15px",
                      height: "30px",
                    }}
                  >
                    Confirmar
                  </CustomSecondaryButtonAgregarNuevo>
                </ItemAddContainer>
              ) : isUserLogged && availableQuantity > 0 ? (
                <Button
                  onClick={() => {
                    onAddToCartClick();
                    // if (availableQuantity > 0) {
                    //   onConfirmItem(item);
                    // } else {
                    //   setShowMenorCantidad(true);
                    // }
                  }}
                  label="Agregar al carrito"
                  className="p-button-outlined p-button-success button-agregar-carrito-item-card"
                />
              ) : (
                <Button
                  disabled={true}
                  label="Agregar al carrito"
                  className="p-button-outlined p-button-success button-agregar-carrito-item-card"
                />
              )}
              {/* <Button
              onClick={() => {
                if (availableQuantity > 0) {
                  onConfirmItem(item);
                } else {
                  setShowMenorCantidad(true);
                }
              }}
              disabled={availableQuantity > 0 ? false : true}
              label="Agregar al carrito"
              className="p-button-outlined p-button-success button-agregar-carrito-item-card"
            /> */}
            </div>
          ) : (
            <>
              <Button
                onClick={() => router.push("/login")}
                label="Iniciar sesion"
                className="p-button-outlined p-button-success button-comprar-item-card"
              />
            </>
          )}
        </Card>
      </RowContainer>
      <Card className="card-description-container-item">
        <div>
          <span className="caracteristicas-description">Caracteristicas</span>
          <TableDetails
            subcategory={subcategory}
            brand={brand}
            weight={weight}
            material={material}
            item={item}
            color={color}
          ></TableDetails>
          {/* <h4 className="description-h4-item">Descripcion</h4>
          <div className="description-p-item">
            <p>
              Si hay algo que no puede faltar en tu baño es un secador de pelo
              GA.MA Italy Aura Nano. En ondas, rulos, lacio, usalo como más te
              guste. Este producto se encargará de cuidar la salud de tu cabello
              y de crear el look perfecto para cada ocasión. Es pequeño, liviano
              y viene a completar tu set de belleza en el hogar.
              <br />
              <br /> Cuidado extremo Al finalizar, utilizá su sistema de aire
              frío, que cerrará la cutícula y así evitarás el daño. Además,
              fijará tu peinado para que luzcas impecable por más tiempo. Es
              iónico El producto es iónico, lo que traerá grandes beneficios en
              la rápidez del tratamiento y en los resultados que se obtienen:
              mayor brillo y suavidad. .<br />
              <br /> Su funcionamiento es a través de iones negativos, que
              golpean las moléculas de agua y las fraccionan, por lo tanto
              reducen el tiempo de secado, atrapan la humedad y eliminan efectos
              de electricidad estática.
            </p>
          </div> */}
        </div>
        {/* <div className="container-medios-pago-item">
          <Card className="card-medios-pago medios-pago-card">
            <span className="card-titles">Medios de pago</span>
            <span className="card-subtitles">Tarjetas de credito</span>
            <div className="details-formas-de-pago">
              <img src="/img/pago/TarjetaMaster.png" alt="" />
              <img src="/img/pago/TarjetaVisa.png" alt="" />
            </div>
            <span className="card-subtitles">Tarjetas de debito</span>
            <div className="details-formas-de-pago">
              <img src="/img/pago/TarjetaMaster.png" alt="" />
              <img src="/img/pago/TarjetaVisa.png" alt="" />
            </div>
            <span className="card-subtitles">Mercado Pago</span>
            <div className="details-formas-de-pago">
              <img src="/img/pago/MercadoPago.png" alt="" />
            </div>
            <span className="card-subtitles">Efectivo</span>
            <div className="details-formas-de-pago">
              <img src="/img/pago/Pagofacil.png" alt="" />
            </div>
          </Card>
        </div> */}
      </Card>
      {/* <Card className="card-container-opiniones">
        <div className="container-opiniones">
          <h5 className="title-opiniones">
            Opiniones sobre el producto {name}
          </h5>
          <div className="rating-opiniones-container">
            <span className="rating-stars-numero">{stars}.0</span>
            <div className="stars-product-item-search">
              <Rating value={stars} readOnly cancel={false}></Rating>
            </div>
            <span className="rating-opiniones-promedio">
              En promedio de 105 opiniones
            </span>
          </div>
          <OpinionesProductos></OpinionesProductos>
        </div>
      </Card> */}
      <Card className="container-contacto-vendedor">
        <h3>Contactate con nosotros!</h3>
        <div>
          <a href="https://wa.me/+5401127215538" target="_blank">
            <Button
              className="p-button-rounded p-button-success button-contacto-vendedor"
              style={{ display: "flex", justifyContent: "center" }}
            >
              Contacto
            </Button>
          </a>
        </div>
      </Card>
      <div className="container-productos-relacionados-item">
        <span className="title-productos-relacionados-item">
          Quienes vieron este producto también compraron
        </span>
        <div className="container-item-relacionados">
          {productosRelacionados &&
            productosRelacionados.map((el) => {
              return (
                <ItemSearch data={el} fromDetails={fromDetails}></ItemSearch>
              );
            })}
        </div>
        <span
          className="ver-mas-productos-relacionados"
          onClick={toProductosRelacionados}
          style={{ cursor: "pointer" }}
        >
          Ver más productos relacionados
        </span>
      </div>
      <ToastContainer />
      <Backdrop
        open={getImgOpen}
        style={{ zIndex: "3000" }}
        onClick={() => setImgOpen(false)}
      >
        <img src={getActiveImg} style={{ maxHeight: "80%", width: "auto" }} />
      </Backdrop>
      <ShareModal
        setShowModalShare={setShowModalShare}
        showModalShare={showModalShare}
        item={item}
        toast={toastCopy}
      />
      <ModalMenorCantidad
        setShowMenorCantidad={setShowMenorCantidad}
        showMenorCantidad={showMenorCantidad}
        item={item}
      ></ModalMenorCantidad>
    </ItemDetailContainer>
  );
};

ItemDetailComponent.propTypes = {
  isUserLogged: PropTypes.bool.isRequired,
  addItemToCart: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isUserLogged: selectIsUserLogged,
  userType: selectUserType,
});

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(addItemToCart(item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetailComponent);
