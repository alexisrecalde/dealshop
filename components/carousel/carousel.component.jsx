import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselComponent = () => {
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

  const heightWeb = 400;
  const heightMobile = 180;

  return (
    <Carousel
      infiniteLoop
      autoPlay
      showThumbs={false}
      interval={10000}
      showStatus={false}
      // style={{ height: 340 }}
    >
      <div key="slide">
        <img
          src={
            mobileView
              ? "img/banners/bannermusimundo.jpg"
              : "img/banners/bannermusimundo.jpg"
          }
          alt="Imagen banner principal"
          style={!mobileView ? { height: heightWeb } : { height: heightMobile }}
        />
        <div className="container-title-button-slide"></div>
      </div>
      <div key="slide_2" className="slide">
        <img
          src={
            mobileView ? "img/banners/banners.jpg" : "img/banners/banners.jpg"
          }
          style={!mobileView ? { height: heightWeb } : { height: heightMobile }}
          alt="Imagen banner secundaria"
        />
      </div>
      <div key="slide_3" className="slide">
        <img
          src={
            mobileView
              ? "img/banners/BANNER DEALSHOP_1200x370_Mesa de trabajo 1 copia.png"
              : "img/banners/BANNER DEALSHOP_1200x370_Mesa de trabajo 1 copia.png"
          }
          style={!mobileView ? { height: heightWeb } : { height: heightMobile }}
          alt="Imagen banner secundaria"
        />
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
