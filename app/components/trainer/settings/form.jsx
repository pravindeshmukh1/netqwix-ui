import React, { useEffect, useRef, useState } from "react";
import { Form, Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { HandleErrorLabel } from "../../../common/error";
import { validationMessage } from "../../../common/constants";
import { MinusCircle, PlusCircle } from "react-feather";


export const UpdateSettingProfileForm = ({ userInfo, onFormSubmit, extraInfo }) => {
    const formRef = useRef(null);
    const initialValues = {
        fullname: userInfo?.fullname,
        about: "",
        teaching_style: "",
        credentials_and_affiliations: "",
        curriculum: "",
        media: [{ type: '', url: '' }]
    };

    useEffect(() => {
        if (formRef && formRef.current) {
            formRef.current.setValues({
                fullname: userInfo?.fullname,
                about: extraInfo?.about,
                teaching_style: extraInfo?.teaching_style,
                credentials_and_affiliations: extraInfo?.credentials_and_affiliations,
                curriculum: extraInfo?.curriculum,
                media: extraInfo?.media,
            })
        }
    }, [formRef])


    const validationSchema = Yup.object().shape({
        fullname: Yup.string().default(''),
        about: Yup.string().required(validationMessage.edit_trainer_profile.about).nullable(),
        teaching_style: Yup.string().required(validationMessage.edit_trainer_profile.teaching_style).nullable(),
        credentials_and_affiliations: Yup.string().required(validationMessage.edit_trainer_profile.credentials_and_affiliations).nullable(),
        curriculum: Yup.string().required(validationMessage.edit_trainer_profile.curriculum).nullable(),
        media: Yup.array().of(
            Yup.object().shape({
                type: Yup.string()
                    .required("type required")
                    .nullable(),
                url: Yup.string()
                    .required("Description required")
                    .nullable()
            })
        ),
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
                     {/* medials */}
                     <FieldArray name="media">
                        {({ remove, push }) => {
                            return (
                                <>
                                    <div className="col-form-label items-center flex">Add Media  <div className="col-2">
                                        <div className="col-2 pt-2">
                                            <div onClick={() => {
                                                push({ url: '', type: 'image' })
                                            }}>
                                                <PlusCircle />
                                            </div>
                                        </div>
                                    </div></div>
                                    <div className="row">
                                        <div className="col-10">
                                            {values.media && values.media.length > 0 &&
                                                values.media.map((mediaInfo, index) => (
                                                    <div className="items-center">
                                                        <div className="row mb-4" key={`media-list-${index}`}>
                                                            <div className="col-4">
                                                                <select defaultValue={'image'} name="media_type" className="form-control" id=""
                                                                    onChange={(event) => {
                                                                        values.media[index].type = event.target.value;
                                                                        setValues(values);
                                                                    }}>
                                                                    <option value="image">Image</option>
                                                                    <option value="video">Video</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-6">
                                                                <input type="text" className="form-control "
                                                                    onChange={(event) => {
                                                                        const { value } = event.target;
                                                                        values.media[index].url = value;
                                                                        setValues(values);
                                                                    }}
                                                                    value={values.media[index].url}
                                                                    placeholder="Link"
                                                                />
                                                            </div>

                                                            <div className="col-2 mt-2 items-center" onClick={() => {
                                                                remove(index);
                                                            }}>
                                                                <MinusCircle />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>


                                    </div>


                                </>
                            )
                        }}
                    </FieldArray>
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