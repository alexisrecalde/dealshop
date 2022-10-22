import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { getLocations } from "../../../queries/maps/maps.queries.js";

import { InputText } from "../input.styles.jsx";

const LocationInput = ({ getValue, setValue }) => {
  const [locations, setLocations] = useState([]);
  const [options, setOptions] = useState([]);
  const [getInputValue, setInputValue] = useState("");

  useEffect(() => {
    const retrieveAllLocations = async () => {
      let retrievedLocations;

      try {
        retrievedLocations = await getLocations();
      } catch (e) {
        retrievedLocations = [];
      }

      setLocations(retrievedLocations);
      setOptions(retrievedLocations);
    };

    retrieveAllLocations();
  }, []);

  const onChange = (e) => {
    const filteredLocations = locations.filter((location) =>
      location.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setOptions(filteredLocations);
  };

  const onInputSelect = (e, value) => {
    setInputValue(value);
    setValue({ ...getValue, location: value });
  };

  return (
    // <Autocomplete
    //   id="localidad"
    //   getOptionLabel={(option) => (typeof option === 'string' ? option : option.nombre)}
    //   filterOptions={(x) => x}
    //   value={getInputValue}
    //   options={options}
    //   loadingText="Buscando..."
    //   onInputChange={onInputSelect}
    //   renderInput={(params) => (
    //     <InputText
    //       {...params}
    //       onChange={onChange}
    //       id="localidad"
    //       name="localidad"
    //       fullWidth
    //       style={{ marginBottom: '0' }}
    //     />
    //   )}
    // />

    <Autocomplete
      // {...defaultProps}
      id="localidad"
      loadingText="Buscando..."
      options={options}
      filterOptions={(x) => x}
      onInputChange={onInputSelect}
      value={getInputValue}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.nombre
      }
      // disableCloseOnSelect
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={onChange}
          id="localidad"
          name="localidad"
          fullWidth
          style={{ marginBottom: "0" }}
          variant="standard"
        />
      )}
    />
  );
};

export default LocationInput;
