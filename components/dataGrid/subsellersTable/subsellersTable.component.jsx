import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { IoPersonAdd, IoPersonRemove } from 'react-icons/io5';
import Swal from 'sweetalert2';

import DataGridTable from '../dataGridTable.component';
import AssignSupersellerDialogComponent from './assignSupersellerDialog.component';
import { patchSuperseller } from '../../../queries/users/users.queries';

const SubSellersTableComponent = ({ sellersList, authToken }) => {
    const router = useRouter();

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [sellerId, setSellerId] = useState(null);

    const editDialog = () => {
        if (openEditDialog) {
            const possibleSellers = sellersList.sellers
                .filter((seller) => seller.superSellerId == null)
                .filter((seller) => seller.id != sellerId);

            return (
                <AssignSupersellerDialogComponent
                    sellerId={sellerId}
                    isOpen={openEditDialog}
                    setOpen={setOpenEditDialog}
                    authToken={authToken}
                    possibleSellers={possibleSellers}
                />
            );
        }
        return;
    };

    const arrayOfColumns = [
        { field: 'id', headerName: 'Id vendedor', width: 120, align: 'center', headerAlign: 'center' },
        { field: 'firstName', headerName: 'Nombre', width: 300, align: 'center', headerAlign: 'center' },
        { field: 'lastName', headerName: 'Apellido', width: 300, align: 'center', headerAlign: 'center' },
        { field: 'phone', headerName: 'Teléfono', width: 125, align: 'center', headerAlign: 'center' },
        { field: 'leader', headerName: 'Líder', width: 325, align: 'center', headerAlign: 'center' },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 120,
            disableClickEventBubbling: true,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                const { id, superSellerId } = params.value;

                const onAddSuperSeller = () => {
                    setSellerId(id);
                    setOpenEditDialog(true);
                    return;
                };

                const onRemoveSuperSeller = () => {
                    Swal.fire({
                        title: 'Estás seguro de querés removerle el vendedor líder?',
                        showCancelButton: true,
                        reverseButtons: true,
                        confirmButtonColor: '#e91e63',
                        cancelButtonText: 'Cancelar',
                        confirmButtonText: 'Confirmar',
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            try {
                                await patchSuperseller({ userId: id, superSellerId: null }, authToken);

                                Swal.fire({
                                    title: 'Listo!',
                                    text: 'Se removió el vendedor líder',
                                    icon: 'success',
                                    confirmButtonColor: '#00bcd4',
                                }).then(() => {
                                    router.reload().then(() => window.scrollTo(0, 0));
                                });
                            } catch (e) {
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Ocurrió un error al remover al vendedor lider. Por favor intente mas tarde.',
                                    icon: 'error',
                                    confirmButtonColor: '#00bcd4',
                                }).then(() => {
                                    router.reload().then(() => window.scrollTo(0, 0));
                                });
                            }
                        }
                    });
                };

                return (
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        {superSellerId == null ? (
                            <Tooltip title="Asignar" placement="top">
                                <IconButton onClick={onAddSuperSeller} size="large">
                                    <IoPersonAdd style={{ fontSize: '1.3rem', color: '#00bcd4' }} />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Remover" placement="top">
                                <IconButton onClick={onRemoveSuperSeller} size="large">
                                    <IoPersonRemove style={{ fontSize: '1.2rem', color: '#e91e63' }} />
                                </IconButton>
                            </Tooltip>
                        )}
                    </div>
                );
            },
        },
    ];

    const arrayOfItems = sellersList.subsellers.map((subseller) => {
        return {
            id: subseller.id,
            firstName: subseller.firstName,
            lastName: subseller.lastName,
            phone: subseller.phone,
            leader: subseller.leader,
            actions: { id: subseller.id, superSellerId: subseller.superSellerId },
        };
    });

    return (
        <Fragment>
            <DataGridTable columns={arrayOfColumns} rows={arrayOfItems} />
            {editDialog()}
        </Fragment>
    );
};

export default SubSellersTableComponent;
