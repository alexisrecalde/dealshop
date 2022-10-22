import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { Card } from "primereact/card";
import Swal from "sweetalert2";
import ReactDOMServer from "react-dom/server";
import UserModalApprobe from "../../table/userTable/userModalApprobe";
import { FaEye } from "react-icons/fa";
import DataGridTable from "../../dataGrid/dataGridTable.component";
import { formatDate } from "../../../utils/general.utils";

import { patchSuperseller } from "../../../queries/users/users.queries";

const WidgetLastClients = ({ listaDeCliente, authToken }) => {
  const router = useRouter();

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
    {
      field: "name",
      headerName: "Nombre",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const { cliente } = params.value;
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {cliente.firstName} {cliente.lastName}
          </div>
        );
      },
    },
    {
      field: "perfil",
      headerName: "Perfil",
      width: 100,
      disableClickEventBubbling: true,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const { cliente } = params.value;
        return (
          <div
            style={{
              width:"100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FaEye
              onClick={() => userModal(cliente)}
              style={{ color: "blue", margin: "0 auto" }}
            />
          </div>
        );
      },
    },
    // {
    //   field: "id",
    //   headerName: "Id Cliente",
    //   width: 60,
    //   align: "center",
    //   headerAlign: "center",
    // },
  ];

  const arrayOfItems = listaDeCliente.map((client) => {
    return {
      fecha: formatDate(client.createdAt.substr(0, 10)),
      id: client.id,
      name: { cliente: client },
      lastName: client.lastName,
      email: client.email,
      perfil: { cliente: client },
    };
  });

  return (
    <Card>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h2 style={{ color: "#e91e63", fontSize: "18px" }}>
          Ultimos clientes logeados
        </h2>
      </div>
      <DataGridTable
        columns={arrayOfColumns}
        rows={arrayOfItems}
        widget={true}
      />
    </Card>
  );
};

export default WidgetLastClients;
