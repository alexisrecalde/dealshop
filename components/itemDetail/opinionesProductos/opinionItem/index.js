import React from "react";
import { Rating } from "primereact/rating";

export default function OpinionItem({ comment }) {
  return (
    <div className="container-opinion">
      <div className="stars-product-item-search stars-opinio-item">
        <Rating value={comment.stars} readOnly cancel={false}></Rating>
      </div>
      <h2 className="title-comment-opinion">{comment.titleComment}</h2>
      <span className="title-name-opinion">{comment.name}</span>
      <p className="title-description-opinion">{comment.description}</p>
    </div>
  );
}
