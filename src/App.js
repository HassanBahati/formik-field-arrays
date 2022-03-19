import React, { useEffect, useState, useMemo, useCallback } from "react";
import * as Yup from "yup";
import InputText from "./components/TextInput";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";

function App() {
  const initialValues = {
    question_text: "",
    profession: "",
    level: "",
    category_name: "",
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
  });

  const handleFormSubmit = (values, bag) => {
    console.log(values);
    bag.setSubmitting(false);
  };

  return (
    <div className="step">
      <h2>Basic Info</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={basicFormSchema}
        onSubmit={handleFormSubmit}
        enableReinitialize
      >
        {({ isValid, isSubmitting, values, setFieldValue }) => (
          <Form>
            <Field
              label="Question Title"
              placeholder="Type question here"
              name="question_text"
              component={InputText}
            />

            <FieldArray name={`answers`}>
              {(arrayHelpers2) => (
                <div className="">
                  <ul>
                    {values.answers.map((item, index) => {
                      const answerFieldName = `answers[${index}].answer_text`;
                      const flagName = `answers[${index}].correct_answer`;
                      return (
                        <li key={index}>
                          <Field
                            label="Answer"
                            name={answerFieldName}
                            component={InputText}
                            placeholder="Type answer here"
                          />

                          <button
                            type="button"
                            className={
                              values.answers[index].correct ? "active" : ""
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
                            {values.answers[index].correct
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
