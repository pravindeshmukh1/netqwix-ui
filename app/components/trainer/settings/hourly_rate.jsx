import React, { useEffect, useRef, useState } from "react";
import { Form, Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { HandleErrorLabel } from "../../../common/error";
import { DUMMY_URLS, TRAINER_AMOUNT_USD, validationMessage } from "../../../common/constants";
import { MinusCircle, PlusCircle } from "react-feather";
import { Input, InputGroup } from "reactstrap";


export const UpdateHourlyRateForm = ({ userInfo, onFormSubmit, extraInfo }) => {
    const formRef = useRef(null);
    const initialValues = {
        hourly_rate: '',
    };

    useEffect(() => {
        if (formRef && formRef.current) {
            formRef.current.setValues({
                // by default it's TRAINER_AMOUNT_USD
                hourly_rate: +extraInfo?.hourly_rate || TRAINER_AMOUNT_USD,
            })
        }
    }, [formRef])


    const validationSchema = Yup.object().shape({

        hourly_rate: Yup.number().min(0).required('this field is required').nullable()
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
            setFieldValue,
            setValues,
            isValid,
            handleChange
        }) => (

            <Form onSubmit={handleSubmit}>
                <div className="container mb-3">
                    {/* hourly_rate */}
                    <>
                        <label className="col-form-label">Hourly Rate ($)</label>

                        <div className="row">
                            <div className="col-4">
                                <div className="form-group">

                                    <input onChange={(event) => {
                                        const { value } = event.target;
                                        setValues({ ...values, hourly_rate: +value });
                                    }}
                                        value={values.hourly_rate}
                                        type="number"
                                        placeholder="Hourly rate"
                                        onBlur={handleBlur} className="form-control mt-1" name="" id="" cols="10" rows="3"></input>
                                </div>
                            </div>
                        </div>
                        <div>
                            <HandleErrorLabel
                                isError={errors.hourly_rate}
                                isTouched={
                                    touched.hourly_rate && errors.hourly_rate
                                        ? true
                                        : false
                                }
                            />
                        </div>
                    </>
                    <div className=" mt-4">
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </Form>
        )}
    </Formik>

}