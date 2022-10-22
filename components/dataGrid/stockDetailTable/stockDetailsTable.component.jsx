import { useState, Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import getConfig from "next/config";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditStockDialog from "./editStockDialog.component";
import CreateStockDialog from "./createStockDialog.component";
import MassiveEditStockDialog from "./massiveEditStockDialog.component";
import CustomButtonComponent from "../../customButton/customButton.component";
import { CurrencyText } from "../../../utils/number.utils";
import Swal from "sweetalert2";
import {
  softDeleteProduct,
  softDeleteProducts,
  increasePriceByPercentage,
} from "../../../queries/products/products.queries";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { StatusContainer } from "./stockDetailsTable.styles";
import DataGridTable from "../dataGridTable.component";
import Rating from "@mui/material/Rating";
import { useMutationActualizarProductos } from "../../hooks/orders";

const StockDetailsTable = ({
  products,
  dropDownLists,
  setOpen,
  loading,
  isError,
}) => {
  const router = useRouter();
  const { page } = router.query;
  const { publicRuntimeConfig } = getConfig();

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openMassiveEditDialog, setOpenMassiveEditDialog] = useState(false);
  const [rowSelected, setRowSelected] = useState({});
  const [selectionModel, setSelectionModel] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [totalOf, setTotalOf] = useState();
  const [errorLoad, setErrorLoad] = useState();

  useEffect(() => {
    if (loading) {
      // setRows([]);
    } else if (isError) {
      setErrorLoad(true);
    } else {
      setRows(products.results);
      setTotalOf(products.results.length);
    }
  }, [loading, products]);

  const {
    isError: errorActualizar,
    isSuccess: successActualizar,
    isLoading: loadingActualizar,
    mutate: mutationActualizarStock,
  } = useMutationActualizarProductos();

  const confirmDelete = (product) => {
    Swal.fire({
      title: `Estás seguro que quieres eliminar "${product.name}" ?`,
      text: "Esta acción no puede revertirse.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e91e63",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Borrar",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          setOpen(true);
          softDeleteProduct(product.id);
          setOpen(false);
          Swal.fire(
            "Borrado!",
            "El producto ha sido eliminado!",
            "success"
          ).then((result) => {
            router.reload();
          });
        } catch (e) {
          Swal.fire(
            "Error!",
            "Hubo un error al intentar eliminar el producto!",
            "error"
          );
        }
      }
    });
  };

  const confirmDeleteBatch = (idsArray) => {
    let productsList = idsArray.join(", ");

    Swal.fire({
      title: `Estás seguro que quieres eliminar los productos con IDs: "${productsList}" ?`,
      text: "Esta acción no puede revertirse.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e91e63",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Borrar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await softDeleteProducts(idsArray);
          Swal.fire(
            "Borrado!",
            "Los productos han sido eliminados!",
            "success"
          );
          refreshData();
        } catch (e) {
          Swal.fire(
            "Error!",
            "Hubo un error al intentar eliminar los productos. Intente nuevamente.",
            "error"
          );
        }
      }
    });
  };

  const arrayOfColumns = [
    {
      field: "",
      headerName: "Acciones",
      headerAlign: "center",
      width: 150,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const { itemData } = params.row;

        const onClickEdit = () => {
          setRowSelected(itemData);
          setOpenEditDialog(true);
          return;
        };

        const onClickDelete = () => {
          confirmDelete(itemData);
        };

        return (
          <Fragment>
            <Tooltip title="Editar" placement="top">
              <IconButton onClick={onClickEdit} size="large">
                <FaPencilAlt
                  style={{
                    fontSize: "1.5rem",
                    color: "#00bcd4",
                    marginRight: "10px",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Borrar" placement="top">
              <IconButton onClick={onClickDelete} size="large">
                <FaTrashAlt
                  style={{
                    fontSize: "1.5rem",
                    color: "#e91e63",
                  }}
                />
              </IconButton>
            </Tooltip>
          </Fragment>
        );
      },
    },
    {
      field: "photo",
      headerName: "Foto",
      width: 75,
      align: "center",
      headerAlign: "center",
      renderCell: ({ value }) => {
        return (
          <StatusContainer>
            <img
              src={value}
              alt="Imagen del producto"
              style={{ maxHeight: "50px" }}
            />
          </StatusContainer>
        );
      },
    },
    {
      field: "id",
      headerName: "Id",
      width: 75,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Producto",
      width: 300,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "mainBranchQuantity",
      headerName: "Stock Principal",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "secondaryBranchQuantity",
      headerName: "Stock Secundario",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "costPrice",
      headerName: "Precio de compra",
      headerAlign: "center",
      width: 150,
      renderCell: ({ value }) => {
        return (
          <StatusContainer>
            <CurrencyText value={value} />{" "}
          </StatusContainer>
        );
      },
    },
    {
      field: "sellingPrice",
      headerName: "Precio de venta",
      headerAlign: "center",
      width: 150,
      renderCell: ({ value }) => {
        return (
          <StatusContainer>
            <CurrencyText value={value} />
          </StatusContainer>
        );
      },
    },
    {
      field: "suggestedPrice",
      headerName: "Precio sugerido",
      headerAlign: "center",
      width: 150,
      renderCell: ({ value }) => {
        return (
          <StatusContainer>
            <CurrencyText
              value={value}
              display="flex"
              justifyContent="center"
            />
          </StatusContainer>
        );
      },
    },
    {
      field: "description",
      hide: true,
      align: "center",
      headerAlign: "center",
    },
    { field: "brand", hide: true },
    { field: "provider", hide: true },
    { field: "color", hide: true },
    { field: "category", hide: true },
    { field: "subcategory", hide: true },
    { field: "material", hide: true },
    { field: "weight", hide: true },
    { field: "photos", hide: true },
    {
      field: "stars",
      headerName: "Calificación",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return <Rating name="starsRating" readOnly value={params.value} />;
      },
    },
  ];

  // const onSelectionChangeHandle = (selectedProductsIds) => {
  //   setSelectionModel(selectedProductsIds.rowIds);
  // };

  const deleteAllSelectedProducts = () => {
    debugger;
    confirmDeleteBatch(selectionModel);
  };

  const confirmPricePercentageIncrement = () => {
    Swal.fire({
      title: "Aumento Porcentual %",
      text: "Ingrese el porcentaje de aumento para los precios de todos los productos seleccionados.",
      input: "number",
      showCancelButton: true,
      confirmButtonText: "Aplicar",
      confirmButtonColor: "#00bcd4",
      showLoaderOnConfirm: true,
      inputAttributes: {
        min: 0.1,
        max: 1000,
        step: 0.1,
      },
      inputValidator: (result) => {
        return (
          (!result || result <= 0) && "El porcentaje debe ser mayor a cero!"
        );
      },
      preConfirm: (percentage) => {
        return increasePriceByPercentage(selectionModel, Number(percentage))
          .then((response) => {
            if (response.status !== 200) {
              throw new Error(response.statusText);
            }
            return response.data;
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Actualizado!", `${result.value.message}`, "success").then(
          () => {
            router.reload();
          }
        );
      }
    });
  };

  const arrayOfItems = rows.map((item) => {
    return {
      photo:
        item.photos.length < 1
          ? "/img/no-image.png"
          : `${publicRuntimeConfig.images_backend_url}${item.photos[0].image}`,
      id: item.id,
      name: item.name,
      mainBranchQuantity: item.mainBranchQuantity,
      secondaryBranchQuantity: item.secondaryBranchQuantity,
      costPrice: item.costPrice,
      sellingPrice: item.sellingPrice,
      suggestedPrice: item.suggestedPrice,
      description: item.description,
      brand: item.brand ? item.brand.id : "-",
      provider: item.provider.id,
      color: item.color ? item.color.id : "-",
      category: item.subcategory.categoryId,
      subcategory: item.subcategory.id,
      material: item.material.id,
      weight: item.weight,
      stars: item.stars,
      photos: item.photos,
      itemData: item,
    };
  });

  const editDialog = () => {
    if (openEditDialog) {
      return (
        <EditStockDialog
          rowInfo={rowSelected}
          isOpen={openEditDialog}
          setOpen={setOpenEditDialog}
          dropDownLists={dropDownLists}
          currentPage={currentPage}
          mutationActualizarStock={mutationActualizarStock}
          loadingActualizar={loadingActualizar}
          successActualizar={successActualizar}
          errorActualizar={errorActualizar}
        />
      );
    }
    return;
  };

  const createDialog = () => {
    if (openCreateDialog) {
      return (
        <CreateStockDialog
          isOpen={openCreateDialog}
          setOpen={setOpenCreateDialog}
          dropDownLists={dropDownLists}
          loadBackdrop={setOpen}
        />
      );
    }
    return;
  };

  const massiveEditDialog = () => {
    if (massiveEditDialog) {
      return (
        <MassiveEditStockDialog
          isOpen={openMassiveEditDialog}
          setOpen={setOpenMassiveEditDialog}
          columns={arrayOfColumns}
          rows={arrayOfItems}
          loadBackdrop={setOpen}
        />
      );
    }
    return;
  };

  return (
    <Fragment>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <CustomButtonComponent
          color="primary"
          style={{ width: "40%", marginBottom: "20px", marginRight: "10px" }}
          onClick={() => setOpenMassiveEditDialog(true)}
        >
          Edición Múltiple ✍
        </CustomButtonComponent>
        <CustomButtonComponent
          color="primary"
          style={{ width: "40%", marginBottom: "20px" }}
          onClick={() => setOpenCreateDialog(true)}
        >
          Nuevo Producto ➕
        </CustomButtonComponent>
      </div>
      <DataGridTable
        columns={arrayOfColumns}
        rows={arrayOfItems}
        // allPedidos={true}
        totalRow={totalOf}
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        loading={loading}
        // onSelectionChange={onSelectionChangeHandle}
        selectionModel={selectionModel}
        density="comfortable"
        onPageChange={(params) => {
          setCurrentPage(params);
        }}
        page={page}
      />
      {selectionModel.length > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "10px",
            position:"relative",
            zIndex: "10"
          }}
        >
          <CustomButtonComponent
            color="secondary"
            style={{ width: "30%", marginBottom: "20px", marginRight: "10px" }}
            onClick={() => deleteAllSelectedProducts()}
          >
            Eliminar Seleccionados ({selectionModel.length})
          </CustomButtonComponent>
          <CustomButtonComponent
            color="secondary"
            style={{ width: "30%", marginBottom: "20px", marginRight: "10px" }}
            onClick={() => confirmPricePercentageIncrement()}
          >
            Aumentar Precio de Seleccionados ({selectionModel.length})
          </CustomButtonComponent>
        </div>
      ) : null}

      {editDialog()}
      {createDialog()}
      {massiveEditDialog()}
    </Fragment>
  );
};

export default StockDetailsTable;
