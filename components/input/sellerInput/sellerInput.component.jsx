import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { getAllSellers } from "../../../queries/users/users.queries.js";
import { selectUserToken } from "../../../redux/user/user.selector.js";

import { InputText } from "../input.styles.jsx";

const SellerInput = ({
  fieldName,
  getValue,
  setValue,
  data = [],
  authToken,
}) => {
  const [sellers, setSellers] = useState([]);
  const [options, setOptions] = useState([]);
  const [getInputValue, setInputValue] = useState("");

  useEffect(() => {
    const retrieveAllSellers = async () => {
      const retrievedSellers = await getAllSellers(authToken);

      setSellers(retrievedSellers);
      setOptions(retrievedSellers);
    };

    if (data.length != 0) {
      setSellers(data);
      setOptions(data);
    } else {
      retrieveAllSellers();
    }
  }, []);

  const onChange = (e) => {
    const filteredSellers = sellers.filter(
      (seller) =>
        seller.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        seller.lastName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setOptions(filteredSellers);
  };

  const onInputSelect = (e, value) => {
    setInputValue(value);

    let name = fieldName;

    if (name === undefined) {
      name = "sellerId";
    }

    const filteredSeller = sellers.filter(
      (seller) => `${seller.firstName} ${seller.lastName}` == value
    );
    if (filteredSeller.length > 0) {
      setValue({ ...getValue, [name]: filteredSeller[0].id });
    }
  };

  return (
    // <Autocomplete
    //     id="seller"
    //     getOptionLabel={(option) =>
    //         typeof option === 'string' ? option : `${option.firstName} ${option.lastName}`
    //     }
    //     filterOptions={(x) => x}
    //     value={getInputValue}
    //     options={options}
    //     loadingText="Buscando..."
    //     onInputChange={onInputSelect}
    //     renderInput={(params) => (
    //         <InputText
    //             {...params}
    //             onChange={onChange}
    //             id="seller"
    //             name="seller"
    //             fullWidth
    //             style={{ marginBottom: '0' }}
    //         />
    //     )}
    // />

    <Autocomplete
      filterOptions={(x) => x}
      value={getInputValue}
      options={options}
      loadingText="Buscando..."
      onInputChange={onInputSelect}
      getOptionLabel={(option) =>
        typeof option === "string"
          ? option
          : `${option.firstName} ${option.lastName}`
      }
      // disableCloseOnSelect
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={onChange}
          id="seller"
          name="seller"
          fullWidth
          style={{ marginBottom: "0" }}
          variant="standard"

          //   onChange={onChange}
          //   id="cadet"
          //   name="cadet"
          //   fullWidth
          //   style={{ marginBottom: "0" }}
          //   {...params}
          //   label="Cadete"
          //   variant="standard"
        />
      )}
    />
  );
};

SellerInput.propTypes = {
  authToken: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authToken: selectUserToken,
});

export default connect(mapStateToProps, null)(SellerInput);
