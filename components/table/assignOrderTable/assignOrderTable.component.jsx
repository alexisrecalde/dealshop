import { useState, Fragment, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import { FaPencilAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

import TableComponent from "../table.component";
import AssignOrderModalComponent from "./assignOrderModal.component";
import { DataGrid } from "@mui/x-data-grid";
import DataGridTable from "../../dataGrid/dataGridTable.component";
import { useMutationOrdersAsignarOrdenVendedor } from "../../hooks/orders";

const AssignOrderTableComponent = ({
  sellers,
  orders,
  authToken,
  setPage,
  page,
  total,
  isLoading,
  pagination,
  setPagination,
  isError,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rowItem, setRowItem] = useState(null);

  const [rows, setRows] = useState([]);
  const [totalOf, setTotalOf] = useState();
  const [errorLoad, setErrorLoad] = useState();

  useEffect(() => {
    if (isLoading) {
      // setRows([]);
    } else if (isError) {
      setErrorLoad(true);
    } else {
      setRows(orders.results);
      setTotalOf(orders.total);
    }
  }, [isLoading, orders]);

  const {
    // isLoading: loadingEliminado,
    isSuccess: successEliminar,
    mutate: mutateAsignarVendedor,
  } = useMutationOrdersAsignarOrdenVendedor();

  const arrayOfColumns = [
    {
      field: "nroOrden",
      headerName: "Numero de orden°",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "nombreCliente",
      headerName: "Nombre de cliente",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "fecha",
      headerName: "Fecha",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 250,
      disableClickEventBubbling: true,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const { id } = params.row;
        return (
          <Fragment>
            <Tooltip title="Asignar" placement="top">
              <FaPencilAlt
                key={id}
                style={{
                  cursor: "pointer",
                  fontSize: "1.5rem",
                  marginLeft: 10,
                  color: "#00bcd4",
                }}
                onClick={() => assignOrder(params)}
              />
            </Tooltip>
          </Fragment>
        );
      },
    },
  ];

  const assignOrder = async (item) => {
    setRowItem(item);
    setIsOpen(true);
  };

  const arrayOfItems = rows.map((item) => {
    return {
      id: item.id,
      nroOrden: item.id,
      nombreCliente: item.clientName,
      fecha: item.orderDate.substr(0, 10),
      actions: item,
    };
  });

  const defaultArray = [
    {
      id: "",
      description: "No hay ordenes pendientes de asignación",
    },
  ];

  return (
    <Fragment>
      <DataGridTable
        columns={arrayOfColumns}
        rows={arrayOfItems}
        loading={isLoading}
        allPedidos={true}
        pagination={pagination}
        totalOfOrders={totalOf}
        onPageChange={(params) => {
          if (params > pagination) {
            setPage(page + 10);
            setPagination(params);
          } else {
            setPage(page - 10);
            setPagination(params);
          }
        }}
        sortModel={[
          {
            field: "id",
            sort: "desc",
          },
        ]}
      />
      <AssignOrderModalComponent
        rowItem={rowItem}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        sellers={sellers}
        authToken={authToken}
        mutateAsignarVendedor={mutateAsignarVendedor}
      />
    </Fragment>
  );
};

export default AssignOrderTableComponent;
