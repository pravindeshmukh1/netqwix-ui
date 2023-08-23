import React, { useEffect, useRef, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { HandleErrorLabel } from "../../../common/error";
import { validationMessage } from "../../../common/constants";


export const UpdateSettingProfileForm = ({ userInfo, onFormSubmit, extraInfo }) => {
    const formRef = useRef(null);
    const initialValues ={
        fullname: userInfo?.fullname,
        about: "",
        teaching_style: "",
        credentials_and_affiliations: "",
        curriculum: "",
    };

    useEffect(() => {
        if(formRef && formRef.current) {
            formRef.current.setValues({
                fullname: userInfo?.fullname,
                about: extraInfo?.about,
                teaching_style: extraInfo?.teaching_style,
                credentials_and_affiliations: extraInfo?.credentials_and_affiliations,
                curriculum: extraInfo?.curriculum,
            })
        }
    }, [formRef])


    const validationSchema = Yup.object().shape({
        fullname: Yup.string().default(''),
        about: Yup.string().required(validationMessage.edit_trainer_profile.about).nullable(),
        teaching_style: Yup.string().required(validationMessage.edit_trainer_profile.teaching_style).nullable(),
        credentials_and_affiliations: Yup.string().required(validationMessage.edit_trainer_profile.credentials_and_affiliations).nullable(),
        curriculum: Yup.string().required(validationMessage.edit_trainer_profile.curriculum).nullable(),
    });

    

    return <Formik
    innerRef={formRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onFormSubmit}
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
                <div className="container mb-3">
                    {/* about */}
                    <>
                        <label className="col-form-label">About yourself</label>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <textarea onChange={(event) => {
                                        const { value } = event.target;
                                        setValues({ ...values, about: value });
                                    }}
                                        value={values.about}
                                        placeholder="About yourself"
                                        onBlur={handleBlur} className="form-control mt-1" name="" id="" cols="10" rows="3"></textarea>
                                </div>
                            </div>
                        </div>
                        <div>
                            <HandleErrorLabel
                                isError={errors.about}
                                isTouched={
                                    touched.about && errors.about
                                        ? true
                                        : false
                                }
                            />
                        </div>
                    </>
                    {/* teaching_style */}
                    <>
                        <label className="col-form-label">Mention more about your teaching style</label>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <textarea onChange={(event) => {
                                        const { value } = event.target;
                                        setValues({ ...values, teaching_style: value });
                                    }}
                                        value={values.teaching_style}
                                        placeholder="Explain more about your teaching style"
                                        onBlur={handleBlur} className="form-control mt-1" name="" id="" cols="10" rows="4"></textarea>
                                </div>
                            </div>
                        </div>
                        <div>
                            <HandleErrorLabel
                                isError={errors.teaching_style}
                                isTouched={
                                    touched.teaching_style && errors.teaching_style
                                        ? true
                                        : false
                                }
                            />
                        </div>
                    </>
                    {/* credentials_and_affiliations */}
                    <>
                        <label className="col-form-label">Mention more about credentials & affiliations </label>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <textarea onChange={(event) => {
                                        const { value } = event.target;
                                        setValues({ ...values, credentials_and_affiliations: value });
                                    }}
                                        value={values.credentials_and_affiliations}
                                        placeholder="Credentials & Affiliations"
                                        onBlur={handleBlur} className="form-control mt-1" name="credentials_and_affiliations" id="" cols="10" rows="4"></textarea>
                                </div>
                            </div>
                        </div>
                        <div>
                            <HandleErrorLabel
                                isError={errors.credentials_and_affiliations}
                                isTouched={
                                    touched.credentials_and_affiliations && errors.credentials_and_affiliations
                                        ? true
                                        : false
                                }
                            />
                        </div>
                    </>
                    {/*  curriculum */}
                    <>
                        <label className="col-form-label">Curriculum </label>

                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <textarea onChange={(event) => {
                                        const { value } = event.target;
                                        setValues({ ...values, curriculum: value });
                                    }}
                                        value={values.curriculum}
                                        placeholder="Curriculum"
                                        onBlur={handleBlur} className="form-control mt-1" name="credentials_and_affiliations" id="" cols="10" rows="4"></textarea>
                                </div>
                            </div>
                        </div>
                        <div>
                            <HandleErrorLabel
                                isError={errors.curriculum}
                                isTouched={
                                    touched.curriculum && errors.curriculum
                                        ? true
                                        : false
                                }
                            />
                        </div>
                    </>
                    <div className="d-flex justify-content-center mt-4">
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Save details
                        </button>
                    </div>
                </div>
            </Form>
        )}
    </Formik>

}