import { Divider } from "primereact/divider";
import { useRouter } from "next/router";
import { Footer } from "./footer.styles";
import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";

const FooterComponent = () => {
  const router = useRouter();

  const toPreguntasFrecuentes = () => {
    router.push("/preguntas-frecuentes").then(() => window.scrollTo(0, 0));
  };

  const toQuienesSomos = () => {
    router.push("/nosotros").then(() => window.scrollTo(0, 0));
  };

  const toMediosDePago = () => {
    router.push("/medios-de-pago").then(() => window.scrollTo(0, 0));
  };

  const toOnboarding = () => {
    router.push("/onboarding").then(() => window.scrollTo(0, 0));
  };

  return (
    <div
      className={`${
        router.pathname == "/carrito" || router.pathname == "/admin"
          ? "container-img-footer-adm"
          : null
      } container-img-footer`}
    >
      <img
        // src="img/Deco.png"
        src="https://i.ibb.co/4MM5Fbg/Deco.png"
        alt=""
      />
      <Footer>
        <div className="footer-container">
          <div className="container-section-footer">
            <div className="container-each">
              <h5>Acerca de nosotros</h5>
              <span onClick={toQuienesSomos} style={{ cursor: "pointer" }}>
                Quienes somos
              </span>
              <span
                onClick={toPreguntasFrecuentes}
                style={{ cursor: "pointer" }}
              >
                Preguntas frecuentes
              </span>
            </div>
            <div className="container-each">
              <h5>Medios de pago</h5>
              <span onClick={toMediosDePago} style={{ cursor: "pointer" }}>
                Ver medios de pago
              </span>
            </div>
          </div>
          <div className="container-section-footer">
            <h5>Quiero ser vendedor</h5>
            <span onClick={toOnboarding} style={{ cursor: "pointer" }}>
              Ver cómo ser vendedor
            </span>
          </div>
          <div className="container-section-footer">
            <h5>Contacto</h5>
            <span>Teléfono: 011 2721-5538</span>
            <span>E-mail: soporte@dealshop.com</span>
          </div>
        </div>
        <div className="copyright-footer">
          <Divider />
          <div className="container-copy-social">
            <div className="copyright-title">
              © 2022 todos los derechos reservados -DealShop
            </div>
            <div className="social-media-con" t>
              <a
                href="https://www.facebook.com/Sumate.DealSHop"
                target="_blank"
              >
                <BsFacebook />
              </a>
              <a
                href="https://www.instagram.com/sumate_dealshop/"
                target="_blank"
              >
                <BsInstagram />
              </a>
              <a
                href="https://wa.me/+5401127215538/?text=Hola"
                target="_blank"
              >
                <BsWhatsapp />
              </a>
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default FooterComponent;
