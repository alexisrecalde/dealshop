import { useState, useEffect, Fragment } from 'react';
import Spinner from '../../spinner/spinner.component';
import DataGridTable from '../dataGridTable.component';

import { getSellersRanking } from '../../../queries/statistics/statistics.queries';
import { CurrencyText } from '../../../utils/number.utils';
import { formatDate } from '../../../utils/general.utils';

const SellersRankTableComponent = ({ authToken }) => {
    const [loading, setLoading] = useState(false);
    const [sellersRank, setSellersRank] = useState([]);

    useEffect(async () => {
        setLoading(true);
        const result = await getSellersRanking(authToken);
        setSellersRank(result);
        setLoading(false);
    }, []);

    const arrayOfColumns = [
        { field: 'id', headerName: 'ID del vendedor', width: 150, align: 'center', headerAlign: 'center' },
        { field: 'name', headerName: 'Nombre', width: 300, align: 'center', headerAlign: 'center' },
        {
            field: 'lastSellingDate',
            headerName: 'Última fecha de venta',
            width: 300,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'totalAmountSold',
            headerName: 'Monto total vendido',
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
            field: 'totalQuantitySold',
            headerName: 'Cantidad de órdenes',
            width: 200,
            align: 'center',
            headerAlign: 'center',
        },
    ];

    const arrayOfItems = sellersRank.map((sellerData) => {
        return {
            id: sellerData.sellerId,
            name: sellerData.name,
            lastSellingDate: formatDate(sellerData.lastSellingDate.toString().substring(0, 10)),
            totalAmountSold: sellerData.totalAmountSold,
            totalQuantitySold: sellerData.totalQuantitySold,
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
                            field: 'totalAmountSold',
                            sort: 'desc',
                        },
                    ]}
                />
            )}
        </Fragment>
    );
};

export default SellersRankTableComponent;
