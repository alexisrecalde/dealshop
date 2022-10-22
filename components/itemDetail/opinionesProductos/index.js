import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import OpinionItem from "./opinionItem";

export default function OpinionesProductos() {
  const comments = [
    {
      stars: 5,
      titleComment: "Muy buen secador, liviano y potente",
      name: "Lucia Artigas",
      description:
        "Muy buena potencia, cumple las expectativas. Tal cual lo que indica la publicación. Tengo mucho cabello y me lo seca en 5 minutos. Antes tenía otro gama que me dio muy buenos resultados y se me rompió después de varios años, así que quise repetir la marca con un modelo mejor.",
    },
    {
      stars: 2,
      titleComment: "Muy buen secador, liviano y potente",
      name: "Lucia Artigas",
      description:
        "Esta muy bueno al tacto y peso, aparentemente es de buena calidad. Lo utilizamos en peluqueria canina y funciona muy bien.",
    },
    {
      stars: 3,
      titleComment: "Muy buen secador, liviano y potente",
      name: "Lucia Artigas",
      description: "Liviano, super potente, cómodo.",
    },
  ];

  return (
    <div>
      <TabView>
        <TabPanel header="Todas">
          {comments.map((el) => (
            <OpinionItem comment={el}></OpinionItem>
          ))}
        </TabPanel>
        <TabPanel header="Positivas">
          {comments.map((el) => {
            if (el.stars > 3) {
              return <OpinionItem comment={el}></OpinionItem>;
            }
          })}
        </TabPanel>
        <TabPanel header="Negativas">
          {comments.map((el) => {
            if (el.stars < 3) {
              return <OpinionItem comment={el}></OpinionItem>;
            }
          })}
        </TabPanel>
      </TabView>
    </div>
  );
}
