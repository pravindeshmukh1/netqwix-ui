import React, { useEffect, useState } from "react";
import Accordion from "../../common/accordion";
import { Star, X } from "react-feather";
import Carousel from "../../common/carousel";
import {
  Message,
  TRAINER_AMOUNT_USD,
  mediaData,
  trainerReview,
} from "../../common/constants";

const TrainerDetails = ({ onClose, element, trainerInfo }) => {
  const [accordion, setAccordion] = useState({});
  const [activeAccordion, setActiveAccordion] = useState({});
  // TODO: showing dummy records, will replace it with actual records

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
    <div className="custom-sidebar-content">
      <div className="media-body media-body text-right" onClick={onClose}>
        <div className="mr-4 mt-4">
          <X />
        </div>
      </div>
      <div className="row p-30">
        <div className="col-5">
          <h2 className="mb-3">
            {trainerInfo && trainerInfo.name ? trainerInfo.name : null}
          </h2>
          <div className="mb-3 d-flex">
            <Star
              color="#FFC436"
              size={28}
              className="star-container star-svg"
            />
            <p className="ml-1 mt-1 mr-1 font-weight-light">
              {trainerReview.review}
            </p>
            <p className="mt-1">({trainerReview.totalReviews})</p>
          </div>
          <h3 className="mb-3"> Hourly Rate: ${TRAINER_AMOUNT_USD} </h3>
          <p>
            {trainerInfo && trainerInfo.extraInfo
              ? trainerInfo.extraInfo.about
              : "No data available... "}
          </p>
          {accordionData.length
            ? accordionData.map((data, index) => {
                return (
                  <Accordion key={`accordion_${index}`} className="mb-5">
                    <Accordion.Item>
                      <Accordion.Header
                        index={index}
                        activeAccordion={activeAccordion}
                        onAClick={() => {
                          console.log(`active --- `, activeAccordion, index);
                          if (activeAccordion[index]) {
                            delete activeAccordion[index];
                          } else if (!activeAccordion[index]) {
                            activeAccordion[index] = true;
                          } else {
                            activeAccordion[index] = !activeAccordion[index];
                          }
                          setActiveAccordion(activeAccordion);
                        }}
                      >
                        {data.label}
                      </Accordion.Header>
                      <Accordion.Body>
                        {!data.value ? Message.notFound : data.value}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                );
              })
            : "No data found"}
        </div>
        <div className="col-7">
          <Carousel
            media={
              // TODO: for now passing dummy values
              mediaData
              // trainerInfo && trainerInfo.extraInfo
              //   ? trainerInfo.extraInfo.media
              //   : mediaData
            }
          />
          {element}
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
