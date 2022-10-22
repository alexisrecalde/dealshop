import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { CurrencyText } from "../../../utils/number.utils";

import { MdRemoveRedEye } from "react-icons/md";
import { Fragment } from "react";
import DataGridTable from "../dataGridTable.component";
import { DataContainer } from "./walletTable.styles";

const SellersWalletTableComponent = ({ name, sellers }) => {
  const router = useRouter();

  const arrayOfColumns = [
    {
      field: "name",
      headerName: "Vendedor",
      width: 500,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "balance",
      headerName: "Monto",
      width: 300,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const balance = params.value;
        return (
          <DataContainer>
            <CurrencyText value={balance} />
          </DataContainer>
        );
      },
    },
    {
      field: "actions",
      headerName: "Billetera",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        if (params.value != "") {
          return (
            <DataContainer>
              <Tooltip title="Ver Movimientos" placement="top">
                <IconButton
                  onClick={() =>
                    router.push(`/admin/billeteras/${params.value}`)
                  }
                  size="large">
                  <MdRemoveRedEye
                    style={{ fontSize: "1.5rem", color: "#00bcd4" }}
                  />
                </IconButton>
              </Tooltip>
            </DataContainer>
          );
        }
      },
    },
    {
      field: "leader",
      headerName: "Líder",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
  ];

  const arrayOfRows = sellers
    .map((seller) => {
      return {
        id: seller.id,
        name: `${seller.firstName} ${seller.lastName}`,
        balance: seller.wallet.balance,
        actions: seller.wallet.id,
        leader: seller.superSellerId
          ? `${seller.superSeller.firstName} ${seller.superSeller.lastName}`
          : "",
      };
    })
    .filter((sellerRow) =>
      sellerRow.name.toLowerCase().includes(name.toLowerCase())
    );

  const defaultArray = [
    {
      id: 0,
      name: "No se encontraron resultados.",
      balance: "",
      actions: "",
    },
  ];

  return (
    <Fragment>
      {name ? (
        <h3 style={{ color: "#e91e63" }}>
          Resultados encontrados para: "{name}"
        </h3>
      ) : (
        <h3 style={{ color: "#e91e63" }}>Resultados:</h3>
      )}
      <DataGridTable
        columns={arrayOfColumns}
        rows={arrayOfRows.length > 0 ? arrayOfRows : defaultArray}
      />
    </Fragment>
  );
};

export default SellersWalletTableComponent;
