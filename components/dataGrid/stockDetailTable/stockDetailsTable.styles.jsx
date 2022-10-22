import { styled } from '@mui/material/styles';
import DataGridTable from '../dataGridTable.component';

export const Container = styled.div`
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  background-color: #ffffff;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
`;

export const GridTable = styled(DataGridTable)`
  border: none !important;

  & .MuiDataGrid-columnsContainer {
    font-weight: 900;

    & .MuiCheckbox-colorPrimary.Mui-checked {
      color: #00bcd4;
    }

    & .MuiDataGrid-colCellTitle {
      font-weight: bold;
    }
  }

  & .MuiDataGrid-window {
    & .MuiCheckbox-colorPrimary.Mui-checked {
      color: #00bcd4;
    }
  }

  & .MuiDataGrid-footer {
    & .MuiTablePagination-actions {
      color: #e91e63;
    }

    /* & .MuiTypography-body2 {
      color: #e91e63;
    } */
  }
`;

export const StatusContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageDropzoneContainer = styled.div`
  margin-bottom: 25px;
  text-align: center;

  & .dzu-dropzone {
    overflow: scroll;
    overflow-x: hidden;
    max-height: 150px;
    padding-bottom: 10px;

    & .dzu-previewContainer {
      padding: 10px 20px;
    }

    & .dzu-inputLabelWithFiles {
      color: #00bcd4 !important;
      margin-left: 33%;
    }
  }
`;
