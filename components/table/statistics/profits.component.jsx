import { useState, useEffect } from "react";
import TableComponent from "../table.component";
import Grid from "@mui/material/Grid";
import { CurrencyInput, CurrencyText } from "../../../utils/number.utils";
import { getProfits } from "../../../queries/statistics/statistics.queries";
import Spinner from "../../spinner/spinner.component";

const ProductsRankComponent = ({ authToken }) => {
  const [loading, setLoading] = useState(false);
  const [lastWeekProfits, setLastWeekProfits] = useState([]);
  const [lastMonthProfits, setLastMonthProfits] = useState([]);
  const [lastThreeMonthProfits, setLastThreeMontProfits] = useState([]);

  useEffect(async () => {
    setLoading(true);
    const lastWeekProfits = await getProfits(authToken, "day", 7);
    setLastWeekProfits(lastWeekProfits);

    const lastMonthProfits = await getProfits(authToken, "week", 4);
    setLastMonthProfits(lastMonthProfits);

    const lastThreeMonthProfits = await getProfits(authToken, "month", 3);
    setLastThreeMontProfits(lastThreeMonthProfits);
    setLoading(false);
  }, []);

  const arrayOfColumnsLastWeek = [
    { id: 1, name: "Fecha" },
    { id: 2, name: "Total de Ventas" },
    { id: 3, name: "Ganancias" },
  ];

  const arrayOfColumnsLastMonth = [
    { id: 4, name: "Semana" },
    { id: 5, name: "Total de Ventas" },
    { id: 6, name: "Ganancias" },
  ];

  const arrayOfColumnsLastThreeMonth = [
    { id: 7, name: "Mes" },
    { id: 8, name: "Total de Ventas" },
    { id: 9, name: "Ganancias" },
  ];

  const itemsLastWeekProfits = lastWeekProfits.map((item) => {
    return {
      date: item.formattedDate,
      totalAmountSold: <CurrencyText value={item.totalAmountSold} />,
      totalEarnings: <CurrencyText value={item.totalEarnings} />,
    };
  });

  const itemsLastMonthProfits = lastMonthProfits.map((item) => {
    return {
      date: item.description,
      totalAmountSold: <CurrencyText value={item.totalAmountSold} />,
      totalEarnings: <CurrencyText value={item.totalEarnings} />,
    };
  });

  const itemsLastThreeMonthProfits = lastThreeMonthProfits.map((item) => {
    return {
      date: item.description,
      totalAmountSold: <CurrencyText value={item.totalAmountSold} />,
      totalEarnings: <CurrencyText value={item.totalEarnings} />,
    };
  });

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <h4>Ganancias últimos 7 días</h4>
            <TableComponent
              columns={arrayOfColumnsLastWeek}
              rows={itemsLastWeekProfits}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Grid item lg={12}>
              <h4>Ganancias del último mes</h4>
              <TableComponent
                columns={arrayOfColumnsLastMonth}
                rows={itemsLastMonthProfits}
              />
            </Grid>
            <Grid item lg={12}>
              <h4>Ganancias últimos 3 meses</h4>
              <TableComponent
                columns={arrayOfColumnsLastThreeMonth}
                rows={itemsLastThreeMonthProfits}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ProductsRankComponent;
