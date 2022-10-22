import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Swal from 'sweetalert2';
import { FaEye } from 'react-icons/fa';

import DataGridTable from '../dataGridTable.component';
import { orderStatusEnum } from '../../../utils/constants.utils';
import { changeStatusOrder } from '../../../queries/orders/orders.queries';

import { StatusContainer, OrderStatus } from './deliveryDetailsTable.styles';
import { formatDate } from '../../../utils/general.utils';

const DeliveryTableComponent = ({ orders, authToken }) => {
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
    {
      field: 'estimatedDeliveryDate',
      headerName: 'Fecha de entrega',
      width: 175,
      align: 'center',
      headerAlign: 'center',
    },
    { field: 'clientName', headerName: 'Cliente', width: 250, align: 'center', headerAlign: 'center' },
    { field: 'address', headerName: 'Dirección', width: 250, align: 'center', headerAlign: 'center' },
    { field: 'apartment', headerName: 'Depto', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'location', headerName: 'Zona', width: 160, align: 'center', headerAlign: 'center' },
    {
      field: 'status',
      headerName: 'Estado',
      width: 125,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        switch (params.value) {
          case 'Nuevo':
            return (
              <StatusContainer>
                <OrderStatus color="#FFEB3B">N</OrderStatus>
              </StatusContainer>
            );
          case 'En camino':
            return (
              <StatusContainer>
                <OrderStatus color="#FF9800">EC</OrderStatus>
              </StatusContainer>
            );
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
        const { id, orderData } = params.row;
        const { statusId } = orderData;

        const onClickEnCamino = () => {
          Swal.fire({
            title: `Estás seguro que querés cambiar a En camino la orden n° ${id}?`,
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonColor: '#e91e63',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar',
          }).then((result) => {
            if (result.isConfirmed) {
              changeStatusOrder({ id, authToken, statusId: orderStatusEnum.EN_CAMINO, message: result.value });
              Swal.fire('Listo!', 'La orden ha sido cambiada a En Camino!', 'success').then(() => {
                router.reload();
              });
            }
          });
        };

        const onClickEntregado = () => {
          Swal.fire({
            title: `Estás seguro que querés cambiar a Entregada la orden n° ${id}?`,
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonColor: '#e91e63',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar',
          }).then((result) => {
            if (result.isConfirmed) {
              changeStatusOrder({ id, authToken, statusId: orderStatusEnum.ENTREGADO, message: result.value });
              Swal.fire('Listo!', 'La orden ha sido cambiada a Entregada!', 'success').then(() => {
                router.reload();
              });
            }
          });
        };

        return (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Tooltip title="Ver detalle" placement="top">
              <IconButton onClick={() => router.push(`/pedidos/${id}`)} size="large">
                <FaEye style={{ fontSize: '1.6rem', color: '#00bcd4' }} />
              </IconButton>
            </Tooltip>
            {statusId === 1 ? (
              <Tooltip title="En camino" placement="top">
                <IconButton onClick={onClickEnCamino} size="large">
                  <img src="/img/icons/envios_en_camino.png" style={{ height: '1.6rem' }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Fragment />
            )}
            {statusId === 2 ? (
              <Tooltip title="Entregado" placement="top">
                <IconButton onClick={onClickEntregado} size="large">
                  <img src="/img/icons/envios_entregado.png" style={{ height: '1.55rem' }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Fragment />
            )}
          </div>
        );
      },
    },
  ];

  const arrayOfColumnsMobile = [
    { field: 'address', headerName: 'Dirección', width: 200, align: 'center', headerAlign: 'center' },
    { field: 'apartment', headerName: 'Depto', width: 100, align: 'center', headerAlign: 'center' },
    { field: 'location', headerName: 'Zona', width: 100, align: 'center', headerAlign: 'center' },
    {
      field: 'status',
      headerName: 'Estado',
      width: 85,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        switch (params.value) {
          case 'Nuevo':
            return (
              <StatusContainer>
                <OrderStatus color="#FFEB3B">N</OrderStatus>
              </StatusContainer>
            );
          case 'En camino':
            return (
              <StatusContainer>
                <OrderStatus color="#FF9800">EC</OrderStatus>
              </StatusContainer>
            );
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
        const { id, orderData } = params.row;
        const { statusId } = orderData;

        const onClickEnCamino = () => {
          Swal.fire({
            title: `Estás seguro que querés cambiar a En camino la orden n° ${id}?`,
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonColor: '#e91e63',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar',
          }).then((result) => {
            if (result.isConfirmed) {
              changeStatusOrder({ id, authToken, statusId: orderStatusEnum.EN_CAMINO, message: result.value });
              Swal.fire('Listo!', 'La orden ha sido cambiada a En Camino!', 'success').then(() => {
                router.reload();
              });
            }
          });
        };

        const onClickEntregado = () => {
          Swal.fire({
            title: `Estás seguro que querés cambiar a Entregada la orden n° ${id}?`,
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonColor: '#e91e63',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar',
          }).then((result) => {
            if (result.isConfirmed) {
              changeStatusOrder({ id, authToken, statusId: orderStatusEnum.ENTREGADO, message: result.value });
              Swal.fire('Listo!', 'La orden ha sido cambiada a Entregada!', 'success').then(() => {
                router.reload();
              });
            }
          });
        };

        return (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Tooltip title="Ver detalle" placement="top">
              <IconButton onClick={() => router.push(`/pedidos/${id}`)} size="large">
                <FaEye style={{ fontSize: '1.6rem', color: '#00bcd4' }} />
              </IconButton>
            </Tooltip>
            {statusId === 1 ? (
              <Tooltip title="En camino" placement="top">
                <IconButton onClick={onClickEnCamino} size="large">
                  <img src="/img/icons/envios_en_camino.png" style={{ height: '1.6rem' }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Fragment />
            )}
            {statusId === 2 ? (
              <Tooltip title="Entregado" placement="top">
                <IconButton onClick={onClickEntregado} size="large">
                  <img src="/img/icons/envios_entregado.png" style={{ height: '1.55rem' }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Fragment />
            )}
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
      status: order.status.description,
      orderData: order,
    };
  });

  return <DataGridTable columns={mobileView ? arrayOfColumnsMobile : arrayOfColumns} rows={arrayOfItems} />;
};

export default DeliveryTableComponent;
