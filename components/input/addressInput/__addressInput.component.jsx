import { useState, Fragment } from 'react';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';

import { InputText } from '../input.styles.jsx';
import { ApartmentContainer, MapFrame } from './addressInput.styles';

const AddressInput = ({ getValue, setValue }) => {
  const [getAddresses, setAddresses] = useState([]);
  const [getInputValue, setInputValue] = useState('');
  const [getMapsURL, setMapsURL] = useState(
    `https://maps.google.com/maps?q=-34.67475708063456,-58.58622969909215&hl=es;z=14&output=embed`
  );

  const onChange = async (e) => {
    const address = e.target.value;
    if (address != '') {
      const url = `https://apis.datos.gob.ar/georef/api/direcciones?direccion=${address}`;
      const config = {
        params: {
          aplanar: true,
          // provincia: '02,06',
          campos:
            'altura.valor,calle.nombre,departamento.nombre,nomenclatura,provincia.nombre,ubicacion.lat,ubicacion.lon',
          max: 150,
        },
      };
      const { data } = await axios.get(url, config);

      setAddresses(data.direcciones);
    }
  };

  const onInputSelect = (e, value) => {
    const data = getAddresses.filter((address) => address.nomenclatura == value);
    setInputValue(value);

    if (data.length == 1 || data.length == 2) {
      const {
        provincia_nombre,
        departamento_nombre,
        calle_nombre,
        altura_valor,
        ubicacion_lat,
        ubicacion_lon,
      } = data[0];
      const updatedURL = `https://maps.google.com/maps?q=${ubicacion_lat},${ubicacion_lon}&hl=es;z=14&output=embed`;
      setMapsURL(updatedURL);

      setValue({
        ...getValue,
        direccionEntrega: {
          ...getValue.direccionEntrega,
          province: provincia_nombre,
          location: departamento_nombre,
          street: calle_nombre,
          streetNumber: altura_valor,
          lat: ubicacion_lat,
          lon: ubicacion_lon,
        },
      });
    }
  };

  const onAparmentChange = (e) => {
    setValue({
      ...getValue,
      direccionEntrega: {
        ...getValue.direccionEntrega,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <Fragment>
      <Autocomplete
        id="direccion-entrega"
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.nomenclatura)}
        filterOptions={(x) => x}
        value={getInputValue}
        options={getAddresses}
        loadingText="Buscando..."
        onInputChange={onInputSelect}
        renderInput={(params) => (
          <InputText
            {...params}
            onChange={onChange}
            id="direccion"
            name="direccionEntrega"
            label="Dirección de entrega"
            required
            fullWidth
          />
        )}
      />
      <ApartmentContainer>
        <InputText
          id="floor"
          name="floor"
          label="Piso(Opcional)"
          onChange={onAparmentChange}
          inputProps={{ maxLength: 20 }}
          fullWidth
        />
        <InputText
          id="apartment"
          name="apartment"
          label="Depto(Opcional)"
          onChange={onAparmentChange}
          inputProps={{ maxLength: 20 }}
          fullWidth
        />
      </ApartmentContainer>
      <MapFrame src={getMapsURL} />
    </Fragment>
  );
};

export default AddressInput;
