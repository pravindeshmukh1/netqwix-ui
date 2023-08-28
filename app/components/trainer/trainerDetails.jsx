import React, { useEffect, useState } from "react";
import Accordion from "../../common/accordion";
import { Star, X, ArrowLeft } from "react-feather";
import Carousel from "../../common/carousel";
import {
  Message,
  TRAINER_AMOUNT_USD,
  TRAINER_MEETING_TIME,
  mediaData,
  trainerReview,
} from "../../common/constants";
import { useAppSelector } from "../../store";
import { traineeState } from "../trainee/trainee.slice";

export const TrainerDetails = ({
  onClose,
  element,
  trainerInfo,
  selectOption,
}) => {
  const { getTraineeSlots } = useAppSelector(traineeState);
  const [accordion, setAccordion] = useState({});
  const [activeAccordion, setActiveAccordion] = useState({});
  const [trainerDetails, setTrainerDetails] = useState({
    _id: null,
    select_trainer: false,
  });
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
      {/* {JSON.stringify(getTraineeSlots)} */}
      <div className="media-body media-body text-right">
        <div className="mr-4 mt-4">
          {!trainerDetails.select_trainer ? (
            <X onClick={onClose} />
          ) : (
            <ArrowLeft
              onClick={() => {
                setTrainerDetails((prev) => ({
                  ...prev,
                  _id: null,
                  select_trainer: false,
                }));
              }}
            />
          )}
        </div>
      </div>
      {trainerDetails.select_trainer ? (
        <TrainerInfo
          accordionData={accordionData}
          trainerInfo={trainerInfo}
          activeAccordion={activeAccordion}
          setActiveAccordion={setActiveAccordion}
          element={element}
        />
      ) : (
        <SelectedCategory
          getTraineeSlots={getTraineeSlots}
          accordionData={accordionData}
          trainerInfo={trainerInfo}
          activeAccordion={activeAccordion}
          setActiveAccordion={setActiveAccordion}
          element={element}
          setTrainerDetails={setTrainerDetails}
        />
      )}

      {/*  */}
    </div>
  );
};
const SelectedCategory = ({
  getTraineeSlots,
  element,
  accordionData,
  trainerInfo,
  activeAccordion,
  setActiveAccordion,
  setTrainerDetails,
}) => {
  return (
    <>
      <div className="row p-10">
        <div className="col-4">
          <div className="d-flex justify-content-between">
            <h3>Filters</h3>
            <div>
              <h5>Reset filters</h5>
            </div>
          </div>
        </div>
        {getTraineeSlots.map((data, index) => {
          const { extraInfo, _id } = data;
          const { fullname, about } = extraInfo;
          return (
            <div className="col-8">
              {/* <div className="container">
                <div className="row">
                  <div className="col-sm">
                    <img
                      className="rounded"
                      src="/assets/images/avtar/1.jpg"
                      width={"200px"}
                      height={"200px"}
                      alt="hello"
                    />
                  </div>
                  <div className="col-sm">
                    <h3>{fullname}</h3>
                    <h6>{about}</h6>
                  </div>
                </div>
              </div> */}
              <div
                className="container mw-100 border border-secondary p-30"
                onClick={() => {
                  setTrainerDetails((prev) => ({
                    ...prev,
                    _id,
                    select_trainer: true,
                  }));
                }}
                style={{ cursor: "pointer", borderRadius: "20px" }}
              >
                <div className="row">
                  <div className="col-2">
                    <img
                      src="/assets/images/avtar/1.jpg"
                      width={"180px"}
                      height={"200px"}
                      style={{ borderRadius: "15px" }}
                      alt="hello"
                    />
                  </div>
                  <div className="col-8">
                    <h3 className="ml-4">{fullname}</h3>
                    <p className="ml-4 mt-2">{about}</p>
                    <h3 className="ml-4 mt-2">
                      {`$${TRAINER_AMOUNT_USD}.00`}{" "}
                      <span>{`/ ${TRAINER_MEETING_TIME}`}</span>
                    </h3>
                  </div>
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
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const TrainerInfo = ({
  element,
  accordionData,
  trainerInfo,
  activeAccordion,
  setActiveAccordion,
}) => {
  return (
    <>
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
    </>
  );
};
