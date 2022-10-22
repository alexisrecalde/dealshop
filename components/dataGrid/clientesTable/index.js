import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { IoPersonAdd, IoPersonRemove } from "react-icons/io5";
import Swal from "sweetalert2";
import ReactDOMServer from "react-dom/server";
import UserModalApprobe from "../../table/userTable/userModalApprobe";
import { FaEye } from "react-icons/fa";
import DataGridTable from "../dataGridTable.component";

import { patchSuperseller } from "../../../queries/users/users.queries";

const ClienteTableComponent = ({ listaDeCliente, authToken }) => {
  const router = useRouter();
  const [value3, setValue3] = useState("");
  const [value4, setValue4] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [list, setList] = useState(listaDeCliente);

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
      field: "id",
      headerName: "Id Cliente",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "firstName",
      headerName: "Nombre",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "lastName",
      headerName: "Apellido",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "phone",
      headerName: "Teléfono",
      width: 125,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      align: "center",
      headerAlign: "center",
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
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                cursor: "pointer",
                fontSize: "14px",
                color: "blue",
              }}
              onClick={() => userModal(cliente)}
            >
              Ver Perfil
            </div>
          </div>
        );
      },
    },
    {
      field: "compras",
      headerName: "Compras",
      width: 110,
      disableClickEventBubbling: true,
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
            <div
              cl
              style={{
                cursor: "pointer",
                fontSize: "14px",
                color: "blue",
                marginLeft: "10px",
              }}
              onClick={() =>
                router
                  .push(`/admin/clientes/compras/${cliente.id}`)
                  .then(() => window.scrollTo(0, 0))
              }
            >
              Ver compras
            </div>
          </div>
        );
      },
    },
  ];

  const onClickBuscarNombre = () => {
    const filteredRows = listaDeCliente.filter((row) => {
      return row.firstName.toLowerCase().includes(value3.toLowerCase());
    });
    setList(filteredRows);
  };

  const onClickBuscarEmail = () => {
    const filteredRows = listaDeCliente.filter((row) => {
      return row.email.toLowerCase().includes(value4.toLowerCase());
    });
    setList(filteredRows);
  };

  const arrayOfItems = list.map((client) => {
    return {
      id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
      phone: client.phone,
      email: client.email,
      perfil: { cliente: client },
      compras: { cliente: client },
    };
  });

  return (
    <Fragment>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="col-12 md:col-3" style={{ marginRigh: "20px" }}>
          <div className="p-inputgroup">
            <InputText
              placeholder="Buscar usuario por nombre"
              value={value3}
              onChange={(e) => setValue3(e.target.value)}
            />
            <Button
              icon="pi pi-search"
              className="p-button-warning"
              style={{ backgroundColor: "#E91E63", borderColor: "#E91E63" }}
              onClick={onClickBuscarNombre}
            />
          </div>
        </div>
        <div className="col-12 md:col-3">
          <div className="p-inputgroup">
            <InputText
              name="email"
              placeholder="Buscar usuario por email"
              value={value4}
              onChange={(e) => setValue4(e.target.value)}
            />
            <Button
              icon="pi pi-search"
              className="p-button-warning"
              style={{ backgroundColor: "#E91E63", borderColor: "#E91E63" }}
              onClick={onClickBuscarEmail}
            />
          </div>
        </div>
      </div>
      <DataGridTable
        columns={arrayOfColumns}
        rows={arrayOfItems}
        ventas={true}
      />
    </Fragment>
  );
};

export default ClienteTableComponent;
