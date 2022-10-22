import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import getConfig from "next/config";
import Head from "next/head";
import { useQuery, useQueryClient } from "react-query";
import { ToastContainer } from "react-toastify";
import Backdrop from "@mui/material/Backdrop";

import Spinner from "../../components/spinner/spinner.component";
import StockFilter from "../../components/filters/stockFilter/stockFilter.component";
import StockDetailTable from "../../components/dataGrid/stockDetailTable/stockDetailsTable.component";

import {
  isObjectNullOrUndefined,
  extractProperties,
} from "../../utils/uri.utils";
import { config } from "../../queries/commons.queries";
import withAuth, { roles } from "../../utils/auth.utils";

const StockPage = () => {
  const { publicRuntimeConfig } = getConfig();
  const router = useRouter();
  const { query } = router;
  const { id, name, brands, provider } = router.query;

  const [open, setOpen] = useState(false);
  const [getProducts, setProducts] = useState([]);
  const [getBrands, setBrands] = useState([]);
  const [getProviders, setProviders] = useState([]);
  const [getDropdowns, setDropdowns] = useState({
    brands: [],
    providers: [],
    materials: [],
    categories: [],
    colors: [],
    shippingTypes: [],
  });

  // const [isLoading, setIsloading] = useState(true);

  const fetchProductsList = async () => {
    let dropDowns = {};

    //Products
    // let url = `${publicRuntimeConfig.backend_url}/public/products`;
    // const finalParams = [
    //   { id },
    //   { name },
    //   { brands },
    //   { provider },
    //   { isActive: true },
    // ].filter((param) => !isObjectNullOrUndefined(param));
    // config.params = { ...extractProperties(finalParams) };
    // let productsResult;
    // try {
    //   productsResult = await axios.get(url, config);
    //   setProducts(productsResult.data.results);
    // } catch (e) {
    //   productsResult = [];
    // }

    // Brands
    let url = `${publicRuntimeConfig.backend_url}/public/brands`;
    delete config.params;
    const brandsResult = await axios.get(url, config);
    setBrands(brandsResult.data.results);
    dropDowns["brands"] = brandsResult.data.results;

    // Providers
    url = `${publicRuntimeConfig.backend_url}/public/providers`;
    delete config.params;
    const providersResult = await axios.get(url, config);
    setProviders(providersResult.data.results);
    dropDowns["providers"] = providersResult.data.results;

    // Materials
    url = `${publicRuntimeConfig.backend_url}/public/materials`;
    delete config.params;
    const materialsResult = await axios.get(url, config);
    dropDowns["materials"] = materialsResult.data.results;

    // Categories
    url = `${publicRuntimeConfig.backend_url}/public/categories`;
    delete config.params;
    const categoriesResult = await axios.get(url, config);
    dropDowns["categories"] = categoriesResult.data.results;

    // Color
    url = `${publicRuntimeConfig.backend_url}/public/colors`;
    delete config.params;
    const colorsResult = await axios.get(url, config);
    dropDowns["colors"] = colorsResult.data.results;

    dropDowns["shippingTypes"] = [
      { id: "moto", description: "Moto" },
      { id: "camioneta", description: "Camioneta" },
    ];

    setDropdowns(dropDowns);
  };

  const getAllProducts = async () => {
    const url = `${publicRuntimeConfig.backend_url}/public/products`;

    const config = {
      headers: {
        "content-type": "application/json",
        "x-client-id": "6eb59dd2-7a48-4a13-9110-b78c56a3f861",
      },
      params: {
        id,
        name,
        brands,
        provider,
        isActive: true,
      },
    };
    const { data } = await axios.get(url, config);
    return data;
  };

  const { isLoading, data, isError } = useQuery(
    ["product", query],
    getAllProducts,
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      staleTime: 9000,
    }
  );

  useEffect(() => {
    // setIsloading(true);
    fetchProductsList();
    // setIsloading(false);
  }, [id, name, brands, provider]);

  const header = () => {
    return (
      <Head>
        <title>Dealshop - Stock</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Stock de productos" key="title" />
        <meta name="owner" content="Dealshop" />
      </Head>
    );
  };

  return (
    <Fragment>
      {header()}
      <div
        style={{ padding: "20px", backgroundImage: "url('/img/Sprinkle.svg')" }}
      >
        <h2 style={{ color: "#e91e63" }}>Stock</h2>
        <StockFilter brandsList={getBrands} providersList={getProviders} />
        <div style={{ marginTop: "20px" }}>
          <StockDetailTable
            products={data}
            dropDownLists={getDropdowns}
            setOpen={setOpen}
            loading={isLoading}
            isError={isError}
          />
        </div>
      </div>
      <ToastContainer />
      <Backdrop open={open} style={{ zIndex: "10000" }}>
        <Spinner />
      </Backdrop>
    </Fragment>
  );
};

export default withAuth(StockPage, [
  roles.SUPER_ADMIN,
  roles.ADMIN,
  roles.DEPOSITO,
]);
