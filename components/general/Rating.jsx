import React from "react";
import { Rating as ReactRating, StickerStar } from "@smastrom/react-rating";

const myStyles = {
  itemShapes: StickerStar,
  activeFillColor: "#8079C6",
  inactiveFillColor: "#F2F1FF",
};

export default function Rating({
  value,
  ratingChanged,
  size = 60,
  count = 5,
  readOnly = false,
}) {
  return (
    <ReactRating
      style={{ maxWidth: size }}
      value={value}
      items={count}
      readOnly={readOnly}
      onChange={ratingChanged}
      itemStyles={myStyles}
    />
  );
}
