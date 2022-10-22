import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

export default function TableDetails({
  subcategory,
  brand,
  weight,
  material,
  color,
}) {

  const returnDescription = (description) => {
    return description ? description : "-";
  };

  return (
    <div>
      <table className="content-table">
        <tbody>
          <tr>
            <td className="active-row">Categoria</td>
            <td>{returnDescription(subcategory.description)}</td>
          </tr>
          <tr>
            <td>Marca</td>
            <td className="active-row">
              {returnDescription(brand.description)}
            </td>
          </tr>
          <tr>
            <td className="active-row">Linea</td>
            <td>{returnDescription()}</td>
          </tr>
          <tr>
            <td>Peso</td>
            <td className="active-row">{returnDescription(weight)}</td>
          </tr>
          <tr>
            <td className="active-row">Color</td>
            <td>{returnDescription(color.description)}</td>
          </tr>
          <tr>
            <td>Material</td>
            <td className="active-row">
              {returnDescription(material.description)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
