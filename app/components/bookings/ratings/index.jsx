import React, { useState } from "react";
import Rating from "react-rating";
import {
  AccountType,
  Message,
  validationMessage,
} from "../../../common/constants";
import { X } from "react-feather";
import { useAppDispatch } from "../../../store";
import { addRatingAsync } from "../../common/common.slice";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { HandleErrorLabel } from "../../../common/error";
import ColoredRating from "../../../common/rating";

const Ratings = ({ onClose, booking_id, accountType }) => {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      rating,
      booking_id,
    };
    dispatch(addRatingAsync(payload));
  };

  const initialValues = {
    howWasYourSession: null,
    rateAudioVideo: null,
    stronglyWouldYouLikeRecommend: null,
    title: "",
    addRemark: "",
  };

  const validationSchema = Yup.object().shape({
    howWasYourSession: Yup.number()
      .nullable()
      .required(validationMessage.rating.howWasYourSession),
    rateAudioVideo: Yup.number()
      .nullable()
      .required(validationMessage.rating.rateAudioVideo),
    stronglyWouldYouLikeRecommend: Yup.number()
      .nullable()
      .required(validationMessage.rating.stronglyWouldYouLikeRecommend)
      .optional(),
    title: Yup.string().nullable().required(validationMessage.rating.title),
    addRemark: Yup.string()
      .nullable()
      .required(validationMessage.rating.addRemark),
  });

  const handleContentOnUserWise = (
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    setValues,
    isValid
  ) => {
    if (accountType === AccountType.TRAINER) {
      return (
        <>
          <div className="d-flex justify-content-end">
            <div className="media-body media-body text-right">
              <div
                className="icon-btn btn-sm btn-outline-light close-apps pointer"
                onClick={onClose}
              >
                <X />
              </div>
            </div>
          </div>
          <h3 className="fs-1 p-3 mb-2 rounded">
            {Message.successMessage.rating}
          </h3>
          <div className="container">
            <div className="row">
              <h4 className="col">How was your session</h4>
              <div className="col">
                <ColoredRating
                  key={"howWasYourSession"}
                  onChange={(value) => {
                    setValues({ ...values, howWasYourSession: value });
                  }}
                />
                <HandleErrorLabel
                  isError={errors.howWasYourSession}
                  isTouched={
                    touched.howWasYourSession && errors.howWasYourSession
                      ? true
                      : false
                  }
                />
              </div>
            </div>
            <div className="row mt-3 mb-3">
              <h4 className="col">Audio/Video</h4>
              <div className="col">
                <ColoredRating
                  key={"rateAudioVideo"}
                  onChange={(value) => {
                    setValues({ ...values, rateAudioVideo: value });
                  }}
                />
                <HandleErrorLabel
                  isError={errors.howWasYourSession}
                  isTouched={
                    touched.howWasYourSession && errors.howWasYourSession
                      ? true
                      : false
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <input
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Title"
                    onChange={(event) => {
                      const { value } = event.target;
                      setValues({ ...values, title: value });
                    }}
                    onBlur={handleBlur}
                  />
                  <HandleErrorLabel
                    isError={errors.howWasYourSession}
                    isTouched={
                      touched.howWasYourSession && errors.howWasYourSession
                        ? true
                        : false
                    }
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <textarea
                    class="form-control"
                    rows="3"
                    placeholder="Add remark"
                    onChange={(event) => {
                      const { value } = event.target;
                      setValues({ ...values, addRemark: value });
                    }}
                    onBlur={handleBlur}
                  />
                  <HandleErrorLabel
                    isError={errors.howWasYourSession}
                    isTouched={
                      touched.howWasYourSession && errors.howWasYourSession
                        ? true
                        : false
                    }
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isValid}
                style={{ cursor: `${!rating ? "not-allowed" : "pointer"}` }}
              >
                Submit
              </button>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="d-flex justify-content-end">
            <div className="media-body media-body text-right">
              <div
                className="icon-btn btn-sm btn-outline-light close-apps pointer"
                onClick={onClose}
              >
                <X />
              </div>
            </div>
          </div>
          <h3 className="fs-1 p-3 mb-2 rounded">
            {Message.successMessage.rating}
          </h3>
          <div className="container">
            <div className="row">
              <h4 className="col">How was your session</h4>
              <div className="col">
                <ColoredRating
                  key={"howWasYourSession"}
                  onChange={(value) => {
                    setValues({ ...values, howWasYourSession: value });
                  }}
                />
              </div>
              <div>
                <HandleErrorLabel
                  isError={errors.howWasYourSession}
                  isTouched={
                    touched.howWasYourSession && errors.howWasYourSession
                      ? true
                      : false
                  }
                />
              </div>
            </div>
            <div className="row mt-3 mb-3">
              <h4 className="col">Rate Audio/Video connection</h4>
              <div className="col">
                <ColoredRating
                  key={"rateAudioVideo"}
                  onChange={(value) => {
                    setValues({ ...values, rateAudioVideo: value });
                  }}
                />
              </div>
              <div>
                <HandleErrorLabel
                  isError={errors.rateAudioVideo}
                  isTouched={
                    touched.rateAudioVideo && errors.rateAudioVideo
                      ? true
                      : false
                  }
                />
              </div>
            </div>
            <div className="row mt-3 mb-3">
              <h4 className="col">How strongly would you like to recommend</h4>
              <div className="col">
                <ColoredRating
                  key={"stronglyWouldYouLikeRecommend"}
                  onChange={(value) => {
                    setValues({
                      ...values,
                      stronglyWouldYouLikeRecommend: value,
                    });
                  }}
                />
                <div className="mt-2">
                  <HandleErrorLabel
                    isError={errors.stronglyWouldYouLikeRecommend}
                    isTouched={
                      touched.stronglyWouldYouLikeRecommend &&
                      errors.stronglyWouldYouLikeRecommend
                        ? true
                        : false
                    }
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="Title"
                    value={values.title}
                    onBlur={handleBlur}
                    onChange={(event) => {
                      const { value } = event.target;
                      setValues({ ...values, title: value });
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <HandleErrorLabel
                isError={errors.title}
                isTouched={touched.title && errors.title ? true : false}
              />
            </div>
            <div className="row mt-2">
              <div className="col">
                <div className="form-group">
                  <input
                    className="form-control mt-1"
                    placeholder="Add remark"
                    onChange={(event) => {
                      const { value } = event.target;
                      setValues({ ...values, addRemark: value });
                    }}
                    value={values.addRemark}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
            </div>
            <div>
              <HandleErrorLabel
                isError={errors.addRemark}
                isTouched={touched.addRemark && errors.addRemark ? true : false}
              />
            </div>
            <div className="d-flex justify-content-center mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isValid}
                style={{ cursor: `${!rating ? "not-allowed" : "pointer"}` }}
              >
                Submit
              </button>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.info("values", values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        handleBlur,
        setValues,
        isValid,
      }) => (
        <Form onSubmit={handleSubmit}>
          {handleContentOnUserWise(
            values,
            errors,
            touched,
            handleSubmit,
            handleBlur,
            setValues,
            isValid
          )}
        </Form>
      )}
    </Formik>
  );
};

export default Ratings;
