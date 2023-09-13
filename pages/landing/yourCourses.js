import React from "react";
import { YOURCOURSES } from "../../app/common/constants";
import { ChevronRight } from "react-feather";

const YourCourses = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-11">
            <h5 className="mt-2 text-uppercase">. your courses</h5>
          </div>
          <span
            className="badge badge-light lg mb-3"
            style={{
              padding: "12px",
              alignItems: "center",
              fontSize: "14px",
              color: "black",
            }}
          >
            See all
          </span>
        </div>
      </div>
      <div className="container">
        <div className="row gy-3">
          {YOURCOURSES.map((data, index) => {
            const { item, courseDetails, name, img } = data;
            return (
              <div className="col-lg-6">
                <div class="card" style={{ borderRadius: "10px" }}>
                  <div class="card-body">
                    <div class="container">
                      <div class="row">
                        <div class="col-4">
                          <img src={img} width={200} alt="card image" />
                        </div>
                        <div class="col-8">
                          <h5 className="text-truncate">{name}</h5>
                          {courseDetails.map((item) => {
                            return (
                              <i className={`fa fa-book mt-3`}>
                                <span className="ml-1">Books : 21</span>
                              </i>
                            );
                          })}
                          <div class="row mt-3">
                            <div class="col">
                              <div class="row">
                                <div class="col-6">
                                  <img
                                    src={img}
                                    style={{ borderRadius: "20px" }}
                                    alt="card image"
                                  />
                                </div>
                                <div class="col-6">
                                  <h5>slshk</h5>
                                  <h5>slshk</h5>
                                </div>
                              </div>
                            </div>
                            <div class="col-7">
                              <button className="btn btn-dark btn-sm d-flex">
                                <div>Let's Go</div>
                                <div className="pl-2">
                                  <ChevronRight />
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default YourCourses;
