import { useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { FaTrashAlt } from 'react-icons/fa';

import CustomButtonComponent from '../../customButton/customButton.component';
import DataGridTable from '../dataGridTable.component';

import { addProvider, deleteProvider } from '../../../queries/providers/providers.queries';

const ProvidersTableComponent = ({ authToken, providers, setOpen }) => {
  const router = useRouter();

  const onAddProvider = () => {
    Swal.fire({
      title: 'Nuevo Proveedor',
      input: 'text',
      inputLabel: 'Ingresa el nombre del nuevo proveedor',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#e91e63',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      inputValidator: (value) => {
        if (!value) {
          return 'Ingresa un nombre para continuar';
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setOpen(true);
        addProvider(authToken, result.value)
          .then(() => {
            setOpen(false);
            Swal.fire({
              title: 'Listo!',
              text: 'El proveedor ha sido creado',
              icon: 'success',
              confirmButtonColor: '#00bcd4',
            }).then(() => {
              router.reload().then(() => window.scrollTo(0, 0));
            });
          })
          .catch(() => {
            setOpen(false);
            Swal.fire({
              title: 'Error!',
              text: 'No se pudo crear el nuevo proveedor, por favor intente más tarde',
              icon: 'error',
              confirmButtonColor: '#00bcd4',
            }).then(() => {
              router.reload().then(() => window.scrollTo(0, 0));
            });
          });
      }
    });
  };

  const arrayOfColumns = [
    { field: 'id', headerName: 'ID', width: 100, align: 'center', headerAlign: 'center' },
    { field: 'description', headerName: 'Proveedor', width: 200, align: 'center', headerAlign: 'center' },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 250,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const { id, description } = params.row;

        const onClickDelete = (providerId) => {
          Swal.fire({
            icon: 'question',
            title: `Estás seguro que deseas eliminar a ${description} de la lista de proveedores?`,
            showCancelButton: true,
            confirmButtonColor: '#e91e63',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar',
          }).then((result) => {
            if (result.isConfirmed) {
              setOpen(true);
              deleteProvider(authToken, providerId)
                .then(() => {
                  setOpen(false);
                  Swal.fire({
                    title: 'Listo!',
                    text: 'El proveedor ha sido eliminado',
                    icon: 'success',
                    confirmButtonColor: '#00bcd4',
                  }).then(() => {
                    router.reload().then(() => window.scrollTo(0, 0));
                  });
                })
                .catch(() => {
                  setOpen(false);
                  Swal.fire({
                    title: 'Error!',
                    text: 'No se pudo eliminar al proveedor, por favor intente más tarde',
                    icon: 'error',
                    confirmButtonColor: '#00bcd4',
                  }).then(() => {
                    router.reload().then(() => window.scrollTo(0, 0));
                  });
                });
            }
          });
        };

        return (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Tooltip title="Eliminar" placement="top">
              <IconButton onClick={() => onClickDelete(id)} size="large">
                <FaTrashAlt style={{ fontSize: '1.2rem', color: '#e91e63' }} />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const arrayOfItems = providers
    .filter((provider) => provider.isActive)
    .map((provider) => {
      return {
        id: provider.id,
        description: provider.description,
      };
    });

  return (
    <Fragment>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CustomButtonComponent
          color="secondary"
          style={{ fontSize: '1rem', padding: '5px 20px', height: '45px' }}
          onClick={onAddProvider}
        >
          Agregar Proveedor
        </CustomButtonComponent>
      </div>
      <DataGridTable
        columns={arrayOfColumns}
        rows={arrayOfItems}
        sortModel={[
          {
            field: 'id',
            sort: 'desc',
          },
        ]}
      />
    </Fragment>
  );
};

export default ProvidersTableComponent;
