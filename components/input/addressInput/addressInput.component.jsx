import { useState, Fragment } from "react";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import { InputText } from "../input.styles.jsx";
import { ApartmentContainer, MapFrame } from "./addressInput.styles";

const AddressInput = ({ getValue, setValue, pisoDepto, setPisoDepto }) => {
  const originLat = -34.67475708063456;
  const originLon = -58.58622969909215;
  const [address, setAddress] = useState(null);
  const [getMapsURL, setMapsURL] = useState(
    `https://maps.google.com/maps?q=${originLat},${originLon}&hl=es;z=14&output=embed`
  );

  const handleChange = (inputValue) => {
    setAddress(inputValue);

    const parsedInput = inputValue.value.description.split(",");
    const parsedInputSize = parsedInput.length;

    const neighborhood =
      parsedInputSize === 3 ? "CABA" : parsedInput[parsedInputSize - 3].trim();

    const province = parsedInput[parsedInputSize - 2]
      .replace("Province", "")
      .trim();

    const parsedAddress = parsedInput[0].split(" ");

    const streetNumber = parsedAddress[parsedAddress.length - 1];

    if (!/^[0-9]+/.test(streetNumber)) {
      Swal.fire({
        title: "Error!",
        text: "Por favor ingrese una dirección válida para poder continuar.",
        icon: "error",
        confirmButtonColor: "#00bcd4",
      }).then(() => {
        return;
      });
    }

    const street = parsedInput[0]
      .substr(0, parsedInput[0].length - streetNumber.length)
      .trim();

    geocodeByPlaceId(inputValue.value.place_id).then((results) => {
      try {
        const addressInfo = results[0];
        const { geometry } = addressInfo;

        const lon = geometry.location.lng();
        const lat = geometry.location.lat();

        const origin = new google.maps.LatLng(originLat, originLon);
        const destination = new google.maps.LatLng(lat, lon);

        let distanceInKm = 0;
        let service = new google.maps.DistanceMatrixService();
        service
          .getDistanceMatrix(
            {
              origins: [origin],
              destinations: [destination],
              travelMode: "DRIVING",
              avoidHighways: true,
              avoidTolls: true,
            },
            (results) => {
              const distance = results.rows[0].elements[0].distance.value;
              distanceInKm = distance / 1000;
            }
          )
          .then(() => {
            const updatedURL = `https://maps.google.com/maps?q=${lat},${lon}&hl=es;z=14&output=embed`;
            setMapsURL(updatedURL);
            setValue({
              ...getValue,
              direccionEntrega: {
                ...getValue.direccionEntrega,
                province: province,
                location: neighborhood,
                street,
                streetNumber,
                lat,
                lon,
              },
              distanciaEnvio: distanceInKm,
            });
          });
      } catch (e) {
        Swal.fire({
          title: "Error!",
          text: "Ocurrió un problema al intentar obtener la dirección. Por favor intente más tarde.",
          icon: "error",
          confirmButtonColor: "#00bcd4",
        });
      }
    });
  };

  const onAparmentChange = (e) => {
    setValue({
      ...getValue,
      apartment: e.target.value,
    });
  };

  const onFloorChange = (e) => {
    setValue({
      ...getValue,
      floor: e.target.value,
    });
  };

  return (
    <Fragment>
      <GooglePlacesAutocomplete
        apiOptions={{ language: "es", region: "fr" }}
        autocompletionRequest={{
          componentRestrictions: {
            country: ["ar"],
          },
        }}
        minLengthAutocomplete={4}
        selectProps={{
          address,
          onChange: handleChange,
          placeholder: "Dirección de entrega *",
          noOptionsMessage: () => {
            return "Sin opciones";
          },
          styles: {
            container: (base) => ({
              ...base,
              marginTop: "10px",
              zIndex: 2,
            }),
            control: (base, state) => ({
              ...base,
              backgroundColor: "none",
              border: "none",
              borderBottom: state.isFocused
                ? "2px solid #00bcd4"
                : "1px solid rgba(0, 0, 0, 0.42)",
              borderRadius: "none",
              padding: 0,
              boxShadow: "none",
              "&:hover": {
                borderBottom: state.isFocused
                  ? "2px solid #00bcd4"
                  : "2px solid black",
              },
            }),
            input: (base) => ({
              ...base,
            }),
            placeholder: (base) => ({
              ...base,
              marginLeft: 0,
            }),
            valueContainer: (base) => ({
              ...base,
              padding: 0,
            }),
          },
        }}
      />
      <ApartmentContainer style={{ marginBottom: "20px", marginTop: "20px" }}>
        <TextField
          id="floor"
          name="floor"
          label="Piso(Opcional)"
          onChange={onFloorChange}
          inputProps={{ maxLength: 20 }}
          fullWidth
          variant="standard"
        />
        <TextField
          id="apartment"
          name="apartment"
          label="Depto(Opcional)"
          onChange={onAparmentChange}
          inputProps={{ maxLength: 20 }}
          fullWidth
          variant="standard"
        />
      </ApartmentContainer>
      <MapFrame src={getMapsURL} />
    </Fragment>
  );
};

export default AddressInput;
