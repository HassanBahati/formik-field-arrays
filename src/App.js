import React, { useEffect, useState, useMemo, useCallback } from "react";
import * as Yup from "yup";
import InputText from "./components/TextInput";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";

function App() {
  const initialValues = {
    question_text: "",
    answers: [
      {
        answer_text: "",
        correct_answer: false,
      },
      {
        answer_text: "",
        correct_answer: false,
      },
      {
        answer_text: "",
        correct_answer: false,
      },
      {
        answer_text: "",
        correct_answer: false,
      },
    ],
  };

  const basicFormSchema = Yup.object().shape({
    question_text: Yup.string().trim().required("This field is required."),

    answers: Yup.array(
      Yup.object({
        answer_text: Yup.string().trim().required("This field is required."),
      })
    ).required("This field is required."),
  });

  const handleFormSubmit = (values, bag) => {
    console.log(values);
    bag.setSubmitting(false);
    if (
      values.answers[0].correct_answer === true ||
      values.answers[1].correct_answer === true ||
      values.answers[2].correct_answer === true ||
      values.answers[3].correct_answer === true
    ) {
      alert("Thanks");
    } else {
      alert("Select atleat one correct answer");
    }
  };

  return (
    <div className="">
      <Formik
        initialValues={initialValues}
        validationSchema={basicFormSchema}
        onSubmit={handleFormSubmit}
        enableReinitialize
      >
        {({ isValid, isSubmitting, values, setFieldValue }) => (
          <Form>
            <Field
              placeholder="Type question here"
              name="question_text"
              component={InputText}
            />
            <ErrorMessage
              name={`question_text`}
              component="div"
              className="field-error"
            />
            <FieldArray name={`answers`}>
              {({ insert, remove, push }) => (
                <div className="">
                  <ul>
                    {values.answers.map((item, index) => {
                      const answerFieldName = `answers[${index}].answer_text`;
                      const flagName = `answers[${index}].correct_answer`;
                      return (
                        <li key={index}>
                          <Field
                            name={answerFieldName}
                            component={InputText}
                            placeholder="Type answer here"
                          />
                          <ErrorMessage
                            name={answerFieldName}
                            component="div"
                            className="field-error"
                          />
                          <button
                            type="button"
                            className={
                              values.answers[index].correct_answer ? "" : ""
                            }
                            onClick={() => {
                              values.answers.map((tem3, index3) => {
                                setFieldValue(
                                  `answers[${index3}].correct_answer`,
                                  false
                                );
                              });
                              setFieldValue(flagName, true);
                            }}
                          >
                            {values.answers[index].correct_answer
                              ? "Correct Answer"
                              : "Mark As Correct"}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </FieldArray>

            <div className="">
              <button disabled={!isValid || isSubmitting} type="submit">
                Save
              </button>
            </div>

            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default App;
