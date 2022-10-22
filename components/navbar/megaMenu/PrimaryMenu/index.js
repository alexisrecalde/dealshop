import Link from "next/link";

const PrimaryMenu = ({ menus }) => {
  return (
    // <nav className="mainmenu__nav hidden-xs hidden-sm">
    //   <ul className="main__menu">
    //     {menus.length > 0 &&
    //       menus.map((menu) => (
    //         <li key={menu.id} className="drop">
    //           <Link href={menu.link}>{menu.text}</Link>

    //           {menu?.dropdown?.length > 0 && (
    //             <ul className="dropdown">
    //               {menu.dropdown.map((dropdownMenu) => (
    //                 <li key={dropdownMenu.id}>
    //                   <Link href={menu.link}>{dropdownMenu.text}</Link>
    //                 </li>
    //               ))}
    //             </ul>
    //           )}

    //           {/* {menu?.megaMenus?.length > 0 && (
    //             <ul className="dropdown mega_dropdown">
    //               {menu.megaMenus.map((megaMenu) => (
    //                 <li key={megaMenu.id}>
    //                   <Link href={megaMenu.link}>{megaMenu.megaMenuTitle}</Link>
    //                   {megaMenu.megamenuItems?.length > 0 && (
    //                     <ul className="mega__item">
    //                       {megaMenu.megamenuItems.map((megamenuItem) => (
    //                         <li key={megamenuItem.id}>
    //                           <Link href={megamenuItem.link}>{megamenuItem.text}</Link>
    //                         </li>
    //                       ))}
    //                     </ul>
    //                   )}
    //                 </li>
    //               ))}
    //             </ul>
    //           )} */}
    //         </li>
    //       ))}
    //   </ul>
    // </nav>
    <div>
      <nav>
        <ul
          style={{
            display: "flex",
            justifyContent: "flex-start",
            margin: "0px",
            paddingLeft: "100px",
          }}
        >
          <li style={{ position: "relative", padding: "0 40px" }} className="li-mega-menu">
            <Link href="/">
              <a href="" className="a-nav-mega-menu">Categorias</a>
            </Link>
          </li>
          <li style={{ position: "relative", padding: "0 40px" }} className="li-mega-menu">
            <Link href="/">
              <a href="" className="a-nav-mega-menu">Ofertas</a>
            </Link>
          </li>
          <li style={{ position: "relative", padding: "0 40px" }} className="li-mega-menu">
            <Link href="/">
              <a href="" className="a-nav-mega-menu">Combos</a>
            </Link>
          </li>
          <li style={{ position: "relative", padding: "0 40px" }} className="li-mega-menu">
            <Link href="/">
              <a href="" className="a-nav-mega-menu">Ayuda</a>
            </Link>
          </li>
          <li style={{ position: "relative", padding: "0 40px" }} className="li-mega-menu">
            <Link href="/">
              <a href="" className="a-nav-mega-menu">Vender!</a>
            </Link>
          </li>
          <li style={{ position: "relative", padding: "0 40px" }} className="li-mega-menu">
            <Link href="/">
              <a href="" className="a-nav-mega-menu">Contactanos</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PrimaryMenu;
