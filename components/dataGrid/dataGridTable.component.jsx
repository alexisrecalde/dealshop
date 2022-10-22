import { Container } from "./dataGridTable.styles";
import { DataGrid, esES } from "@mui/x-data-grid";

const DataGridTable = (props) => {
  if (props.allPedidos) {
    return (
      <Container
        size={
          !props.loading && props.rows.length <= 10 ? props.rows.length : 10
        }
        density={props.density}
      >
        <DataGrid
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          paginationMode="server"
          autoHeight
          // pagination={"load"}
          // loading={props.loading}
          rowHeight={38}
          rowCount={props.totalOfOrders}
          pageSize={10}
          disableSelectionOnClick
          {...props}
          page={props.pagination}
          disableColumnMenu={true}
          sortable={false}
          disableColumnFilter={true}
          components={props.components}
        />
      </Container>
    );
  } else {
    return (
      <Container
        size={props.rows.length <= 10 ? props.rows.length : 10}
        density={props.density}
      >
        <DataGrid
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          rowHeight={38}
          pageSize={10}
          autoHeight
          rowCount={props.totalRow}
          totalRow
          disableSelectionOnClick
          loading={props.loading}
          // disableColumnFilter={true}
          // disableColumnSelector={true}
          disableColumnMenu={true}
          sortable={false}
          disableColumnFilter={true}
          {...props}
        />
      </Container>
    );
  }
};

export default DataGridTable;
