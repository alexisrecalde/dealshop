import Link from "next/link";
import PrimaryMenu from "./PrimaryMenu";
import primaryMenus from "./PrimaryMenu/menu.json";

const MegaMenu = ({ setShowProductOptions }) => {
  return (
    <div className="container-mega-menu">
      <nav>
        <ul
          style={{
            display: "flex",
            justifyContent: "flex-start",
            margin: "0px",
            paddingLeft: "100px",
          }}
        >
          <li
            style={{ position: "relative", padding: "0 40px" }}
            className="li-mega-menu"
            onMouseOver={() => {
              setShowProductOptions(false);
            }}
          >
            <Link href="/">
              <a href="" className="a-nav-mega-menu">
                Inicio
              </a>
            </Link>
          </li>
          <li
            style={{ position: "relative", padding: "0 40px" }}
            className="li-mega-menu"
            onMouseOver={() => {
              setShowProductOptions(true);
            }}
          >
            <Link href="/">
              <a href="" className="a-nav-mega-menu">
                Categorias
              </a>
            </Link>
          </li>
          <li
            style={{ position: "relative", padding: "0 40px" }}
            className="li-mega-menu"
            onMouseOver={() => {
              setShowProductOptions(false);
            }}
          >
            <Link href="/ofertas">
              <a href="" className="a-nav-mega-menu">
                Ofertas
              </a>
            </Link>
          </li>
          {/* <li
            style={{ position: "relative", padding: "0 40px" }}
            className="li-mega-menu"
            onMouseOver={() => {
              setShowProductOptions(false);
            }}
          >
            <Link href="/combos">
              <a href="" className="a-nav-mega-menu">
                Combos
              </a>
            </Link>
          </li>
          <li
            style={{ position: "relative", padding: "0 40px" }}
            className="li-mega-menu"
          >
            <Link href="/preguntas-frecuentes">
              <a href="" className="a-nav-mega-menu">
                Ayuda
              </a>
            </Link>
          </li>
          <li
            style={{ position: "relative", padding: "0 40px" }}
            className="li-mega-menu"
            onMouseOver={() => {
              setShowProductOptions(false);
            }}
          >
            <Link href="/onboarding">
              <a href="" className="a-nav-mega-menu">
                Vender!
              </a>
            </Link>
          </li>
          <li
            style={{ position: "relative", padding: "0 40px" }}
            className="li-mega-menu"
            onMouseOver={() => {
              setShowProductOptions(false);
            }}
          >
            <a
              href="https://wa.me/+5401127215538/?text=Hola"
              target="_blank"
              className="a-nav-mega-menu"
            >
              Contactanos
            </a>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default MegaMenu;
