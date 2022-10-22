import { useState, useEffect, useRef, Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  Bar,
  SideMenu,
  PagesMenu,
  BrandContainer,
  LogoImage,
  BrandTitle,
  MenuItemContainer,
  MenuText,
  MenuIcon,
} from "./actionbar.styles";

import { BiWorld } from "react-icons/bi";
import { IoWallet } from "react-icons/io5";
import { RiFileList3Fill, RiShareFill } from "react-icons/ri";
import { SiAzureartifacts } from "react-icons/si";
import { FaHome, FaBoxOpen, FaBox } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { HiUserGroup } from "react-icons/hi";

import { userTypesEnum } from "../../../utils/constants.utils";
import ShareModal from "../../shareModal";

const ActionbarComponent = ({
  userType,
  isSuperSeller,
  setGuideTourCompartir,
  guideTourCompartir,
  setTourAyuda,
}) => {
  const router = useRouter();
  const [mobileView, setMobileView] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showModalShare, setShowModalShare] = useState(false);
  const toastCopy = useRef(null);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, [window.innerWidth]);

  const onDrawerClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const switchActions = (param) => {
    switch (param) {
      case userTypesEnum.ADMIN:
      case userTypesEnum.SUPER_ADMIN:
        return (
          <Fragment>
            <MenuItemContainer
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push("/admin").then(setIsDrawerOpen(false));
              }}
            >
              <MenuIcon>
                <BiWorld style={{ color: "white" }} />
              </MenuIcon>
              <MenuText variant="h3">Administración</MenuText>
            </MenuItemContainer>
            <MenuItemContainer
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push("/admin/menuEnvios").then(setIsDrawerOpen(false));
              }}
            >
              <MenuIcon>
                <FaBoxOpen style={{ color: "white" }} />
              </MenuIcon>
              <MenuText variant="h3">Envíos</MenuText>
            </MenuItemContainer>
            <MenuItemContainer
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push("/stock").then(setIsDrawerOpen(false));
              }}
            >
              <MenuIcon>
                <SiAzureartifacts style={{ color: "white" }} />
              </MenuIcon>
              <MenuText variant="h3">Stock</MenuText>
            </MenuItemContainer>
            <MenuItemContainer
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push("/mibilletera").then(setIsDrawerOpen(false));
              }}
            >
              <MenuIcon>
                <IoWallet style={{ color: "white" }} />
              </MenuIcon>
              <MenuText variant="h3">Billetera</MenuText>
            </MenuItemContainer>
            {isSuperSeller && (
              <MenuItemContainer
                style={{ cursor: "pointer" }}
                onClick={() => {
                  router.push("/seguimiento").then(setIsDrawerOpen(false));
                }}
              >
                <MenuIcon>
                  <HiUserGroup style={{ color: "white" }} />
                </MenuIcon>
                <MenuText variant="h3">Seguimiento</MenuText>
              </MenuItemContainer>
            )}
            <MenuItemContainer
              style={{ cursor: "pointer", position: "relative" }}
              className="compartir-guide"
            >
              <MenuIcon>
                <RiShareFill style={{ color: "white" }} />
              </MenuIcon>
              <MenuText variant="h3" onClick={() => setShowModalShare(true)}>
                Compartir
              </MenuText>
            </MenuItemContainer>
          </Fragment>
        );
      case userTypesEnum.VENDEDOR:
        return (
          <Fragment>
            <MenuItemContainer
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push("/mibilletera").then(setIsDrawerOpen(false));
              }}
            >
              <MenuIcon>
                <IoWallet style={{ color: "white" }} />
              </MenuIcon>
              <MenuText variant="h3">Billetera</MenuText>
            </MenuItemContainer>
            <MenuItemContainer
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push("/mispedidos").then(setIsDrawerOpen(false));
              }}
            >
              <MenuIcon>
                <RiFileList3Fill style={{ color: "white" }} />
              </MenuIcon>
              <MenuText variant="h3">Mis pedidos</MenuText>
            </MenuItemContainer>
            <MenuItemContainer
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push("/seguimiento").then(setIsDrawerOpen(false));
              }}
            >
              <MenuIcon>
                <IoWallet style={{ color: "white" }} />
              </MenuIcon>
              <MenuText variant="h3">Seguimiento</MenuText>
            </MenuItemContainer>
            <MenuItemContainer
              style={{ cursor: "pointer" }}
              onClick={() => setShowModalShare(true)}
            >
              <MenuIcon>
                <RiShareFill style={{ color: "white" }} />
              </MenuIcon>
              <MenuText variant="h3">Compartir</MenuText>
            </MenuItemContainer>
          </Fragment>
        );
      case userTypesEnum.DEPOSITO:
        return (
          <MenuItemContainer
            style={{ cursor: "pointer" }}
            onClick={() => {
              router.push("/stock").then(setIsDrawerOpen(false));
            }}
          >
            <MenuIcon>
              <SiAzureartifacts style={{ color: "white" }} />
            </MenuIcon>
            <MenuText variant="h3">Stock</MenuText>
          </MenuItemContainer>
        );
      case userTypesEnum.REPARTIDOR:
        return (
          <Fragment>
            <MenuItemContainer
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push("/mibilletera").then(setIsDrawerOpen(false));
              }}
            >
              <MenuIcon>
                <IoWallet style={{ color: "white" }} />
              </MenuIcon>
              <MenuText variant="h3">Billetera</MenuText>
            </MenuItemContainer>
            <MenuItemContainer
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push("/misenvios").then(setIsDrawerOpen(false));
              }}
            >
              <MenuIcon>
                <FaBoxOpen style={{ color: "white" }} />
              </MenuIcon>
              <MenuText variant="h3">Mis Envíos</MenuText>
            </MenuItemContainer>
            <MenuItemContainer
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push("/misentregas").then(setIsDrawerOpen(false));
              }}
            >
              <MenuIcon>
                <FaBox style={{ fontSize: "1rem", color: "white" }} />
              </MenuIcon>
              <MenuText variant="h3">Mis Entregas</MenuText>
            </MenuItemContainer>
          </Fragment>
        );
    }
  };

  return (
    <Fragment>
      {mobileView ? (
        <Bar variant="dense">
          <TiThMenu
            style={{ ...Styles.icon, cursor: "pointer", color: "white" }}
            onClick={onDrawerClick}
          />
          <SideMenu
            {...{
              anchor: "left",
              open: isDrawerOpen,
              onClose: onDrawerClick,
            }}
          >
            <PagesMenu>
              <div
                style={{ ...Styles.link, ...Styles.homeContainer }}
                onClick={() => {
                  router.push("/").then(setIsDrawerOpen(false));
                }}
              >
                <MenuIcon>
                  <FaHome style={{ color: "white" }} />
                </MenuIcon>
                <MenuText variant="h3">Inicio</MenuText>
              </div>
              {switchActions(userType)}
            </PagesMenu>
            <BrandContainer>
              <LogoImage src="/img/logo_final.png" />
              <BrandTitle variant="h1">DEALSHOP</BrandTitle>
            </BrandContainer>
          </SideMenu>
        </Bar>
      ) : (
        <Bar variant="dense">
          <Link href="/" passHref style={Styles.link}>
            <MenuItemContainer style={{marginLeft: "auto" }}>
              <MenuIcon>
                <FaHome style={{ color: "white"}} />
              </MenuIcon>
              <MenuText variant="h3">Inicio</MenuText>
            </MenuItemContainer>
          </Link>
          {switchActions(userType)}
        </Bar>
      )}
      <ShareModal
        setShowModalShare={setShowModalShare}
        showModalShare={showModalShare}
        actionBar={true}
        item={null}
        toast={toastCopy}
        // show={show}
      />
    </Fragment>
  );
};

const Styles = {
  link: { marginRight: "20px" },
  icon: {
    fontSize: "1.2rem",
    marginRight: "5px",
  },
  homeContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  iconLocked: {
    fontSize: "1.2rem",
    marginRight: "5px",
    color: "rgba(211, 225, 242, 0.75)",
  },
  textLocked: { fontSize: "1.2rem", color: "rgba(211, 225, 242, 0.75)" },
};

export default ActionbarComponent;
