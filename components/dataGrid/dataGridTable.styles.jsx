import { styled } from '@mui/material/styles';
// import { DataGrid } from '@material-ui/data-grid';

export const Container = styled.div`
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  background-color: #ffffff;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
  min-height: ${({ size, density }) =>
    density === 'comfortable'
      ? size * 52 + 100 < 300
        ? 300
        : size * 52 + 130
      : size * 42 + 100 < 200
      ? 200
      : size * 42 + 100}px;
  width: 100%;
  position: relative;
  z-index: 1;
 
`;

