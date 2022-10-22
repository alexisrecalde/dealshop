import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { motion } from "framer-motion";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";

const LinksCategorias = ({ posicion, name, categoriaMobile, image }) => {
  const frameVariants = {
    hover: { scale: 0.95 },
  };
  const router = useRouter();
  const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

  if (categoriaMobile) {
    return (
      <Link href={`/productos?category=${posicion}`}>
        <a className={`div${posicion + 1}`}>
          <Image
            src={image}
            layout="fill"
            objectFit="initial"
            priority={true}
            // layout="intrinsic"
          ></Image>
          <span style={{ position: "absolute" }}>{name}</span>
        </a>
      </Link>
    );
  }
  return (
    <Link href={`/productos?category=${posicion}`}>
      <a className={`div${posicion}`}>
        <Image
          src={image}
          layout="fill"
          objectFit="initial"
          priority={true}
          // layout="intrinsic"
        ></Image>
        <span style={{ position: "absolute" }} className="name-category">
          {name}
        </span>
      </a>
    </Link>
  );
};

const categories = [
  {
    categoryName: "Griferias",
    image: "/img/categories/grife.webp",
    id: 1,
  },
  {
    categoryName: "Sanitarios",
    image:
      "https://dealshop.com.ar/images/a06b90ad-da60-4d66-bdc5-7673c0c85155?folder=firstCreationWithoutId",
    id: 4,
  },
  {
    categoryName: "Aberturas",
    image:
      "https://dealshop.com.ar/images/c76a91f0-20f8-4260-a180-8286df5b6c56?folder=firstCreationWithoutId",
    id: 7,
  },
  {
    categoryName: "Muebles",
    image:
      "https://dealshop.com.ar/images/dc6afa11-0a70-42c5-b514-b82d91683bbc?folder=firstCreationWithoutId",
    id: 2,
  },
  {
    categoryName: "Bachas",
    image: "/img/categories/bacha3.webp",
    id: 3,
  },
  {
    categoryName: "Electro",
    image: "/img/categories/electrodo.jpg",
    id: 6,
  },
  {
    categoryName: "Hogar",
    image: "/img/categories/hogar.jpg",
    id: 5,
  },
];

export default function Categorias() {
  const [mobileView, setMobileView] = useState(false);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      paritialVisibilityGutter: 60,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      paritialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      paritialVisibilityGutter: 100,
      infinite: true,
    },
  };

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
    <>
      {mobileView ? (
        <Carousel
          ssr
          partialVisbile={true}
          itemClass="image-item"
          responsive={responsive}
          className="category-mobile-card"
          showDots={false}
          arrows={false}
          draggable={true}
        >
          {categories.map((el) => (
            <LinksCategorias
              name={el.categoryName}
              posicion={el.id}
              categoriaMobile={true}
              image={el.image}
            />
          ))}
        </Carousel>
      ) : (
        <div className="parent">
          {categories.map((el) => (
            <LinksCategorias
              name={el.categoryName}
              posicion={el.id}
              image={el.image}
            />
          ))}
        </div>
      )}
    </>
  );
}
