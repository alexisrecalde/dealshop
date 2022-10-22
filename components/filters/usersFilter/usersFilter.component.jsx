import { useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import 'react-day-picker/lib/style.css';

import CustomButtonComponent from '../../customButton/customButton.component';

import {
  Container,
  Header,
  SubContainer,
  FiltersContainer,
  FilterHeader,
  SelectOption,
  ButtonContainer,
  RemoveFilters,
} from './usersFilter.styles';
import { InputTextOutlined, InputContainer } from '../../input/input.styles';

const UsersFilterComponent = () => {
  const router = useRouter();
  const query = router.query;

  const { firstName, lastName, email, userType } = query;

  const [getValue, setValue] = useState({
    firstName: '',
    lastName: '',
    email: '',
    statusId: '',
    userType: 0,
  });

  const onClickParams = () => {
    const filters = { ...getValue };
    const queryParams = { ...query };

    for (const key in filters) {
      if (filters[key] != 0 && filters[key] != '') {
        queryParams[key] = filters[key];
      } else {
        delete queryParams[key];
      }
    }

    router
      .push({
        query: queryParams,
      })
      .then(() => window.scrollTo(0, 0));
  };

  const onValueChange = (e) => {
    setValue({ ...getValue, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Header>Filtrar usuarios por:</Header>
      <SubContainer>
        <FiltersContainer>
          <FormControl>
            <FilterHeader>Nombre</FilterHeader>
            <InputTextOutlined
              id="firstName"
              name="firstName"
              variant="outlined"
              defaultValue={getValue.firstName}
              onChange={onValueChange}
            />
          </FormControl>
          <FormControl>
            <FilterHeader>Apellido</FilterHeader>
            <InputTextOutlined
              id="lastName"
              name="lastName"
              variant="outlined"
              defaultValue={getValue.lastName}
              onChange={onValueChange}
            />
          </FormControl>
          <FormControl>
            <FilterHeader>Mail</FilterHeader>
            <InputTextOutlined
              id="email"
              name="email"
              variant="outlined"
              defaultValue={getValue.email}
              onChange={onValueChange}
            />
          </FormControl>
          <InputContainer>
            <FilterHeader>Tipo de Usuario</FilterHeader>
            <SelectOption
              id="userType"
              name="userType"
              onChange={onValueChange}
              value={getValue.userType == 0 && userType ? userType : getValue.userType}
            >
              <MenuItem value={0}>Todos</MenuItem>
              <MenuItem value={2}>Admin</MenuItem>
              <MenuItem value={3}>Vendedor</MenuItem>
              <MenuItem value={4}>Depósito</MenuItem>
              <MenuItem value={5}>Repartidor</MenuItem>
            </SelectOption>
          </InputContainer>
        </FiltersContainer>
        <ButtonContainer>
          <CustomButtonComponent color="secondary" onClick={onClickParams}>
            Filtrar
          </CustomButtonComponent>
          <RemoveFilters href="/admin/habilitarUsuarios">Limpiar filtros</RemoveFilters>
        </ButtonContainer>
      </SubContainer>
    </Container>
  );
};

export default UsersFilterComponent;
