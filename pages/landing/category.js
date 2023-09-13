import React from "react";
import SearchableDropdown from "../../app/components/trainee/helper/searchableDropdown";

const Category = (masterRecords) => {
  return (
    <>
    <div className="container-fluid">

      <div className="d-flex flex-wrap justify-content-center align-items-center ">
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
        <div
          style={{
            width: "50%",
            margin: "40px",
            fontSize: "35px",
            color: "black",
            fontWeight: 600,
            textAlign: "left",
          }}
          >
          🙌 Hello friends <br />I am Sofia and we want to start a web design
          course together. Do you like it too 😍 ?
          <div>
            <button type="button" class="btn btn-dark mt-5">
              Start Course Now
            </button>
          </div>
        </div>


        {/* background-color: #9d01ac;
    border-radius: 50%;
    height: 457px;
    margin-top: 24%; */}
        <div
          style={{
            backgroundColor: "#9d01ac",
            borderRadius: "50%",
            alignItems: "center",
          }}
          // class="col-md-3 col-sm-2 col-lg-3"
        >
          <div style={{ width: "50%", alignItems: "center" }} className="my-5 " >
            <img
              src="/assets/images/1-removebg 1.png"
              alt="logo"
              style={{
                maxWidth: "500px",
              }}
              />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center my-5">
        <SearchableDropdown
          options={[]}
          handleChange={() => {}}
          searchValue={() => {}}
          customClasses={{
            searchBar: "search-bar-trainee",
            searchButton: "search-button-trainee",
            dropdown: "custom-dropdown-width",
          }}
          placeholder={"Search Trainer...."}
          />
      </div>
          </div>
    </>
  );
};

export default Category;
