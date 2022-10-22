import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { selectUserToken } from "../../redux/user/user.selector";
import Head from "next/head";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import MisComprasItem from "../../components/miComprasItem";
import { InputText } from "primereact/inputtext";
import getPurchaseInfo from "../../components/utils/getPurchaseApi";
import Loader from "../../components/loader";
import Spinner from "../../components/spinner/spinner.component";

const MisCompras = ({ authToken }) => {
  const [value3, setValue3] = useState("");
  const [loading, setLoading] = useState(false);
  const [arrayMisCompras, setArrayMisCompras] = useState([]);

  const { getMyPurchase } = getPurchaseInfo();

  useEffect(() => {
    setLoading(true);
    const getMisCompras = async () => {
      try {
        const response = await getMyPurchase(authToken);
        setArrayMisCompras(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (e) {
        throw e;
      }
    };

    getMisCompras();
  }, []);

  const header = () => {
    return (
      <Head>
        <title>Dealshop - Mis compras</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Mis compras" key="title" />
        <meta name="owner" content="Dealshop" />
      </Head>
    );
  };

  if (loading) {
    return (
      <div style={{ width: "100%" }}>
        {header()}
        <div
          className=""
          style={{
            margin: "20px auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {<Spinner />}
        </div>
      </div>
    );
  }

  if (!loading) {
    return (
      <>
        {header()}
        <div className="container-mis-compras">
          <h2 className="title-compras">Mis Compras</h2>
          <div className="options-mis-compras">
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                value={value3}
                onChange={(e) => setValue3(e.target.value)}
                placeholder="Search"
              />
            </span>
            <div className="cantidad-de-compras">
              {arrayMisCompras.length} compras
            </div>
          </div>
          <MisComprasItem items={arrayMisCompras}></MisComprasItem>
        </div>
      </>
    );
  }
};

MisCompras.propTypes = {
  authToken: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authToken: selectUserToken,
});

export default connect(mapStateToProps, null)(MisCompras);
