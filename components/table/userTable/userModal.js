import { useState, useEffect, Fragment, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";
import Loader from "../../loader";
import {
  patchUserData,
  patchClientData,
  postRecoverPassword,
  postClientAddress,
  patchClientAddress,
} from "../../../queries/users/users.queries";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Avatar } from "primereact/avatar";
import { InputNumber } from "primereact/inputnumber";
import getAddress from "../../utils/getAddress";
import { getClientInfo } from "../../../queries/users/users.queries";
import getPurchaseInfo from "../../utils/getPurchaseApi";
import ImageUpload from "./ImageUpload";

const defaultVal = {
  street: "",
  streetHeigth: "",
  postalCode: "",
  province: "",
  address: "",
  departamentNumber: "",
};

const UserModalComponent = ({ user }) => {
  const router = useRouter();
  const [iniciales, setIniciales] = useState("");
  const [loading, setLoading] = useState(false);
  const [cantidadCompras, setCantidadCompras] = useState();
  const [addAddress, setAddAddress] = useState(false);
  const [getDefaultValue, setGetDefaultValue] = useState(false);
  const [photoImage, setPhotoImage] = useState(
    "https://thumbs.dreamstime.com/z/sonrisa-hermosa-del-hombre-58604953.jpg"
  );
  const [hasPhotoUploaded, setHasPhotoUploaded] = useState(false);
  const inputFile = useRef(null);
  const [direccionUsuario, setDireccionUsuario] = useState({
    street: "",
    streetHeigth: "",
    postalCode: "",
    province: "",
    address: "",
    departamentNumber: "",
  });
  const [direccionUsuario2, setDireccionUsuario2] = useState({
    street: "",
    streetHeigth: "",
    postalCode: "",
    province: "",
    address: "",
    departamentNumber: "",
  });
  const [addressId, setAddressId] = useState("");
  // const { getAddressById } = getAddress();
  const { getMyPurchase } = getPurchaseInfo();

  // useEffect(() => {
  //   const getProfilePhoto = () => {
  //     setPhotoImage(
  //       "https://cdn.domestika.org/c_limit,dpr_1.0,f_auto,q_auto,w_820/v1425034585/content-items/001/228/844/sesion-estudio-barcelona-10-original.jpg?1425034585"
  //     );
  //   };
  //   getProfilePhoto();
  // }, []);

  useEffect(() => {
    const getInitial = () => {
      const inicialA = user.firstName.charAt(0);
      const inicialB = user.lastName.charAt(0);
      setIniciales(`${inicialA}${inicialB}`);
    };
    getInitial();
  }, []);

  useEffect(() => {
    const getAddressUser = async () => {
      setLoading(true);
      try {
        const data = await getClientInfo(user.token);
        if (user.userType == 6) {
          const cantidadCompraApi = await getMyPurchase(user.token);
          setCantidadCompras(cantidadCompraApi.data.length);
        }

        if (data.ClientAdress.length > 0) {
          setDireccionUsuario({
            street: data.ClientAdress[0].street,
            streetHeigth: data.ClientAdress[0].streetHeigth,
            postalCode: data.ClientAdress[0].postalCode,
            province: data.ClientAdress[0].province,
            address: data.ClientAdress[0].address,
            departamentNumber: data.ClientAdress[0].departamentNumber,
          });
          if (data.ClientAdress.length > 1) {
            setDireccionUsuario2({
              street: data.ClientAdress[1].street,
              streetHeigth: data.ClientAdress[1].streetHeigth,
              postalCode: data.ClientAdress[1].postalCode,
              province: data.ClientAdress[1].province,
              address: data.ClientAdress[1].address,
              departamentNumber: data.ClientAdress[1].departamentNumber,
            });
          }
          setAddressId({ id: data.ClientAdress[0].id });
          setGetDefaultValue(false);
        } else {
          setDireccionUsuario(defaultVal);
          setGetDefaultValue(true);
        }
        setTimeout(() => {
          setLoading(false);
        }, 700);
      } catch (e) {
        setGetDefaultValue(true);
        setLoading(false);
        setDireccionUsuario(defaultVal);
      }
    };

    getAddressUser();
  }, []);

  const [getValue, setValue] = useState({
    phone: user.phone,
    email: user.email,
    dataHasBeenModified: false,
  });

  const onValueChange = (e) => {
    setValue({
      ...getValue,
      [e.target.name]: e.target.value,
      predeterminated: true,
    });
  };

  const onChangeAddress = (e) => {
    setDireccionUsuario({
      ...direccionUsuario,
      [e.target.name]: e.target.value,
    });
  };

  const onModifyDataClick = async () => {
    Swal.fire({
      titleText: "¿Desea modificar su información?",
      icon: "warning",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: "#e91e63",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        user.phone = getValue.phone;
        user.dni = getValue.dni;
        if (user.userType == 6) {
          try {
            if (!getDefaultValue) {
              await patchClientData(user, user.token);
              await patchClientAddress(direccionUsuario, addressId, user.token);
            } else {
              await patchClientData(user, user.token);
              await postClientAddress(direccionUsuario, user);
            }
            // await postClientAddress(direccionUsuario, user, user.token);
            Swal.fire(
              "Listo!",
              "Los datos se actualizaron correctamente",
              "success"
            ).then(() => {
              router.reload(window.scrollTo(0, 0));
            });
          } catch (error) {
            Swal.fire(
              "Error!",
              "Ocurrió un error al actualizar los datos. Por favor intente mas tarde.",
              "error"
            ).then(() => {
              router.reload(window.scrollTo(0, 0));
            });
          }
        } else {
          try {
            await patchUserData(user, user.token);
            Swal.fire(
              "Listo!",
              "Los datos se actualizaron correctamente",
              "success"
            ).then(() => {
              router.reload(window.scrollTo(0, 0));
            });
          } catch (error) {
            Swal.fire(
              "Error!",
              "Ocurrió un error al actualizar los datos. Por favor intente mas tarde.",
              "error"
            ).then(() => {
              router.reload().then(() => window.scrollTo(0, 0));
            });
          }
        }
      }
    });
  };

  const onClickResetPassword = async (event) => {
    event.preventDefault();
    await postRecoverPassword();

    Swal.fire({
      titleText: "Envío de correo",
      text: "Se ha enviado un correo con el pedido de reseteo de contraseña, siga los pasos allí indicados. Por favor, revise la bandeja de spam.",
      icon: "success",
      reverseButtons: true,
      confirmButtonColor: "#00bcd4",
      confirmButtonText: "Aceptar",
    }).then(() => {
      router.push("/").then(() => window.scrollTo(0, 0));
    });
  };

  const handleUploadPhoto = (photo) => {
    setPhotoImage(photo);
  };

  // const urlPhoto = `${API_BASE_URL}/onboarding/update-recruit/${recruit}&timestamp=${new Date().getTime()}`;
  const urlPhoto = `dasdasd`;

  const setAlertTimer = (time) => {
    setTimeout(() => {
      setHasPhotoUploaded(false);
    }, time);
  };

  const showUploadSuccessAlert = () => {
    setHasPhotoUploaded(true);
    setAlertTimer(3000);
  };

  return (
    <div className="container-cards-mis-datos">
      <Card className="foto-mis-datos">
        <div className="container-image-mis-datos">
          <Avatar
            className="mr-2"
            size="xlarge"
            shape="circle"
            label={iniciales.toUpperCase()}
          />
          {/* <ImageUpload
            photoImage={photoImage}
            type="file"
            url={urlPhoto}
            value={photoImage}
            onChange={(data) => {
              handleUploadPhoto(data.image);
            }}
            className="prot"
            title="Upload new photo"
            requestFieldName="image"
            referer={inputFile}
            renderImage={({ src, ...imageProps }) => {
              return (
                <Avatar
                  className="mr-2"
                  size="xlarge"
                  shape="circle"
                  {...imageProps}
                  image={src}
                />
              );
            }}
            renderPlaceholder={() => (
              <Avatar
                className="mr-2"
                size="xlarge"
                shape="circle"
                label={iniciales.toUpperCase()}
              />
            )}
            onUploadSuccess={showUploadSuccessAlert}
          >
            <i
              className="pi pi-camera"
              onClick={() => {
                inputFile.current.open();
              }}
            ></i>
          </ImageUpload> */}
        </div>
        <div className="nombre-mis-datos">
          {user.firstName.toLowerCase()} {user.lastName.toLowerCase()}
        </div>
        <div className="categoria-usuario-mis-datos">
          {user.userType == 1
            ? "Super-Adm"
            : user.userType == 2
            ? "Administrador"
            : user.userType == 3
            ? "Vendedor"
            : user.userType == 4
            ? "Deposito"
            : user.userType == 5
            ? "Repartidor"
            : ""}
        </div>
        {user.userType == 3 ? (
          <div>
            <Divider />
            <span>Ventas realizadas</span>
            <Divider />
          </div>
        ) : user.userType == 6 ? (
          <>
            {" "}
            <div>
              <Divider />
              <div style={{ width: "100%", display: "flex" }}>
                <div>Cantidad de compras</div>
                <span
                  style={{
                    marginLeft: "auto",
                    color: "#2FB670",
                    fontWeight: "bold",
                    marginRight: "10px",
                  }}
                >
                  {cantidadCompras}
                </span>
              </div>
              <Divider />
            </div>
          </>
        ) : null}
      </Card>
      <Card className="datos-mis-datos">
        <span className="title-card-mis-datos" style={{ marginBottom: "20px" }}>
          Datos de mi cuenta
        </span>
        <div className="container-info-mis-datos-inputs">
          <div>
            <div className="field">
              <label htmlFor="username1" className="block label-inputs">
                Nombre
              </label>
              <InputText
                id="name"
                aria-describedby="username1-help"
                className="block"
                disabled
                defaultValue={user.firstName.toLowerCase()}
                style={{ textTransform: "capitalize" }}
              />
            </div>
            <div className="field">
              <label htmlFor="username1" className="block label-inputs">
                DNI
              </label>
              <InputNumber
                id="dni"
                name="dni"
                value={user.dni}
                inputId="withoutgrouping"
                onChange={onValueChange}
                style={{ textTransform: "capitalize" }}
                useGrouping={false}
              />
            </div>
            <div className="field">
              <label htmlFor="username1" className="block label-inputs">
                Correo electrónico
              </label>
              <InputText
                id="email"
                name="email"
                aria-describedby="username1-help"
                className="block"
                disabled
                value={user.email.toLowerCase()}
                onChange={onValueChange}
              />
            </div>
          </div>
          <div>
            <div className="field">
              <label htmlFor="username1" className="block label-inputs">
                Apellido
              </label>
              <InputText
                id="name"
                aria-describedby="username1-help"
                className="block"
                value={user.lastName.toLowerCase()}
                style={{ textTransform: "capitalize" }}
                disabled
              />
            </div>
            <div className="field">
              <label htmlFor="username1" className="block label-inputs">
                Telefono
              </label>
              <InputNumber
                id="phone"
                name="phone"
                value={user.phone}
                inputId="withoutgrouping"
                onValueChange={onValueChange}
                style={{ textTransform: "capitalize" }}
                useGrouping={false}
                disabled={true}
              />
            </div>
          </div>
        </div>
        {user.userType == 6 ? (
          <>
            <span
              className="title-card-mis-datos"
              style={{ marginBottom: "20px" }}
            >
              Domicilio 1
            </span>
            {loading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <Loader />
              </div>
            )}
            {!loading && (
              <>
                <div className="container-info-mis-datos-inputs">
                  <div>
                    <div className="field">
                      <label htmlFor="username1" className="block label-inputs">
                        Calle
                      </label>
                      <InputText
                        id="street"
                        name="street"
                        aria-describedby="username1-help"
                        className="block"
                        value={direccionUsuario.street}
                        onChange={onChangeAddress}
                        style={{ textTransform: "capitalize" }}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="username1" className="block label-inputs">
                        Localidad
                      </label>
                      <InputText
                        id="address"
                        name="address"
                        aria-describedby="username1-help"
                        className="block"
                        value={direccionUsuario.address}
                        onChange={onChangeAddress}
                        style={{ textTransform: "capitalize" }}
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="username1" className="block label-inputs">
                        Piso/departamento (opcional)
                      </label>
                      <InputText
                        id="departamentNumber"
                        name="departamentNumber"
                        aria-describedby="username1-help"
                        className="block"
                        value={direccionUsuario.departamentNumber}
                        onChange={onChangeAddress}
                        style={{ textTransform: "capitalize" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="field">
                      <label htmlFor="username1" className="block label-inputs">
                        Número
                      </label>
                      <InputText
                        id="streetHeigth"
                        name="streetHeigth"
                        aria-describedby="username1-help"
                        className="block"
                        value={direccionUsuario.streetHeigth}
                        onChange={onChangeAddress}
                        style={{ textTransform: "capitalize" }}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="username1" className="block label-inputs">
                        Provincia
                      </label>
                      <InputText
                        id="province"
                        name="province"
                        aria-describedby="username1-help"
                        className="block"
                        value={direccionUsuario.province}
                        onChange={onChangeAddress}
                        style={{ textTransform: "capitalize" }}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="username1" className="block label-inputs">
                        Código postal
                      </label>
                      <InputText
                        id="postalCode"
                        name="postalCode"
                        aria-describedby="username1-help"
                        className="block"
                        value={direccionUsuario.postalCode}
                        onChange={onChangeAddress}
                        style={{ textTransform: "capitalize" }}
                      />
                    </div>
                  </div>
                </div>
                <Tooltip
                  target=".button-agregar-domicilio"
                  style={{ fontSize: "10px" }}
                />
                <button
                  className={`button-agregar-otro-domicilio ${
                    direccionUsuario2.street !== "" ? "color-true" : ""
                  }`}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  data-pr-tooltip="Solo podes agregar dos domicilios"
                  data-pr-position="left"
                  disabled={direccionUsuario2.street !== "" ? true : false}
                  onClick={() => {
                    setAddAddress(!addAddress);
                  }}
                >
                  Agregar otra dirección
                </button>
              </>
            )}

            {!loading && direccionUsuario2.street !== "" && (
              <>
                <span
                  className="title-card-mis-datos"
                  style={{ marginBottom: "20px" }}
                >
                  Domicilio 2
                </span>
                <div className="container-info-mis-datos-inputs">
                  <div>
                    <div className="field">
                      <label htmlFor="username1" className="block label-inputs">
                        Calle
                      </label>
                      <InputText
                        id="street"
                        name="street"
                        aria-describedby="username1-help"
                        className="block"
                        value={direccionUsuario2.street}
                        onChange={onChangeAddress}
                        style={{ textTransform: "capitalize" }}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="username1" className="block label-inputs">
                        Localidad
                      </label>
                      <InputText
                        id="address"
                        name="address"
                        aria-describedby="username1-help"
                        className="block"
                        value={direccionUsuario2.address}
                        onChange={onChangeAddress}
                        style={{ textTransform: "capitalize" }}
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="username1" className="block label-inputs">
                        Piso/departamento (opcional)
                      </label>
                      <InputText
                        id="departamentNumber"
                        name="departamentNumber"
                        aria-describedby="username1-help"
                        className="block"
                        value={direccionUsuario2.departamentNumber}
                        onChange={onChangeAddress}
                        style={{ textTransform: "capitalize" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="field">
                      <label htmlFor="username1" className="block label-inputs">
                        Número
                      </label>
                      <InputText
                        id="streetHeigth"
                        name="streetHeigth"
                        aria-describedby="username1-help"
                        className="block"
                        value={direccionUsuario2.streetHeigth}
                        onChange={onChangeAddress}
                        style={{ textTransform: "capitalize" }}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="username1" className="block label-inputs">
                        Provincia
                      </label>
                      <InputText
                        id="province"
                        name="province"
                        aria-describedby="username1-help"
                        className="block"
                        value={direccionUsuario2.province}
                        onChange={onChangeAddress}
                        style={{ textTransform: "capitalize" }}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="username1" className="block label-inputs">
                        Código postal
                      </label>
                      <InputText
                        id="postalCode"
                        name="postalCode"
                        aria-describedby="username1-help"
                        className="block"
                        value={direccionUsuario2.postalCode}
                        onChange={onChangeAddress}
                        style={{ textTransform: "capitalize" }}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            {addAddress && (
              <>
                <Divider />
                <span
                  className="title-card-mis-datos"
                  style={{ marginBottom: "20px" }}
                >
                  Domicilio 2
                </span>
                <div className="container-info-mis-datos-inputs">
                  <div>
                    <div className="field">
                      <label htmlFor="username1" className="block label-inputs">
                        Calle
                      </label>
                      <InputText
                        id="street"
                        name="street"
                        aria-describedby="username1-help"
                        className="block"
                        value={direccionUsuario2.street}
                        onChange={onChangeAddress}
                        style={{ textTransform: "capitalize" }}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="username1" className="block label-inputs">
                        Localidad
                      </label>
                      <InputText
                        id="address"
                        name="address"
                        aria-describedby="username1-help"
                        className="block"
                        value={direccionUsuario2.address}
                        onChange={onChangeAddress}
                        style={{ textTransform: "capitalize" }}
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="username1" className="block label-inputs">
                        Piso/departamento (opcional)
                      </label>
                      <InputText
                        id="departamentNumber"
                        name="departamentNumber"
                        aria-describedby="username1-help"
                        className="block"
                        value={direccionUsuario2.departamentNumber}
                        onChange={onChangeAddress}
                        style={{ textTransform: "capitalize" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="field">
                      <label htmlFor="username1" className="block label-inputs">
                        Número
                      </label>
                      <InputText
                        id="streetHeigth"
                        name="streetHeigth"
                        aria-describedby="username1-help"
                        className="block"
                        value={direccionUsuario2.streetHeigth}
                        onChange={onChangeAddress}
                        style={{ textTransform: "capitalize" }}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="username1" className="block label-inputs">
                        Provincia
                      </label>
                      <InputText
                        id="province"
                        name="province"
                        aria-describedby="username1-help"
                        className="block"
                        value={direccionUsuario2.province}
                        onChange={onChangeAddress}
                        style={{ textTransform: "capitalize" }}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="username1" className="block label-inputs">
                        Código postal
                      </label>
                      <InputText
                        id="postalCode"
                        name="postalCode"
                        aria-describedby="username1-help"
                        className="block"
                        value={direccionUsuario2.postalCode}
                        onChange={onChangeAddress}
                        style={{ textTransform: "capitalize" }}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ) : null}

        <div style={{ display: "flex", margin: "0 auto" }}>
          <Button
            className="button-slide sign-in-button p-button-info button-cambios-mis-datos"
            style={{
              display: "flex",
              justifyContent: "center",
              width: "300px",
              borderRadius: "10px",
            }}
            onClick={() => {
              onModifyDataClick();
            }}
          >
            Guardar cambios
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UserModalComponent;
