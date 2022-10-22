import { InputTextOutlined } from "../../input/input.styles";
import InputAdornment from "@mui/material/InputAdornment";
import { MdAttachMoney } from "react-icons/md";
import { AiFillShop } from "react-icons/ai";


const InputTextIcon = (props) => {
  let iconToShow;

  switch (props.icon) {
    case "money":
      iconToShow = <MdAttachMoney />
      break;
    case "shop":
      iconToShow = <AiFillShop />
      break;
    default:
      iconToShow = null
      break;
  }

  return (
    <InputTextOutlined
      {...props}
      margin="dense"
      variant="outlined"
      fullWidth
      InputProps={{
        startAdornment: iconToShow ? (
          <InputAdornment position="start">
            {iconToShow}
          </InputAdornment>
        ): null,
      }}
    />
  );
};


export default InputTextIcon;
