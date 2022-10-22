import { useState, useEffect, Fragment } from 'react';

import DataGridTable from '../dataGridTable.component';
import Spinner from '../../spinner/spinner.component';
import { CurrencyText } from '../../../utils/number.utils';

import { getProductsRanking } from '../../../queries/statistics/statistics.queries';

const ProductsRankTableComponent = ({ authToken }) => {
  const [loading, setLoading] = useState(false);
  const [productsRank, setProductsRank] = useState([]);

  useEffect(async () => {
    setLoading(true);
    const response = await getProductsRanking(authToken);
    setProductsRank(response.results);
    setLoading(false);
  }, []);

  const arrayOfColumns = [
    { field: 'name', headerName: 'Producto', width: 375, align: 'center', headerAlign: 'center' },
    { field: 'soldQuantity', headerName: 'Cantidad vendida', width: 225, align: 'center', headerAlign: 'center' },
    {
      field: 'stockQuantity',
      headerName: 'Cantidad en Stock',
      width: 225,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'costPrice',
      headerName: 'Precio de Compra',
      width: 225,
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
      field: 'sellingPrice',
      headerName: 'Precio de Venta',
      width: 225,
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

  const arrayOfItems = productsRank.map((item) => {
    return {
      id: item.id,
      name: item.name,
      soldQuantity: item.soldQuantity,
      stockQuantity: item.mainBranchQuantity + item.secondaryBranchQuantity,
      costPrice: item.costPrice,
      sellingPrice: item.sellingPrice,
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
              field: 'soldQuantity',
              sort: 'desc',
            },
          ]}
        />
      )}
    </Fragment>
  );
};

export default ProductsRankTableComponent;
