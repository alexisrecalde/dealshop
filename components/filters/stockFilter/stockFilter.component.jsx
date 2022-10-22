import { useState } from 'react';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import { InputLabel, Select, MenuItem } from '@mui/material';

import { Header, Container, RemoveFilters } from '../filters.styles';
import { InputContainer, InputTextOutlinedFullHeight } from '../../input/input.styles';
import CustomButtonComponent from '../../customButton/customButton.component';
import { v4 as uuidv4 } from 'uuid';

const StockFilter = ({ brandsList, providersList }) => {
    const router = useRouter();
    const { id, name, brands, provider } = router.query;
    const query = router.query;

    const [filters, setFilters] = useState({
        id: null,
        brands: null,
        provider: null,
        name: null,
    });

    const onFilterValueChange = (event) => {
        setFilters({ ...filters, [event.target.name]: event.target.value });
    };

    const onRemoveFilters = () => {
        setFilters({
            id: null,
            brands: null,
            provider: null,
            name: null,
        });
        router.push({ query: {} }).then(() => window.scrollTo(0, 0));
    };

    const onClickParams = () => {
        const currentFilters = { ...filters };
        const queryParams = { ...query };

        for (const key in currentFilters) {
            if (currentFilters[key] != null && currentFilters[key] != '') {
                queryParams[key] = currentFilters[key];
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

    return (
        <Container>
            <Header>Filtrar pedidos por:</Header>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6} lg={3}>
                    <InputTextOutlinedFullHeight
                        id="id"
                        name="id"
                        label="Id Producto"
                        type="number"
                        value={filters.id}
                        onChange={onFilterValueChange}
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <InputTextOutlinedFullHeight
                        id="productName"
                        name="name"
                        label="Nombre Producto"
                        type="search"
                        value={filters.name}
                        onChange={onFilterValueChange}
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <InputContainer variant="outlined" fullWidth>
                        <InputLabel>Marca</InputLabel>
                        <Select label="Marca" name="brands" defaultValue={brands} onChange={onFilterValueChange}>
                            <MenuItem value={null} key={uuidv4()}>
                                {'<Ninguno>'}
                            </MenuItem>
                            {brandsList.map((brand) => (
                                <MenuItem value={brand.id} key={brand.id + brand.description}>
                                    {brand.description}
                                </MenuItem>
                            ))}
                        </Select>
                    </InputContainer>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <InputContainer variant="outlined" fullWidth>
                        <InputLabel>Proveedor</InputLabel>
                        <Select label="Proveedor" name="provider" value={provider} onChange={onFilterValueChange}>
                            <MenuItem value={null} key={uuidv4()}>
                                {'<Ninguno>'}
                            </MenuItem>
                            {providersList.map((provider) => (
                                <MenuItem value={provider.id} key={provider.id + provider.description}>
                                    {provider.description}
                                </MenuItem>
                            ))}
                        </Select>
                    </InputContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                    <RemoveFilters color="secondary" style={{ width: '100%' }} onClick={onRemoveFilters}>
                        Limpiar filtros
                    </RemoveFilters>
                </Grid>
                <Grid item xs={12} md={6}>
                    <CustomButtonComponent color="secondary" style={{ width: '100%' }} onClick={onClickParams}>
                        Filtrar
                    </CustomButtonComponent>
                </Grid>
            </Grid>
        </Container>
    );
};

export default StockFilter;
