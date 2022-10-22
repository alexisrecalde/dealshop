import React from "react";
import { GoAlert } from "react-icons/go";

export default function Alerts({ text }) {
  return (
    <div className="alert-component">
      <GoAlert style={{ fontSize: "1rem", color: "#C5050B" }} />
      <p>{text}</p>
    </div>
  );
}
