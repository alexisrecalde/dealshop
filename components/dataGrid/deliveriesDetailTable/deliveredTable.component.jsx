import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { FaEye } from 'react-icons/fa';

import DataGridTable from '../dataGridTable.component';

import { StatusContainer, OrderStatus } from './deliveryDetailsTable.styles';
import { CurrencyText } from '../../../utils/number.utils';
import { formatDate } from '../../../utils/general.utils';

const DeliveredTableComponent = ({ orders, authToken }) => {
  const router = useRouter();

  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900 ? setMobileView(true) : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener('resize', () => setResponsiveness());
  }, [window.innerWidth]);

  const arrayOfColumns = [
    { field: 'id', headerName: 'Pedido n°', width: 125, align: 'center', headerAlign: 'center' },
    {
      field: 'estimatedDeliveryDate',
      headerName: 'Fecha de entrega',
      width: 175,
      align: 'center',
      headerAlign: 'center',
    },
    { field: 'clientName', headerName: 'Cliente', width: 250, align: 'center', headerAlign: 'center' },
    { field: 'location', headerName: 'Zona', width: 160, align: 'center', headerAlign: 'center' },
    {
      field: 'totalAmount',
      headerName: 'Monto total',
      width: 175,
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
      field: 'status',
      headerName: 'Estado',
      width: 125,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        switch (params.value) {
          case 'Entregado':
            return (
              <StatusContainer>
                <OrderStatus color="#8BC34A">E</OrderStatus>
              </StatusContainer>
            );
          default:
            return (
              <StatusContainer>
                <OrderStatus color="#ffffff">{params.value}</OrderStatus>
              </StatusContainer>
            );
        }
      },
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 175,
      disableClickEventBubbling: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const { id } = params.row;

        return (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Tooltip title="Ver detalle" placement="top">
              <IconButton onClick={() => router.push(`/pedidos/${id}`)} size="large">
                <FaEye style={{ fontSize: '1.6rem', color: '#00bcd4' }} />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const arrayOfColumnsMobile = [
    { field: 'id', headerName: 'N°', width: 80, align: 'center', headerAlign: 'center' },
    {
      field: 'totalAmount',
      headerName: 'Monto',
      width: 100,
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
      field: 'status',
      headerName: 'Estado',
      width: 85,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        switch (params.value) {
          case 'Entregado':
            return (
              <StatusContainer>
                <OrderStatus color="#8BC34A">E</OrderStatus>
              </StatusContainer>
            );
          default:
            return (
              <StatusContainer>
                <OrderStatus color="#ffffff">{params.value}</OrderStatus>
              </StatusContainer>
            );
        }
      },
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 100,
      disableClickEventBubbling: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const { id } = params.row;

        return (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Tooltip title="Ver detalle" placement="top">
              <IconButton onClick={() => router.push(`/pedidos/${id}`)} size="large">
                <FaEye style={{ fontSize: '1.6rem', color: '#00bcd4' }} />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const arrayOfItems = orders.map((order) => {
    return {
      id: order.id,
      estimatedDeliveryDate: formatDate(order.estimatedDeliveryDate.substr(0, 10)),
      clientName: order.clientName,
      address: order.clientAddress != null ? `${order.clientAddress.street}  ${order.clientAddress.streetNumber}` : '-',
      apartment:
        order.clientAddress != null
          ? `${order.clientAddress.floor ? order.clientAddress.floor + '° -' : ''} ${
              order.clientAddress.apartment ? order.clientAddress.apartment : '-'
            }`
          : ' - ',
      location: order.clientAddress != null ? order.clientAddress.location : '',
      totalAmount: order.clientSellingTotalPrice,
      status: order.status.description,
    };
  });

  return (
    <DataGridTable
      columns={mobileView ? arrayOfColumnsMobile : arrayOfColumns}
      rows={arrayOfItems}
      sortModel={[
        {
          field: 'id',
          sort: 'desc',
        },
      ]}
    />
  );
};

export default DeliveredTableComponent;
