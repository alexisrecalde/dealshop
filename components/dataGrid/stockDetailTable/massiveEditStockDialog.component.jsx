import { Fragment } from 'react';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import CustomButtonComponent from '../../customButton/customButton.component';
import InputTextIcon from '../../dataGrid/stockDetailTable/inputTextIcon.component';
import MaterialTable from '@material-table/core';
import { updateProducts } from '../../../queries/products/products.queries';
import Swal from 'sweetalert2';
import { StatusContainer } from './stockDetailsTable.styles';
import { CurrencyText } from '../../../utils/number.utils';
import TableIcons from './materialTableIcons';
import Rating from '@mui/material/Rating';

class ProductStock {
  constructor(item) {
    this.id = item.id;
    this.name = item.name;
    this.description = item.description;
    this.mainBranchQuantity = item.mainBranchQuantity;
    this.secondaryBranchQuantity = item.secondaryBranchQuantity;
    this.costPrice = item.costPrice;
    this.sellingPrice = item.sellingPrice;
    this.suggestedPrice = item.suggestedPrice;
    this.stars = item.stars;
    this.brand = item.brand;
    this.provider = item.provider;
    this.color = item.color;
    this.category = item.category;
    this.subcategory = item.subcategory;
    this.material = item.material;
    this.weight = item.weight;
    this.photos = item.photos;
  }
}

export default function MassiveEditStockDialog({ isOpen, setOpen, rows, loadBackdrop }) {
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();

  const ImageComponentFactory = (item) => {
    return (
      <StatusContainer>
        <img
          src={
            item.photos.length < 1
              ? '/img/no-image.png'
              : `${publicRuntimeConfig.images_backend_url}${item.photos[0].image}`
          }
          alt="Imagen del producto"
          style={{ maxHeight: '100px' }}
        />
      </StatusContainer>
    );
  };

  const InputComponentFactory = (props, icon, type) => {
    let component = (
      <InputTextIcon
        defaultValue={props.value}
        icon={icon ? icon : null}
        type={type ? type : 'text'}
        onChange={(e) => props.onChange(e.target.value)}
      />
    );
    return component;
  };

  const PriceLabelComponentFactory = (propertyValue) => {
    return (
      <StatusContainer>
        <CurrencyText value={propertyValue} />
      </StatusContainer>
    );
  };

  const RatingEditableComponent = (props) => {
    return (
      <Rating
        name={'starsRating' + props.rowData.id}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    );
  };

  const columnsMapped = [
    {
      field: 'photo',
      title: 'Foto',
      type: 'image',
      editable: 'never',
      align: 'center',
      render: (value) => ImageComponentFactory(value),
    },
    {
      field: 'id',
      title: 'Id',
      type: 'numeric',
      editable: 'never',
      align: 'center',
      defaultSort: 'asc',
    },
    {
      field: 'name',
      title: 'Producto',
      type: 'text',
      align: 'center',
      editComponent: (props) => InputComponentFactory(props, null, 'text'),
    },
    {
      field: 'mainBranchQuantity',
      title: 'Stock Principal',
      type: 'numeric',
      align: 'center',
      editComponent: (props) => InputComponentFactory(props, 'shop', 'number'),
    },
    {
      field: 'secondaryBranchQuantity',
      title: 'Stock Secundario',
      type: 'numeric',
      align: 'center',
      editComponent: (props) => InputComponentFactory(props, 'shop', 'number'),
    },
    {
      field: 'costPrice',
      title: 'Precio de compra',
      type: 'currency',
      align: 'center',
      editComponent: (props) => InputComponentFactory(props, 'money', 'number'),
      render: (value) => PriceLabelComponentFactory(value.costPrice),
    },
    {
      field: 'sellingPrice',
      title: 'Precio de venta',
      type: 'currency',
      align: 'center',
      editComponent: (props) => InputComponentFactory(props, 'money', 'number'),
      render: (value) => PriceLabelComponentFactory(value.sellingPrice),
    },
    {
      field: 'suggestedPrice',
      title: 'Precio sugerido',
      type: 'currency',
      align: 'center',
      editComponent: (props) => InputComponentFactory(props, 'money', 'number'),
      render: (value) => PriceLabelComponentFactory(value.suggestedPrice),
    },
    {
      field: 'stars',
      title: 'Calificación',
      align: 'center',
      render: (value) => {
        return <Rating name="starsRating" readOnly value={value.stars} />;
      },
      type: 'numeric',
      editComponent: (props) => RatingEditableComponent(props),
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const updateStockProduct = (item) => {
    const productStock = new ProductStock(item);
    const body = [productStock];
    return updateProducts(body);
  };

  const updateBatchStockProduct = (changes) => {
    let body = new Array();
    const changesArray = Object.values(changes);
    changesArray.forEach((change) => {
      const producto = new ProductStock(change.newData);
      body.push(producto);
    });
    return updateProducts(body);
  };

  const materialTable = () => {
    if (rows.length === 0) return 'Sin registros';
    return (
      <MaterialTable
        title={null}
        icons={TableIcons}
        columns={columnsMapped}
        data={rows}
        localization={{
          header: { actions: 'Acciones' },
          body: {
            editTooltip: 'Editar',
            editRow: {
              saveTooltip: 'Guardar',
              cancelTooltip: 'Cancelar',
              deleteText: 'Estás seguro que querés eliminarlo',
            },
          },
          toolbar: {
            searchTooltip: 'Buscar',
            searchPlaceholder: 'Buscar',
          },
          pagination: {
            labelRowsSelect: 'filas',
            firstTooltip: 'Primera página',
            previousTooltip: 'Página anterior',
            nextTooltip: 'Página siguiente',
            lastTooltip: 'Última página',
          },
        }}
        options={{
          filtering: false,
          sorting: true,
        }}
        components={{
          Container: (props) => <div>{props.children}</div>,
        }}
        editable={{
          editTooltip: () => 'Editar',
          onBulkUpdate: (changes) =>
            updateBatchStockProduct(changes)
              .then(() => {
                Swal.fire('Modificado!', 'Los productos han sido modificados!', 'success').then(() => {
                  handleClose();
                  router.reload();
                });
              })
              .catch((e) => {
                Swal.fire('Error!', 'Hubo un error al modificar los productos!', 'error');
              }),
          onRowUpdate: (newData, oldData) =>
            updateStockProduct(newData)
              .then(() => {
                Swal.fire('Modificado!', 'El producto ha sido modificado!', 'success').then(() => {
                  handleClose();
                  router.reload();
                });
              })
              .catch((e) => {
                Swal.fire('Error!', 'Hubo un error al modificar el producto!', 'error');
              }),
        }}
      />
    );
  };

  return (
    <Fragment>
      <Dialog maxWidth={'xl'} open={isOpen} onClose={handleCancel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edicion Múltiple ✍</DialogTitle>
        <DialogContent>{materialTable()}</DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <CustomButtonComponent color="primary" style={{ width: '100%' }} onClick={handleCancel}>
            Cerrar
          </CustomButtonComponent>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
