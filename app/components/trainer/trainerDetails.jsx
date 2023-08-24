import React, { useEffect, useState } from "react";
import { X } from "react-feather";
import Accordion from "../../common/accordion";
import Carousel from "../../common/carousel";
import { Message } from "../../common/constants";

const TrainerDetails = ({ onClose, element, trainerInfo }) => {
  const [accordion, setAccordion] = useState({});
  useEffect(() => {
    if (trainerInfo && trainerInfo.extraInfo) {
      setAccordion(trainerInfo.extraInfo);
    }
  }, [trainerInfo]);

  const accordionData = [
    {
      id: 1,
      label: "Teaching Style",
      value: accordion.teaching_style,
    },
    {
      id: 2,
      label: "Credentials & Affiliations",
      value: accordion.credentials_and_affiliations,
    },
    {
      id: 3,
      label: "Curriculum",
      value: accordion.curriculum,
    },
  ];

  return (
    <div>
      <div className="media-body media-body text-right" onClick={onClose}>
        <div className="icon-btn btn-sm btn-outline-light close-apps pointer mr-4 mt-4">
          <X />
        </div>
      </div>
      <div className="row ml-4">
        <div className="col">
          <h2 className="mb-3">
            {trainerInfo && trainerInfo.name ? trainerInfo.name : null}
          </h2>
          <h3 className="mb-3 font-weight-bold">About</h3>
          <p>
            {trainerInfo && trainerInfo.extraInfo
              ? trainerInfo.extraInfo.about
              : null}
          </p>
          <div className="accordion">
            {accordionData.length
              ? accordionData.map((data, index) => {
                  return (
                    <Accordion key={`accordion_${index}`}>
                      <Accordion.Item>
                        <Accordion.Header>{data.label}</Accordion.Header>
                        <Accordion.Body>
                          {!data.value ? Message.notFound : data.value}
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  );
                })
              : "No data found"}
          </div>
        </div>
        <div className="col">
          <div className="row">
            <div className="ml-5">
              <Carousel
                media={
                  trainerInfo && trainerInfo.extraInfo
                    ? trainerInfo.extraInfo.media
                    : []
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col">{element ? element : "No data found"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
