import React from "react";
import { NEW_COMMENTS, QUICK_ACCESS } from "../../app/common/constants";

const FooterLanding = (masterRecords) => {
  console.log("foot...", masterRecords);
  return (
    <>
      <div className="container-fluid">
        <div style={{ width: "100%", display: "flex" }}>
          <div style={{ width: "15%" }}>
            {/* <div style={{marginLeft:"20%"}}>  */}

            <img
              src="/assets/images/netquix_logo.png"
              alt="logo"
              style={{
                maxWidth: "100px",
                marginLef: "30px",
              }}
            />
            {/* <span style={{ fontSize: "24px", fontWeight: 900,marginLeft:"18px" }}> ACADEMY</span> */}
            {/* </div> */}
          </div>
          <div style={{ width: "85%", marginTop: "35px" }}>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-md-3 col-sm-2 col-lg-3" />
            <div class="col-md-3 col-sm-2 col-lg-3">
              <span>CATEGORIES</span>
              {masterRecords?.masterRecords?.category?.map((item, index) => {
                return <div className="mt-2" key={`item-${index}`}>
                  {item}
                </div>
              })}
            </div>
            <div class="col-md-3 col-sm-2 col-lg-3">
              <div > <b>Quick access</b></div>
              <div className="mt-2" >
                {QUICK_ACCESS.map((accessItems, index) => {
                  return <div key={`item-${index}`}>
                    {accessItems.label}
                  </div>
                })}
              </div>
            </div>
            <div class="col-md-3 col-sm-2 col-lg-3">
              <div> <b>New Comments</b></div>
              <div className="mt-2" >
                {NEW_COMMENTS.map((commentInfo, index) => {
                  return <div className="card bg-light my-2 " key={`item-${index}`}>
                    <div className="card-content p-2">
                      <div>
                        <b>
                          {commentInfo.label}
                        </b>
                        <p>
                          {commentInfo.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterLanding;
