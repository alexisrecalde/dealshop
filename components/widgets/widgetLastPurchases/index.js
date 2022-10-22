import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { Card } from "primereact/card";
import { Chip } from "primereact/chip";
import Swal from "sweetalert2";
import ReactDOMServer from "react-dom/server";
import UserModalApprobe from "../../table/userTable/userModalApprobe";
import { FaEye } from "react-icons/fa";
import DataGridTable from "../../../components/dataGrid/dataGridTable.component";
import { formatDate } from "../../../utils/general.utils";

import { patchSuperseller } from "../../../queries/users/users.queries";

const WidgetLastPurchases = ({ listaDeComprasClientes, authToken }) => {
  const router = useRouter();

  const Chip = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  const ChipOrdeer = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  const userModal = (user) => {
    const userModal = <UserModalApprobe user={user} />;
    Swal.fire({
      html: ReactDOMServer.renderToStaticMarkup(userModal),
      reverseButtons: true,
      confirmButtonColor: "#00bcd4",
      confirmButtonText: "Cerrar",
    });
  };

  const arrayOfColumns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    // {
    //   field: "perfil",
    //   headerName: "Perfil",
    //   width: 100,
    //   disableClickEventBubbling: true,
    //   align: "center",
    //   headerAlign: "center",
    //   renderCell: (params) => {
    //     const { purchase } = params.value;
    //     return (
    //       <div
    //         style={{
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //         }}
    //       >
    //         <div
    //           style={{
    //             cursor: "pointer",
    //             fontSize: "14px",
    //             color: "blue",
    //           }}
    //           onClick={() => userModal(purchase)}
    //         >
    //           Ver Perfil
    //         </div>
    //       </div>
    //     );
    //   },
    // },
    {
      field: "status",
      headerName: "Estado",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const { purchase } = params.value;
        switch (purchase) {
          case 1:
            return <ChipOrdeer type="Aprobado" />;
          case 2:
            return <ChipOrdeer type="Pendiente" />;
          case 3:
            return <ChipOrdeer type="Error" />;
          case 4:
            return <ChipOrdeer type="Pendiente" />;
        }
      },
    },
  ];

  const arrayOfItems = listaDeComprasClientes.map((compras) => {
    return {
      fecha: formatDate(compras.createdAt.substr(0, 10)),
      id: compras.id,
      email: compras.email,
      perfil: { purchase: compras },
      status: { purchase: compras.clientStatusOrderId },
    };
  });

  return (
    <Card>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h2 style={{ color: "#e91e63", fontSize: "18px" }}>Ultimas ventas</h2>
      </div>
      <DataGridTable
        columns={arrayOfColumns}
        rows={arrayOfItems}
        widget={true}
      />
    </Card>
  );
};

export default WidgetLastPurchases;
