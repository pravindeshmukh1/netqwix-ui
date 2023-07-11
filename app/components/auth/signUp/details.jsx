import React from "react";
import { LIST_OF_ACCOUNT_TYPE, LIST_OF_CATEGORY } from "../../../common/constants";

const Details = (props) => {
  const { values, handleChange } = props;
  return (
    <React.Fragment>
      <div className="form-group">
        <label className="col-form-label">Phone No</label>
        <input
          className="form-control"
          onChange={handleChange}
          type="number"
          name="phone_no"
          placeholder="Phone No"
          value={values.phone_no}
        />
      </div>
      <div className="form-group">
        <label className="col-form-label" htmlFor="account_type">
          Choose Account Type
        </label>
        <select
          id="account_type"
          className="form-control"
          name="account_type"
          onChange={handleChange}
          defaultValue={values.account_type}
        >
          <option>Choose account type</option>
          {LIST_OF_ACCOUNT_TYPE.map((account_type, index) => {
            return (
              <option key={index} value={account_type.label}>
                {account_type.label}
              </option>
            );
          })}
        </select>
      </div>
      {values.account_type === "Trainer" && (
        <div className="form-group">
        <label className="col-form-label" htmlFor="account_type">
          Choose Category Type
        </label>
        <select
          id="category_type"
          className="form-control"
          name="category_type"
          onChange={handleChange}
          defaultValue={values.category_type}
        >
          <option>Choose category</option>
          {LIST_OF_CATEGORY.map((category_type, index) => {
            return (
              <option key={index} value={category_type.label}>
                {category_type.label}
              </option>
            );
          })}
        </select>
      </div>
          )}

      
    </React.Fragment>
  );
};

export default Details;
