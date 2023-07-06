import React from "react";
import { LIST_OF_ACCOUNT_TYPE } from "../../../common/constants";

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
          name="phoneNo"
          placeholder="Phone No"
          value={values.phoneNo}
        />
      </div>
      <div className="form-group">
        <label className="col-form-label" htmlFor="accountType">
          Choose Account Type
        </label>
        <select
          id="accountType"
          className="form-control"
          name="accountType"
          onChange={handleChange}
          defaultValue={values.accountType}
        >
          <option>Choose account type</option>
          {LIST_OF_ACCOUNT_TYPE.map((accountType, index) => {
            return (
              <option key={index} value={accountType.label}>
                {accountType.label}
              </option>
            );
          })}
        </select>
      </div>
    </React.Fragment>
  );
};

export default Details;
