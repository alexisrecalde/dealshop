import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookMessengerShareButton,
} from "react-share";
import { getSellerById } from "../../queries/users/users.queries";
import { createStructuredSelector } from "reselect";
import {
  selectUserToken,
  selectUserType,
} from "../../redux/user/user.selector";
import getConfig from "next/config";

const ShareModal = ({
  setShowModalShare,
  showModalShare,
  item,
  actionBar,
  toast,
  authToken,
  userType,
}) => {
  const [linkGet, setLinkGet] = useState("");
  const [linkProduct, setLinkProduct] = useState();
  const { publicRuntimeConfig } = getConfig();


  const LINK_TO_HOME = `${publicRuntimeConfig.dealshop_url}`;

  useEffect(() => {
    const getSellerId = async () => {
      if (showModalShare) {
        if (userType === 3) {
          try {
            const response = await getSellerById(authToken);
            setLinkGet(response);
            if (!actionBar) {
              setLinkProduct(
                `${publicRuntimeConfig.dealshop_url}/productos/${item.id}?id=${response}`
              );
            }
          } catch (e) {
            console.log(e);
          }
        }
      }
    };
    getSellerId();
  }, [showModalShare]);

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      detail: "URL en portapapeles",
      life: 2000000,
    });
  };
  return (
    <>
      <Dialog
        header="Compartir"
        visible={showModalShare}
        style={{
          width: "auto",
          padding: "5px",
        }}
        onHide={() => setShowModalShare(false)}
        className="modal-share-dialog"
      >
        <Divider />
        <>
          <div className="content">
            <p>Compartir enlace en:</p>
            <ul className="icons">
              <span>
                <FacebookShareButton
                  url={
                    actionBar
                      ? LINK_TO_HOME
                      : userType === 3
                      ? linkGet && linkProduct
                      : `${publicRuntimeConfig.dealshop_url}/productos/${item.id}`
                  }
                >
                  <i className="fa fa-facebook-f"></i>
                </FacebookShareButton>
              </span>
              <span>
                <TwitterShareButton
                  url={
                    actionBar
                      ? LINK_TO_HOME
                      : userType === 3
                      ? linkGet && linkProduct
                      : `${publicRuntimeConfig.dealshop_url}/productos/${item.id}`
                  }
                >
                  <i className="fa fa-twitter"></i>
                </TwitterShareButton>
              </span>
              <span>
                <FacebookMessengerShareButton
                  url={
                    actionBar
                      ? LINK_TO_HOME
                      : userType === 3
                      ? linkGet && linkProduct
                      : `${publicRuntimeConfig.dealshop_url}/productos/${item.id}`
                  }
                >
                  <i className="fab fa-facebook-messenger"></i>
                </FacebookMessengerShareButton>
              </span>
              <span>
                <WhatsappShareButton
                  url={
                    actionBar
                      ? LINK_TO_HOME
                      : userType === 3
                      ? linkGet && linkProduct
                      : `${publicRuntimeConfig.dealshop_url}/productos/${item.id}`
                  }
                >
                  <i className="fa fa-whatsapp"></i>
                </WhatsappShareButton>
              </span>
              <span>
                <TelegramShareButton
                  url={
                    actionBar
                      ? LINK_TO_HOME
                      : userType === 3
                      ? linkGet && linkProduct
                      : `${publicRuntimeConfig.dealshop_url}/productos/${item.id}`
                  }
                >
                  <i className="fab fa-telegram-plane"></i>
                </TelegramShareButton>
              </span>
            </ul>
            <p>O copia el enlace</p>
            <div className="field">
              <i className="pi pi-copy"></i>
              <input
                type="text"
                readonly
                disabled
                value={
                  actionBar
                    ? LINK_TO_HOME
                    : userType === 3
                    ? linkGet && linkProduct
                    : `${publicRuntimeConfig.dealshop_url}/productos/${item.id}`
                }
              />
              <button
                onClick={() => {
                  showSuccess();
                  navigator.clipboard.writeText(
                    actionBar
                      ? LINK_TO_HOME
                      : userType === 3
                      ? linkGet && linkProduct
                      : `${publicRuntimeConfig.dealshop_url}/productos/${item.id}`
                  );
                
                }}
              >
                Copiar
              </button>
            </div>
          </div>
        </>
      </Dialog>
      <Toast ref={toast} />
    </>
  );
};

ShareModal.propTypes = {
  authToken: PropTypes.string,
  userType: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authToken: selectUserToken,
  userType: selectUserType,
});

export default connect(mapStateToProps)(ShareModal);
