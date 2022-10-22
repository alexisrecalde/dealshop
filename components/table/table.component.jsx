import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { v4 as uuidv4 } from 'uuid';

import { Container } from './table.styles';

const TableComponent = ({ columns, rows, ...otherProps }) => {
  return (
    <Container {...otherProps}>
      <Table>
        <TableHead>
          <TableRow key={uuidv4()}>
            {columns.map((column) => (
              <TableCell key={uuidv4()} align="center" style={{ fontWeight: 'bold' }}>
                {column.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={uuidv4()}>
              {Object.keys(row).map((key) => (
                <TableCell key={uuidv4()} align="center">{row[key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default TableComponent;
