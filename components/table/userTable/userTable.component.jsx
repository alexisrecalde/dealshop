import TableComponent from "../table.component";
import { useRouter } from "next/router";
import {
  postApproveUser,
  postRejectUser,
} from "../../../queries/users/users.queries";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import ReactDOMServer from "react-dom/server";
import UserModalApprobe from "./userModalApprobe";
import { FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";

const UserTableComponent = ({ users, authToken, setOpen }) => {
  const arrayOfColumns = [
    { id: 1, name: "Nombre" },
    { id: 2, name: "Mail" },
    { id: 3, name: "Tipo" },
    { id: 4, name: "Estado" },
    { id: 5, name: "Acciones" },
  ];

  const router = useRouter();

  const approveUser = async (user) => {
    Swal.fire({
      titleText: `¿Deseas aprobar a ${user.firstName + " " + user.lastName}?`,
      icon: "warning",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: "#e91e63",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        await postApproveUser(user, authToken);
        router.reload().then(() => window.scrollTo(0, 0));
      }
    });
  };

  const rejectUser = async (user) => {
    Swal.fire({
      titleText: `¿Deseas deshabilitar a ${
        user.firstName + " " + user.lastName
      }?`,
      icon: "warning",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: "#e91e63",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        await postRejectUser(user, authToken);
        router.reload().then(() => window.scrollTo(0, 0));
      }
    });
  };

  const userModal = (user) => {
    const userModal = <UserModalApprobe user={user} />;
    Swal.fire({
      html: ReactDOMServer.renderToStaticMarkup(userModal),
      reverseButtons: true,
      confirmButtonColor: "#00bcd4",
      confirmButtonText: "Cerrar",
    });
  };

  const arrayOfItems = users.map((item) => {
    return {
      nombre: item.firstName + " " + item.lastName,
      mail: item.email,
      tipo: item.userType.description,
      estado: item.status.description,
      acciones:
        item.status.description == "Espera aprobación" ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FaEye
              style={{
                cursor: "pointer",
                fontSize: "1.5rem",
                color: "#212c59",
              }}
              onClick={() => userModal(item)}
            />
            <FaCheckCircle
              style={{
                cursor: "pointer",
                fontSize: "1.5rem",
                marginLeft: 10,
                color: "#29e364",
              }}
              onClick={() => approveUser(item)}
            />
            <FaTimesCircle
              style={{
                cursor: "pointer",
                fontSize: "1.5rem",
                marginLeft: 10,
                color: "#e3293b",
              }}
              onClick={() => rejectUser(item)}
            />
          </div>
        ) : item.status.description == "Aprobado" ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FaEye
              style={{
                cursor: "pointer",
                fontSize: "1.5rem",
                color: "#212c59",
              }}
              onClick={() => approveUser(item)}
            />
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FaEye
              style={{
                cursor: "pointer",
                fontSize: "1.5rem",
                color: "#212c59",
              }}
              onClick={() => approveUser(item)}
            />
            <FaCheckCircle
              style={{
                cursor: "pointer",
                fontSize: "1.5rem",
                marginLeft: 10,
                color: "#29e364",
              }}
              onClick={() => approveUser(item)}
            />
          </div>
        ),
    };
  });

  return <TableComponent columns={arrayOfColumns} rows={arrayOfItems} />;
};

export default UserTableComponent;
