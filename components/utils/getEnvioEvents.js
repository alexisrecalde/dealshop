export default function getEnvioEvents(id) {
  const eventsEnReview = [
    {
      status: "Orden recibida",
      date: "",
      icon: "pi pi-shopping-cart",
      color: "#E91E63",
    },
    {
      status: "Preparacion pendiente",
      date: "",
      icon: "pi pi-box",
      color: "#E91E63",
    },
    {
      status: "En Camino pendiente",
      date: "",
      icon: "pi pi-car",
      color: "#E91E63",
    },
    {
      status: "Entrega Pendiente",
      date: "",
      icon: "pi pi-check",
      color: "#E91E63",
    },
  ];

  const eventsEnPreparacion = [
    {
      status: "Orden recibida",
      date: "",
      icon: "pi pi-shopping-cart",
      color: "#E91E63",
    },
    {
      status: "En preparacion",
      date: "",
      icon: "pi pi-box",
      color: "#E91E63",
    },
    {
      status: "En Camino pendiente",
      date: "",
      icon: "pi pi-car",
      color: "#E91E63",
    },
    {
      status: "Entrega Pendiente",
      date: "",
      icon: "pi pi-check",
      color: "#E91E63",
    },
  ];

  const eventsEnCamino = [
    {
      status: "Orden recibida",
      date: "",
      icon: "pi pi-shopping-cart",
      color: "#E91E63",
    },
    {
      status: "En preparacion",
      date: "",
      icon: "pi pi-box",
      color: "#E91E63",
    },
    {
      status: "En Camino",
      date: "",
      icon: "pi pi-car",
      color: "#E91E63",
    },
    {
      status: "Entrega Pendiente",
      date: "",
      icon: "pi pi-check",
      color: "#E91E63",
    },
  ];
  const eventsEntregado = [
    {
      status: "Orden recibida",
      date: "",
      icon: "pi pi-shopping-cart",
      color: "#E91E63",
    },
    {
      status: "En preparacion",
      date: "",
      icon: "pi pi-box",
      color: "#E91E63",
    },
    {
      status: "En Camino",
      date: "",
      icon: "pi pi-car",
      color: "#E91E63",
    },
    {
      status: "Entregado",
      date: "",
      icon: "pi pi-check",
      color: "#E91E63",
    },
  ];

  switch (id) {
    case 1:
      return eventsEnReview;
    case 7:
      return eventsEnCamino;
    case 8:
      return eventsEntregado;
    case 4:
      return eventsEnReview;
    case 6:
      return eventsEnPreparacion;
  }
}
