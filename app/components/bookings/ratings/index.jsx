import React, { useState } from "react";
import Rating from "react-rating";
import { Message } from "../../../common/constants";
import { X } from "react-feather";
import { useAppDispatch } from "../../../store";
import { addRatingAsync } from "../../common/common.slice";

const Ratings = ({ onClose, booking_id }) => {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      rating,
      booking_id,
    };
    dispatch(addRatingAsync(payload));
  };

  return (
    <form className="form" method="post" onSubmit={handleSubmit}>
      <div className="d-flex justify-content-end">
        <div className="media-body media-body text-right">
          <div
            className="icon-btn btn-sm btn-outline-light close-apps pointer"
            onClick={onClose}
          >
            <X />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <h3 className="fs-1 p-3 mb-2 rounded">
          {Message.successMessage.rating}
        </h3>
      </div>
      <div className="d-flex justify-content-center">
        <Rating
          emptySymbol={[
            "fa fa-star-o fa-2x mediumRating",
            "fa fa-star-o fa-2x mediumRating",
            "fa fa-star-o fa-2x mediumRating",
            "fa fa-star-o fa-2x mediumRating",
            "fa fa-star-o fa-2x mediumRating",
            "fa fa-star-o fa-2x mediumRating",
          ]}
          fullSymbol={[
            "fa fa-star fa-2x mediumRating",
            "fa fa-star fa-2x mediumRating",
            "fa fa-star fa-2x mediumRating",
            "fa fa-star fa-2x mediumRating",
            "fa fa-star fa-2x mediumRating",
            "fa fa-star fa-2x mediumRating",
          ]}
          fractions={2}
          onClick={(value) => {
            setRating(value ? value : null);
          }}
        />
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!rating}
          style={{ cursor: `${!rating ? "not-allowed" : "pointer"}` }}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Ratings;
