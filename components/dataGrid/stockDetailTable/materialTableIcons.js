import { forwardRef } from 'react';

import { FaPencilAlt, FaSave, FaTrashAlt } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';

import AddBox from '@mui/icons-material/AddBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Clear from '@mui/icons-material/Clear';
import FilterList from '@mui/icons-material/FilterList';
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import Remove from '@mui/icons-material/Remove';
import SaveAlt from '@mui/icons-material/SaveAlt';
import Search from '@mui/icons-material/Search';
import ViewColumn from '@mui/icons-material/ViewColumn';

const icons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => (
    <FaSave
      style={{
        fontSize: '1.5rem',
        color: '#00bcd4',
      }}
      {...props}
      ref={ref}
    />
  )),
  Clear: forwardRef((props, ref) => (
    <GiCancel
      style={{
        fontSize: '1.5rem',
        color: '#e91e63',
      }}
      {...props}
      ref={ref}
    />
  )),
  Delete: forwardRef((props, ref) => (
    <FaTrashAlt
      style={{
        fontSize: '1.5rem',
        color: '#e91e63',
      }}
      {...props}
      ref={ref}
    />
  )),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => (
    <FaPencilAlt
      style={{
        fontSize: '1.5rem',
        color: '#00bcd4',
      }}
      {...props}
      ref={ref}
    />
  )),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default icons;
