import React from "react";
import { CourseData, CourseDetails } from "../../app/common/constants";

const Course = () => {
  return (
    <React.Fragment>
      <div className="row row-cols-4 m-25">
        {CourseData.map((data) => {
          const { img, name } = data;
          return (
            <div className="col">
              <div
                className="card"
                style={{
                  minHeight: "35vh",
                  borderRadius: "14px",
                  marginBottom: "16px",
                  width: "42vh",
                }}
              >
                <img
                  className="card-img-top"
                  style={{
                    padding: "8px",
                    height: "20vh",
                    borderRadius: "15px",
                  }}
                  src={img}
                  width={100}
                  height={140}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <b>{name}</b>
                  </h5>
                  <div className="d-flex"></div>
                  <div className="row mt-3">
                    <div className="col-8">
                      <button className="btn btn-dark btn-sm">
                        <i className="fa fa-book mr-2"></i>
                        Start Course
                      </button>
                    </div>
                    <div className="col-4"></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Course;
