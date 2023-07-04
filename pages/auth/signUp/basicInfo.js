import React, {useState} from "react";

const BasicInfo = (props) => {
  const { values, handleChange } = props;

  return (
    <form className="form1">
      <div className="form-group">
        <label className="col-form-label">User name</label>
        <input
          className="form-control"
          onChange={(e) => handleChange(e)}
          type="text"
          name="userName"
          placeholder="User name"
          value={values.userName}
        />
      </div>
      <div className="form-group">
        <label className="col-form-label">Email Address</label>
        <input
          className="form-control"
          onChange={(e) => handleChange(e)}
          type="email"
          name="email"
          placeholder="Demo@123gmail.com"
          value={values.email}
        />
      </div>
      <div className="form-group">
        <label className="col-form-label" htmlFor="inputPassword3">
          Password
        </label>
        <span> </span>
        <input
          className="form-control"
          id="inputPassword3"
          onChange={(e) => handleChange(e)}
          type="password"
          name="password"
          placeholder="********"
          value={values.password}
        />
      </div>
    </form>
  );
};

export default BasicInfo;
