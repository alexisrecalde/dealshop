import { useEffect, useState } from "react";
import Slider from "react-slick";
import "react-multi-carousel/lib/styles.css";
import CardMain from "../card/cardMain";
import { Skeleton } from "primereact/skeleton";
import ItemSearch from "../itemListBySearch/itemSearch";

export default function Destacados({ products, isLoading, min, max }) {
  const [row, setRow] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const getArray = JSON.parse(localStorage.getItem("favoritos") || "0");

  useEffect(() => {
    if (getArray !== 0) {
      setFavoritos([...getArray]);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setRow(products.slice(min, max));
    }
  }, [isLoading]);

  const d = new Date();
  const timeLimitToPurchase = d.getHours();

  const colors = [
    "#ffff",
    "#fff",
    "#ffff",
    "#fff",
    "#fff",
    "#fff",
    "#ffff",
    "#ffff",
    "#ffff",
  ];

  const skelton = [1, 2, 3, 4, 5, 6, 7];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
    ],
  };

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

  return (
    <div className="destacados-row">
      <Slider {...settings}>
        {row.map((product, index) => (
          <ItemSearch
            key={product.id}
            data={product}
            color={colors[index]}
            megusta={megusta}
            fromCarousel={true}
            limitHour={timeLimitToPurchase}
          />
        ))}
      </Slider>
    </div>
  );
}
