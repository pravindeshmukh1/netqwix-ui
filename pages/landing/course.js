import React from "react";

const Course = () => {
  return (
    <React.Fragment>
      <div className="row m-25">
        {Array.from(Array(4)).map(() => {
          return (
            <div className="col-sm">
              <div
                className="card"
                style={{
                  width: "17vw",
                  minHeight: "34vh",
                  borderRadius: "14px",
                }}
              >
                <img
                  className="card-img-top"
                  style={{
                    padding: "8px",
                    height: "20vh",
                    borderRadius: "15px",
                  }}
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  width={100}
                  height={140}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <b>Learn Figma - UI/UX Design Essential Training</b>
                  </h5>
                  <div className="d-flex"></div>
                  <div className="row mt-3">
                    <div className="col-8">
                        <div>
                            
                        </div>
                      <button type="button" className="btn btn-dark btn-sm">
                        Start Course
                      </button>
                    </div>
                    <div className="col-4">sljsnk</div>
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
