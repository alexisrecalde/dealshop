export const customizedMarker = (item) => {
    switch (item.status) {
      case "Orden recibida":
        return (
          <span
            className="custom-marker shadow-1"
            style={{
              backgroundColor: item.color,
              color: "#fff",
              padding: "8px",
              fontSize: "5px",
              borderRadius: "50%",
            }}
          >
            <i className={item.icon}></i>
          </span>
        );
      case "En preparacion":
        return (
          <span
            className="custom-marker shadow-1"
            style={{
              backgroundColor: item.color,
              color: "#fff",
              padding: "8px",
              fontSize: "5px",
              borderRadius: "50%",
            }}
          >
            <i className={item.icon}></i>
          </span>
        );
      case "En Camino":
        return (
          <span
            className="custom-marker shadow-1"
            style={{
              backgroundColor: item.color,
              color: "#fff",
              padding: "8px",
              fontSize: "5px",
              borderRadius: "50%",
            }}
          >
            <i className={item.icon}></i>
          </span>
        );
      case "Entregado":
        return (
          <span
            className="custom-marker shadow-1"
            style={{
              backgroundColor: item.color,
              color: "#fff",
              padding: "8px",
              fontSize: "5px",
              borderRadius: "50%",
            }}
          >
            <i className={item.icon}></i>
          </span>
        );
    }
  };