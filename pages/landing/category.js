import React from "react";

const Category = (masterRecords) => {
  return (
    <>
      <div class="dropdown-divider"></div>
      <div className="d-flex flex-wrap justify-content-center align-items-center">
        {masterRecords?.masterRecords?.category?.map((item) => {
          return (
            <span
              class="badge badge-light lg"
              style={{
                margin: "20px",
                padding: "18px",
                alignItems: "center",
                fontSize: "14px",
                color: "black",
              }}
            >
              {item}
            </span>
          );
        })}
      </div>
      <div class="container" style={{ width: "100%", display: "flex" }}>
        <div style={{ width: "50%", marginTop: "30px",fontSize:"24px" ,color:"black"}}>
          🙌 Hello friends I am Sofia and we want to start a web design course
          together. Do you like it too 😍 ?
        </div>
        <div style={{ width: "50%" }}></div>
      </div>
    </>
  );
};

export default Category;
