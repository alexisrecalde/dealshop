import styled from 'styled-components';

import { InputTextOutlined } from '../../input/input.styles';

const WalletFilter = ({ getName, setName }) => {
  return (
    <SearchContainer>
      <InputTextOutlined
        id="nombre"
        name="Nombre"
        label="Nombre del vendedor"
        variant="outlined"
        defaultValue={getName}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        style={{ backgroundColor: '#ffffff' }}
      />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 20px;
`;

export default WalletFilter;
