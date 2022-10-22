import { useState, useEffect, Fragment } from 'react';
import { IconButton } from '@mui/material';
import { IoDocumentText } from 'react-icons/io5';

import Spinner from '../../spinner/spinner.component';
import DataGridTable from '../dataGridTable.component';
import PDFGeneratorComponent from '../../pdf/pdfGenerator.component';
import { CurrencyText } from '../../../utils/number.utils';

import { getDeliveryHistory } from '../../../queries/statistics/statistics.queries';
import { formatDate } from '../../../utils/general.utils';

const DeliveryHistoryTableComponent = ({ authToken }) => {
    const [loading, setLoading] = useState(false);
    const [deliveryHistory, setDeliveryHistory] = useState([]);

    useEffect(async () => {
        setLoading(true);
        const response = await getDeliveryHistory(authToken);
        setDeliveryHistory(response.results);
        setLoading(false);
    }, []);

    const arrayOfColumns = [
        { field: 'id', headerName: 'Orden N°', width: 100, align: 'center', headerAlign: 'center' },
        { field: 'seller', headerName: 'Vendedor', width: 225, align: 'center', headerAlign: 'center' },
        {
            field: 'clientName',
            headerName: 'Cliente',
            width: 200,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'cadetName',
            headerName: 'Repartidor',
            width: 150,
            align: 'center',
            headerAlign: 'center',
        },
        { field: 'deliveryType', headerName: 'Tipo de venta', width: 170, align: 'center', headerAlign: 'center' },
        {
            field: 'estimatedDeliveryDate',
            headerName: 'Fecha de Entrega',
            width: 170,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <p>{params.value.substr(0, 10)}</p>
                    </div>
                );
            },
        },
        {
            field: 'clientSellingTotalPrice',
            headerName: 'Total de venta',
            width: 150,
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
            field: 'actions',
            headerName: 'Factura',
            width: 100,
            disableClickEventBubbling: true,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                const { id, orderData } = params.row;

                return (
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <PDFGeneratorComponent
                            component={
                                <IconButton size="large">
                                    <IoDocumentText style={{ fontSize: '1.3rem', color: '#e91e63' }} />
                                </IconButton>
                            }
                            data={{ name: `Factura_Dealshop_n${id}`, type: 1, documentsData: [orderData] }}
                        />
                    </div>
                );
            },
        },
    ];

    const arrayOfItems = deliveryHistory.map((order) => {
        return {
            id: order.id,
            seller: `${order.seller.firstName} ${order.seller.lastName}`,
            clientName: order.clientName,
            cadetName: order.cadet ? order.cadet.firstName : '-',
            deliveryType: order.deliveryType.description,
            estimatedDeliveryDate: formatDate(order.estimatedDeliveryDate),
            clientSellingTotalPrice: order.clientSellingTotalPrice,
            orderData: order,
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
                            field: 'estimatedDeliveryDate',
                            sort: 'desc',
                        },
                    ]}
                />
            )}
        </Fragment>
    );
};

export default DeliveryHistoryTableComponent;
