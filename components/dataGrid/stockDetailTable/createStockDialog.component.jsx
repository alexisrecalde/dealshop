import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
} from '@mui/material';

import { InputContainer, InputTextOutlined } from '../../input/input.styles';
import InputTextIcon from './inputTextIcon.component';
import CustomButtonComponent from '../../customButton/customButton.component';
import { ImageDropzoneContainer } from './stockDetailsTable.styles';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import Rating from '@mui/material/Rating';
import Swal from 'sweetalert2';
import { createProducts } from '../../../queries/products/products.queries';
import ProductImage from '../../imagesComponent/productImage.component';
import { deleteImage } from '../../../queries/images/images.queries';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { onInputLengthValidation } from '../../../utils/general.utils';
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

export default function CreateStockDialog({ isOpen, setOpen, dropDownLists, loadBackdrop }) {
  const { publicRuntimeConfig } = getConfig();
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [costPrice, setCostPrice] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [suggestedPrice, setSuggestedPrice] = useState(0);
  const [mainBranchQuantity, setMainBranchQuantity] = useState(0);
  const [secondaryBranchQuantity, setSecondaryBranchQuantity] = useState(0);
  const [stars, setStars] = useState(0);
  const [provider, setProvider] = useState(0);
  const [brand, setBrand] = useState(0);
  const [color, setColor] = useState(0);
  const [category, setCategory] = useState(0);
  const [subCategoriesList, setSubCategoriesList] = useState([]);
  const [subCategory, setSubCategory] = useState(0);
  const [material, setMaterial] = useState(0);
  const [shippingType, setShippingType] = useState(0);
  const [weight, setWeight] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleSetCategory(category);
  }, [category]);

  function handleSetCategory(value) {
    const categorySelected = dropDownLists.categories.find((category) => category.id === value);

    if (!categorySelected) return;
    setSubCategoriesList(categorySelected.subcategories);
  }

  function mapPhotosToArray(photos) {
    let mapArray = photos.map((photo) => {
      return { image: photo.image };
    });
    return mapArray;
  }

  const validateFields = () => {
    let isValid =
      name != '' &&
      description != '' &&
      provider != 0 &&
      brand != 0 &&
      color != 0 &&
      category != 0 &&
      material != 0 &&
      shippingType != '' &&
      weight != 0 &&
      costPrice != 0 &&
      sellingPrice != 0 &&
      suggestedPrice != 0 &&
      mainBranchQuantity > -1 &&
      secondaryBranchQuantity > -1;

    return isValid;
  };

  const getUploadParams = async ({ file, meta }) => {
    const header = {
      'x-authorization': 'b4b6357e-f5e4-45ec-807b-cf722a710925',
      'Access-Control-Allow-Origin': '*',
    };
    const body = new FormData();
    let blobItem = await fetch(meta.previewUrl).then((r) => r.blob());
    let imageName = uuidv4();

    /* 
      Acá el Id no existe al momento de crearlo, se le va a dar la posibilidad al usuario de
      por lo que se define el path "firstCreationWithoutId" para la primer creación y el UUID para el nombre
      de la imagen.
    */
    body.append('path', 'firstCreationWithoutId');
    body.append('images', blobItem, imageName);
    const url = publicRuntimeConfig.images_backend_url;

    return { url: url, body, headers: header };
  };

  const handleChangeStatus = ({ meta, file, xhr }, status) => {
    if (status == 'uploading') {
      setIsLoading(true);
    }

    if (status == 'done') {
      let responseUpload = JSON.parse(xhr.response);
      let imagePath = responseUpload.imageUrls[0].href;
      let imageObj = { image: imagePath, isNew: true };
      setPhotos([...photos, imageObj]);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    removeAllNewImages();
    setOpen(false);
  };

  const confirmUpdate = () => {
    const allFieldsReady = validateFields();

    if (!allFieldsReady) {
      Swal.fire('Campos faltantes', 'Cargue todos los campos!', 'warning');
      return;
    }

    Swal.fire({
      title: 'Estás seguro que quieres crear este producto?',
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#e91e63',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Crear!',
      customClass: {
        container: '',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        loadBackdrop(true);
        createStockProduct()
          .then(() => {
            loadBackdrop(false);
            Swal.fire('Creado!', 'El producto ha sido creado!', 'success');
            handleClose();
            router.reload();
          })
          .catch(() => {
            Swal.fire('Error!', 'Hubo un error al crear el producto!', 'error');
          });
      }
    });
  };

  const createStockProduct = async () => {
    const body = [
      {
        name: name,
        description: description,
        mainBranchQuantity: Number(mainBranchQuantity),
        secondaryBranchQuantity: Number(secondaryBranchQuantity),
        costPrice: Number(costPrice),
        sellingPrice: Number(sellingPrice),
        suggestedPrice: Number(suggestedPrice),
        stars: Number(stars),
        weight: Number(weight),
        category: category,
        subcategory: subCategory,
        brand: brand,
        material: material,
        shippingType: shippingType,
        provider: provider,
        color: color,
        photos: mapPhotosToArray(photos),
        // tipo de transporte
      },
    ];
    const result = createProducts(body);
    return result;
  };

  const onClickRemove = async (e) => {
    let srcImage = e.target.closest('.wrapperImage').querySelector('img').src;
    let auxImages = [];
    let splitedSource = srcImage.split('/images/');
    let path = splitedSource[1];

    auxImages = photos.filter((photo) => {
      return !photo.image.includes(path);
    });
    setPhotos(auxImages);
    setImagesToDelete([...imagesToDelete, srcImage]);
  };

  const getImagesHtml = () => {
    if (photos.length === 0) return null;

    const imagenes = photos.map((photo) => {
      let pathImage = photo.image;
      if (pathImage?.startsWith('/')) {
        pathImage = `${publicRuntimeConfig.images_backend_url}${pathImage}`;
      }

      return <ProductImage path={pathImage} isNew={photo.isNew} onClickRemoveImage={onClickRemove}></ProductImage>;
    });
    return imagenes;
  };

  const removeAllNewImages = () => {
    /* 
    Al momento de cancelar o cerrar accidentalmente el modal las imagenes cargadas 
    se van a eliminar del server de fotos 
    */
    let imagesToDeleteAfterCancel = photos.filter((photo) => photo.isNew);
    imagesToDeleteAfterCancel.forEach((photo) => {
      const url = `${publicRuntimeConfig.images_backend_url}${photo.image}`;
      deleteImage(url);
    });
  };

  return (
    <div>
      <Dialog maxWidth={'md'} open={isOpen} onClose={handleCancel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Crear nuevo Item 🛒</DialogTitle>
        <DialogContent>
          <ImageDropzoneContainer className="container">
            <Dropzone
              getUploadParams={getUploadParams}
              onChangeStatus={handleChangeStatus}
              inputContent="Arrastre las imagenes aquí"
              inputWithFilesContent="Agregar más imágenes"
              accept="image/*"
              submitButtonContent={null}
              SubmitButtonComponent={null}
              onChange={(e) => {
                getFilesFromEvent(e).then((chosenFiles) => {
                  onFiles(chosenFiles);
                });
              }}
            />
          </ImageDropzoneContainer>
          {getImagesHtml()}

          <DialogContent style={{ marginTop: '30px', padding: '8px 0px' }}>
            <Rating
              name="starsRating"
              value={stars}
              onChange={(e) => setStars(parseInt(e.target.value))}
              style={{
                marginTop: '10px',
              }}
            />
            <h3 style={{ marginBottom: '0px', color: 'rgba(0, 0, 0, 0.54)' }}>Titulo</h3>
            <InputTextOutlined
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <h3 style={{ marginBottom: '0px', color: 'rgba(0, 0, 0, 0.54)' }}>Descripción</h3>
            <InputTextOutlined
              id="description"
              name="description"
              multiline
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} lg={4}>
                <h3 style={{ marginBottom: '0px', color: 'rgba(0, 0, 0, 0.54)' }}>Proveedor</h3>
                <InputContainer variant="outlined" margin="dense" fullWidth>
                  <Select value={provider} onChange={(e) => setProvider(e.target.value)}>
                    {dropDownLists.providers.map((item) => (
                      <MenuItem value={item.id} key={item.id + item.description}>
                        {item.description}
                      </MenuItem>
                    ))}
                  </Select>
                </InputContainer>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <h3 style={{ marginBottom: '0px', color: 'rgba(0, 0, 0, 0.54)' }}>Marca</h3>
                <InputContainer variant="outlined" margin="dense" fullWidth>
                  <Select value={brand} onChange={(e) => setBrand(e.target.value)}>
                    {dropDownLists.brands.map((item) => (
                      <MenuItem value={item.id} key={item.id + item.description}>
                        {item.description}
                      </MenuItem>
                    ))}
                  </Select>
                </InputContainer>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <h3 style={{ marginBottom: '0px', color: 'rgba(0, 0, 0, 0.54)' }}>Categoría</h3>
                <InputContainer variant="outlined" margin="dense" fullWidth>
                  <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {dropDownLists.categories.map((item) => (
                      <MenuItem value={item.id} key={item.id + item.description}>
                        {item.description}
                      </MenuItem>
                    ))}
                  </Select>
                </InputContainer>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <h3 style={{ marginBottom: '0px', color: 'rgba(0, 0, 0, 0.54)' }}>SubCategoría</h3>
                <InputContainer variant="outlined" margin="dense" fullWidth>
                  <Select
                    value={subCategory}
                    disabled={category === 0}
                    onChange={(e) => setSubCategory(e.target.value)}
                  >
                    {subCategoriesList.map((item) => (
                      <MenuItem value={item.id} key={item.id + item.description}>
                        {item.description}
                      </MenuItem>
                    ))}
                  </Select>
                </InputContainer>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <h3 style={{ marginBottom: '0px', color: 'rgba(0, 0, 0, 0.54)' }}>Color</h3>
                <InputContainer variant="outlined" margin="dense" fullWidth>
                  <Select value={color} onChange={(e) => setColor(e.target.value)}>
                    {dropDownLists.colors.map((item) => (
                      <MenuItem value={item.id} key={item.id + item.description}>
                        {item.description}
                      </MenuItem>
                    ))}
                  </Select>
                </InputContainer>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <h3 style={{ marginBottom: '0px', color: 'rgba(0, 0, 0, 0.54)' }}>Material</h3>
                <InputContainer variant="outlined" margin="dense" fullWidth>
                  <Select value={material} onChange={(e) => setMaterial(e.target.value)}>
                    {dropDownLists.materials.map((item) => (
                      <MenuItem value={item.id} key={item.id + item.description}>
                        {item.description}
                      </MenuItem>
                    ))}
                  </Select>
                </InputContainer>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <h3 style={{ marginBottom: '0px', color: 'rgba(0, 0, 0, 0.54)' }}>Tipo Transporte</h3>
                <InputContainer variant="outlined" margin="dense" fullWidth>
                  <Select value={shippingType} onChange={(e) => setShippingType(e.target.value)}>
                    {dropDownLists.shippingTypes.map((item) => (
                      <MenuItem value={item.id} key={item.id + item.description}>
                        {item.description}
                      </MenuItem>
                    ))}
                  </Select>
                </InputContainer>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <h3 style={{ marginBottom: '0px', color: 'rgba(0, 0, 0, 0.54)' }}>Peso</h3>
                <InputTextIcon
                  id="mainBranchQuantity"
                  name="mainBranchQuantity"
                  icon="shop"
                  type="number"
                  onChange={(e) => setWeight(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <h3 style={{ marginBottom: '0px', color: 'rgba(0, 0, 0, 0.54)' }}>Precio Compra</h3>
                <InputTextIcon
                  id="costPrice"
                  name="costPrice"
                  icon="money"
                  type="number"
                  onChange={(e) => setCostPrice(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <h3 style={{ marginBottom: '0px', color: 'rgba(0, 0, 0, 0.54)' }}>Precio Venta</h3>
                <InputTextIcon
                  id="sellingPrice"
                  name="sellingPrice"
                  icon="money"
                  type="number"
                  onChange={(e) => setSellingPrice(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <h3 style={{ marginBottom: '0px', color: 'rgba(0, 0, 0, 0.54)' }}>Precio Sugerido</h3>
                <InputTextIcon
                  id="suggestedPrice"
                  name="suggestedPrice"
                  icon="money"
                  type="number"
                  onChange={(e) => setSuggestedPrice(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <h3 style={{ marginBottom: '0px', color: 'rgba(0, 0, 0, 0.54)' }}>Stock Principal</h3>
                <InputTextIcon
                  id="mainBranchQuantity"
                  name="mainBranchQuantity"
                  icon="shop"
                  type="number"
                  onInput={(e) => onInputLengthValidation(e, 5)}
                  onChange={(e) => setMainBranchQuantity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <h3 style={{ marginBottom: '0px', color: 'rgba(0, 0, 0, 0.54)' }}>Stock Secundario</h3>
                <InputTextIcon
                  id="secondaryBranchQuantity"
                  name="secondaryBranchQuantity"
                  icon="shop"
                  type="number"
                  onInput={(e) => onInputLengthValidation(e, 5)}
                  onChange={(e) => setSecondaryBranchQuantity(e.target.value)}
                />
              </Grid>
            </Grid>
          </DialogContent>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <CustomButtonComponent
            color="secondary"
            style={{ width: '100%' }}
            onClick={confirmUpdate}
            disabled={isLoading}
          >
            Crear
          </CustomButtonComponent>
          <CustomButtonComponent color="primary" style={{ width: '100%' }} onClick={handleCancel}>
            Cancelar
          </CustomButtonComponent>
        </DialogActions>
      </Dialog>
    </div>
  );
}
