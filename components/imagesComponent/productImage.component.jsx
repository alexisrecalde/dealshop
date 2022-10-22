import Chip from "@mui/material/Chip";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductImage = ({ path, isNew, onClickRemoveImage }) => {
  
  const image = () => (
    <span class="wrapperImage">
      {onClickRemoveImage ?
      <IconButton
        size="small"
        aria-label="delete"
        style={{ top: "-75px", left: "22px", position: "relative" }}
        onClick={onClickRemoveImage}
      >
        <DeleteIcon />
      </IconButton> : null}
      <img src={path} id="imageProduct" style={{ height: "90px" }} />
    </span>
  );

  if (isNew) {
    return (
      <span>
        {image()}

        <Chip
          size="small"
          label="Nuevo"
          style={{ bottom: "-14px", left: "-36px", position: "relative" }}
        />
      </span>
    );
  }

  return image();
};

export default ProductImage;
