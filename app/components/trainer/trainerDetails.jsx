import React, { useEffect, useState } from "react";
import Accordion from "../../common/accordion";
import { Star, X, ArrowLeft } from "react-feather";
import Carousel from "../../common/carousel";
import {
  Message,
  TRAINER_AMOUNT_USD,
  TRAINER_MEETING_TIME,
  mediaData,
  trainerFilterOptions,
  trainerReview,
} from "../../common/constants";
import { useAppSelector } from "../../store";
import { traineeState } from "../trainee/trainee.slice";
import SocialMediaIcons from "../../common/socialMediaIcons";

export const TrainerDetails = ({
  onClose,
  element,
  trainerInfo,
  selectTrainer,
  selectOption,
}) => {
  const { getTraineeSlots } = useAppSelector(traineeState);
  const [accordion, setAccordion] = useState({});
  const [activeAccordion, setActiveAccordion] = useState({});
  const [trainerDetails, setTrainerDetails] = useState({
    _id: null,
    select_trainer: false,
  });
  const [accordionsData, setAccordionsData] = useState({
    teaching_style: null,
    credentials_and_affiliations: null,
    curriculum: null,
  });
  // TODO: showing dummy records, will replace it with actual records
  useEffect(() => {
    if (trainerInfo && trainerInfo.extraInfo) {
      setAccordion(trainerInfo.extraInfo);
    }

    console.log(`trainerInfo ---- `, trainerInfo);
    if (trainerInfo && !trainerInfo.isCategory) {
      setTrainerDetails((prev) => ({
        ...prev,
        _id: trainerInfo && trainerInfo.id,
        select_trainer: true,
      }));
      selectTrainer(trainerInfo && trainerInfo._id);
    }
  }, [trainerInfo]);

  const accordionData = [
    {
      id: 1,
      label: "Teaching Style",
      value: accordion.teaching_style || accordionsData.teaching_style,
    },
    {
      id: 2,
      label: "Credentials & Affiliations",
      value:
        accordion.credentials_and_affiliations ||
        accordionsData.credentials_and_affiliations,
    },
    {
      id: 3,
      label: "Curriculum",
      value: accordion.curriculum || accordionsData.curriculum,
    },
  ];
  return (
    <div className="custom-sidebar-content">
      <div
        className={`${
          (trainerInfo.isCategory &&
            !trainerDetails.select_trainer &&
            "media-body media-body text-right") ||
          (!trainerInfo.isCategory && "media-body media-body text-right")
        }`}
      >
        <div className="mr-4 mt-4">
          {!trainerInfo.isCategory ? (
            <X onClick={onClose} style={{ cursor: "pointer" }} />
          ) : !trainerDetails.select_trainer ? (
            <X onClick={onClose} style={{ cursor: "pointer" }} />
          ) : (
            <ArrowLeft
              style={{ cursor: "pointer" }}
              onClick={() => {
                setTrainerDetails((prev) => ({
                  ...prev,
                  _id: null,
                  select_trainer: false,
                  fullname: null,
                }));
              }}
            />
          )}
        </div>
      </div>
      {trainerDetails.select_trainer ? (
        <TrainerInfo
          accordionData={accordionData}
          activeAccordion={activeAccordion}
          setActiveAccordion={setActiveAccordion}
          element={element}
          getTraineeSlots={getTraineeSlots}
          trainerDetails={trainerDetails}
          setAccordionsData={setAccordionsData}
          trainerInfo={trainerInfo}
        />
      ) : (
        <SelectedCategory
          getTraineeSlots={getTraineeSlots}
          trainerInfo={trainerInfo}
          setTrainerDetails={setTrainerDetails}
          selectTrainer={selectTrainer}
        />
      )}
    </div>
  );
};
const SelectedCategory = ({
  getTraineeSlots,
  trainerInfo,
  setTrainerDetails,
  selectTrainer,
}) => {
  return (
    <div>
      <div className="row p-10">
        <div className="col-4">
          <div className="d-flex justify-content-between">
            <h3>Filters</h3>
            <div>{/* <h5>Reset filters</h5> */}</div>
          </div>
          <hr className="hr" />
          <div className="d-flex">
            <h4 className="border border-secondary rounded-pill p-10 d-flex justify-content-center align-items-center mb-4">
              {trainerInfo.name}
            </h4>
          </div>
          {/* <p>Select as many filters as you would like.</p> */}
          {/* {trainerFilterOptions.map((option, index) => {
            return (
              <div className="d-flex" key={`filters_${index}`}>
                <p>{option.label}</p>
                <div
                  className="custom-control custom-switch position-absolute"
                  style={{ left: "30rem" }}
                >
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitches"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor={`customSwitches${index}`}
                  ></label>
                </div>
              </div>
            );
          })} */}
          {/* <p>
            <b>Day of the week</b>
          </p> */}
        </div>
        <div className="col-8 px-5">
          {!getTraineeSlots.length ? (
            <div
              className="text-center container mw-100 border border-secondary p-30 mb-4"
              style={{ borderRadius: "20px" }}
            >
              No trainer found
            </div>
          ) : (
            getTraineeSlots.map((data, index) => {
              return (
                <div
                  className="container mw-100 border border-secondary p-30 mb-4"
                  style={{ borderRadius: "20px" }}
                >
                  <div className="row">
                    <div className="col-3">
                      <img
                        src={
                          data.profilePicture
                            ? data.profilePicture
                            : "/assets/images/avtar/1.jpg"
                        }
                        width={"180px"}
                        height={"200px"}
                        style={{ borderRadius: "15px" }}
                        alt="profile-picture"
                      />
                    </div>
                    <div className="col-6">
                      <h3
                        className="ml-4 pointer underline "
                        onClick={() => {
                          console.log(`data`);
                          setTrainerDetails((prev) => ({
                            ...prev,
                            _id: data && data._id,
                            select_trainer: true,
                          }));
                          selectTrainer(data && data._id);
                        }}
                      >
                        {data ? data.fullname : ""}
                      </h3>
                      <p className="ml-4 mt-2">
                        {data && data.extraInfo && data.extraInfo.about}
                      </p>
                      <div className="ml-4 mt-2">
                        {data &&
                        data.extraInfo &&
                        data.extraInfo.social_media_links ? (
                          <SocialMediaIcons
                            social_media_links={
                              data &&
                              data.extraInfo &&
                              data.extraInfo.social_media_links
                            }
                          />
                        ) : null}
                      </div>
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
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

const TrainerInfo = ({
  element,
  accordionData,
  activeAccordion,
  setActiveAccordion,
  trainerDetails,
  getTraineeSlots,
  setAccordionsData,
}) => {
  const findTrainerDetails = () => {
    const findByTrainerId = getTraineeSlots.find(
      (trainer) => trainer && trainer._id === trainerDetails._id
    );
    return findByTrainerId;
  };
  const trainer = findTrainerDetails();
  useEffect(() => {
    if (trainer && trainer.extraInfo) {
      setAccordionsData((prev) => ({
        prev,
        teaching_style: trainer.extraInfo.teaching_style,
        credentials_and_affiliations:
          trainer.extraInfo.credentials_and_affiliations,
        curriculum: trainer.extraInfo.curriculum,
      }));
    } else {
      setAccordionsData((prev) => ({
        prev,
        teaching_style: null,
        credentials_and_affiliations: null,
        curriculum: null,
      }));
    }
  }, [trainer]);
  return (
    <>
      <div className="row p-30">
        <div className="col-5">
          <h2>{trainer ? trainer.fullname : null}</h2>
          <div class="d-flex flex-row bd-highlight"></div>
          {trainer &&
          trainer.extraInfo &&
          trainer.extraInfo.social_media_links ? (
            <SocialMediaIcons
              social_media_links={
                trainer &&
                trainer.extraInfo &&
                trainer.extraInfo.social_media_links
              }
            />
          ) : null}
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
          <p>{trainer && trainer.extraInfo ? trainer.extraInfo.about : null}</p>
          {accordionData.length
            ? accordionData.map((data, index) => {
                return (
                  <Accordion key={`accordion_${index}`} className="mb-5">
                    <Accordion.Item>
                      <Accordion.Header
                        index={index}
                        activeAccordion={activeAccordion}
                        onAClick={() => {
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
          <Carousel media={mediaData} />
          {element}
        </div>
      </div>
    </>
  );
};
