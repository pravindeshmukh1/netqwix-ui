import React from "react";
import { NEW_COMMENTS, QUICK_ACCESS } from "../../app/common/constants";

const FooterLanding = (masterRecords) => {
  return (
    <>
      <div className="container">
        <div style={{ width: "100%", display: "flex" ,border: "1px solid mistyrose",marginBottom:"5px",borderRadius:"5px"}}>
          <div style={{ width: "15%" }} class="col-sm-3 ">
            <div style={{ marginLeft: "25px" }}>
              <img
                src="/assets/images/netquix_logo.png"
                alt="logo"
                style={{
                  maxWidth: "105px",
                }}
              />
            </div>
          </div>
          <div style={{ width: "85%", marginTop: "33px" }} class="col-sm-9 ">
            <p>
              Are you ready to embark on a transformative journey towards your
              personal and professional development? We are here to
              revolutionize the way you learn and connect with expert trainers.
              Our cutting-edge platform.
            </p>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-md-3 col-sm-2 col-lg-3" />
            <div class="col-md-3 col-sm-2 col-lg-3">
              <span>CATEGORIES</span>
              {masterRecords?.masterRecords?.category?.map((item, index) => {
                return (
                  <div className="mt-2" key={`item-${index}`}>
                    {item}
                  </div>
                );
              })}
            </div>
            <div class="col-md-3 col-sm-2 col-lg-3">
              <div>
                {" "}
                <b>Quick access</b>
              </div>
              <div className="mt-2">
                {QUICK_ACCESS.map((accessItems, index) => {
                  return <div key={`item-${index}`}>{accessItems.label}</div>;
                })}
              </div>
            </div>
            <div class="col-md-3 col-sm-2 col-lg-3">
              <div>
                {" "}
                <b>New Comments</b>
              </div>
              <div className="mt-2">
                {NEW_COMMENTS.map((commentInfo, index) => {
                  return (
                    <div className="card bg-light my-2 " key={`item-${index}`}>
                      <div className="card-content p-2">
                        <div>
                          <b>{commentInfo.label}</b>
                          <p>{commentInfo.comment}</p>
                        </div>
                      </div>
                    </div>
                  );
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
