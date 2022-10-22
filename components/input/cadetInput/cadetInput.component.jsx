import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from '@mui/material/TextField';
import { selectUserToken } from "../../../redux/user/user.selector.js";

import { InputText } from "../input.styles.jsx";
import { getAllCadets } from "../../../queries/users/users.queries.js";

const CadetInput = ({ getValue, setValue, data, authToken }) => {
  const [cadets, setCadets] = useState([]);
  const [options, setOptions] = useState([]);
  const [getInputValue, setInputValue] = useState("");

  useEffect(() => {
    const retrieveAllCadets = async () => {
      const retrievedCadets = await getAllCadets(authToken);

      setCadets(retrievedCadets);
      setOptions(retrievedCadets);
    };

    if (data) {
      setCadets(data);
      setOptions(data);
    } else {
      retrieveAllCadets();
    }
  }, []);

  const onChange = (e) => {
    const filteredCadets = cadets.filter(
      (cadet) =>
        cadet.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        cadet.lastName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setOptions(filteredCadets);
  };

  const onInputSelect = (e, value) => {
    setInputValue(value);

    const filteredCadet = cadets.filter(
      (cadet) => `${cadet.firstName} ${cadet.lastName}` == value
    );
    if (filteredCadet.length > 0) {
      setValue({ ...getValue, cadetId: filteredCadet[0].id });
    }
  };

  return (
    <Autocomplete
      // {...defaultProps}
      id="cadet"
      options={options}
      onInputChange={onInputSelect}
      getOptionLabel={(option) =>
        typeof option === "string"
          ? option
          : `${option.firstName} ${option.lastName}`
      }
      // disableCloseOnSelect
      renderInput={(params) => (
        <TextField
          onChange={onChange}
          id="cadet"
          name="cadet"
          fullWidth
          style={{ marginBottom: "0" }}
          {...params}
          label="Cadete"
          variant="standard"
        />
      )}
    />
  );
};

CadetInput.propTypes = {
  authToken: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authToken: selectUserToken,
});

export default connect(mapStateToProps, null)(CadetInput);
