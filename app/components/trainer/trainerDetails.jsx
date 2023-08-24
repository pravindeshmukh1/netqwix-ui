import React, { useEffect } from "react";
import { X } from "react-feather";
import { useAppDispatch, useAppSelector } from "../../store";
import { authState, getMeAsync } from "../auth/auth.slice";
import { traineeState } from "../trainee/trainee.slice";
import Accordion from "../../common/accordion";
import Carousel from "../../common/carousel";

const TrainerDetails = ({ onClose, element, trainerInfo, isPopoverOpen }) => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(authState);
  const { getTraineeSlots } = useAppSelector(traineeState);
  useEffect(() => {
    dispatch(getMeAsync());
  }, []);
  const accordionData = [
    {
      id: 1,
    },
  ];
  return (
    <div>
      <div className="media-body media-body text-right" onClick={onClose}>
        <div className="icon-btn btn-sm btn-outline-light close-apps pointer">
          <X />
        </div>
      </div>
      {/* {getTraineeSlots.map((data, index) => {
        const {
          fullname,
          about,
          teaching_style,
          curriculum,
          credentials_and_affiliations,
        } = data.extraInfo;
        const accordionData = [
          {
            id: 1,
            label: "Teaching Style",
            value: teaching_style,
          },
          {
            id: 2,
            label: "Credentials & Affiliations",
            value: credentials_and_affiliations,
          },
          {
            id: 3,
            label: "Curriculum",
            value: curriculum,
          },
        ];
        return ( */}
      <div className="row">
        <div className="col">
          <h2 className="mb-3">{trainerInfo ? trainerInfo.name : null}</h2>
          <h3 className="mb-3 font-weight-bold">About</h3>
          <p>{trainerInfo ? trainerInfo.extraInfo.about : null}</p>
          <div className="accordion">
            {[].length
              ? [].map((data, index) => {
                  return (
                    <Accordion key={`accordion_${index}`}>
                      <Accordion.Item>
                        <Accordion.Header>{data.label}</Accordion.Header>
                        <Accordion.Body>{data.value}</Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  );
                })
              : "No data found"}
          </div>
        </div>
        <div className="col">
          <div className="row">
            <div className="col-8 mb-5">
              <Carousel
                media={trainerInfo ? trainerInfo.extraInfo.media : []}
              />
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col">{element ? element : "No data found"}</div>
            </div>
          </div>
        </div>
      </div>
      {/* ); */}
      {/* })} */}
    </div>
  );
};

export default TrainerDetails;
