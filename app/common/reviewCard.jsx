import React from "react";
import Rating from "react-rating";
import { Utils } from "../../utils/utils";

const ReviewCard = ({ trainer }) => {
  const itemsWithRatings = trainer?.trainer_ratings.filter(
    (item) => item.ratings
  );
  return (
    <div className="row">
      {itemsWithRatings.map((item, index) => {
        return (
          <React.Fragment>
            <div key={`trainer_ratings${index}`} className="col-sm-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <div class="row">
                    <div class="col-7">
                      <Rating
                        start={0}
                        stop={5}
                        readonly={true}
                        initialRating={item?.ratings?.trainee?.recommendRating}
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
                      />
                    </div>
                    <div class="col-5">
                      <h5 className="card-title">
                        {Utils.getDateInFormat(item.updatedAt)}
                      </h5>
                    </div>
                  </div>
                  <h5
                    className="mb-2 mt-2 card-title "
                    style={{ fontSize: "18px" }}
                  >
                    {item?.ratings?.trainee?.title}
                  </h5>
                  <h6 className="mb-1" style={{ fontSize: "18px" }}>
                    {item?.trainee_fullname}
                  </h6>
                  <p className="card-text">
                    {item?.ratings?.trainee?.remarksInfo}
                  </p>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ReviewCard;
