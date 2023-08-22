import Rating from "react-rating";

const ColoredRating = ({ onChange, key }) => {
  return (
    <Rating
      key={key}
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
      onChange={onChange}
    />
  );
};
export default ColoredRating;
