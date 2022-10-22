import { useState, useEffect, Fragment } from 'react';

import DataGridTable from '../dataGridTable.component';
import Spinner from '../../spinner/spinner.component';
import { CurrencyText } from '../../../utils/number.utils';

import { getSalesBySeller } from '../../../queries/statistics/statistics.queries';

const SalesBySellerTableComponent = ({ authToken }) => {
  const [loading, setLoading] = useState(false);
  const [salesBySeller, setSalesBySeller] = useState([]);

  useEffect(async () => {
    setLoading(true);
    const data = await getSalesBySeller(authToken);
    setSalesBySeller(data);
    setLoading(false);
  }, []);

  const arrayOfColumns = [
    { field: 'id', headerName: 'Orden N°', width: 100, align: 'center', headerAlign: 'center' },
    { field: 'seller', headerName: 'Vendedor', width: 300, align: 'center', headerAlign: 'center' },
    {
      field: 'deliveryDate',
      headerName: 'Fecha de Entrega',
      width: 300,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'comission',
      headerName: 'Comisión',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <CurrencyText value={params.value} />
          </div>
        );
      },
    },
    {
      field: 'sellingTotalPrice',
      headerName: 'Total Venta',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <CurrencyText value={params.value} />
          </div>
        );
      },
    },
  ];

  const arrayOfItems = salesBySeller.map((item) => {
    return {
      id: item.id,
      seller: item.sellerName,
      deliveryDate: item.deliveryDate,
      comission: item.comission,
      sellingTotalPrice: item.sellingTotalPrice,
    };
  });

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <DataGridTable
          columns={arrayOfColumns}
          rows={arrayOfItems}
          sortModel={[
            {
              field: 'deliveryDate',
              sort: 'desc',
            },
          ]}
        />
      )}
    </Fragment>
  );
};

export default SalesBySellerTableComponent;
