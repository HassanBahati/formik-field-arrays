import React, { useEffect, useState, useMemo, useCallback } from "react";
import * as Yup from "yup";
import InputText from "./components/TextInput";
import { Formik, Form, Field, FieldArray } from "formik";

function App() {
  const initialValues = {
    title: "",
    payload: [
      {
        question: "",
        answers: [
          {
            answer: "",
            correct: false,
          },
        ],
      },
    ],
  };

  const basicFormSchema = Yup.object().shape({
    title: Yup.string().trim().required("This field is required."),
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
            <Field label="Title" name="title" component={InputText} />

            <FieldArray name="payload">
              {(arrayHelpers1) => (
                <>
                  {values.payload.map((item, index) => {
                    const fieldName = `payload[${index}].question`;

                    return (
                      <div key={index} className="question">
                        <Field
                          label="Question Title"
                          name={fieldName}
                          component={InputText}
                        />

                        <FieldArray name={`payload[${index}].answers`}>
                          {(arrayHelpers2) => (
                            <div className="questionAnswers">
                              <ul>
                                {values.payload[index].answers.map(
                                  (item, index2) => {
                                    const answerFieldName = `payload[${index}].answers[${index2}].answer`;
                                    const flagName = `payload[${index}].answers[${index2}].correct`;
                                    return (
                                      <li key={index2}>
                                        <Field
                                          label="Answer"
                                          name={answerFieldName}
                                          component={InputText}
                                        />

                                        <button
                                          type="button"
                                          className={
                                            values.payload[index].answers[
                                              index2
                                            ].correct
                                              ? "active"
                                              : ""
                                          }
                                          onClick={() => {
                                            values.payload[index].answers.map(
                                              (tem3, index3) => {
                                                setFieldValue(
                                                  `payload[${index}].answers[${index3}].correct`,
                                                  false
                                                );
                                              }
                                            );
                                            setFieldValue(flagName, true);
                                          }}
                                        >
                                          {values.payload[index].answers[index2]
                                            .correct
                                            ? "Correct Answer"
                                            : "Mark As Correct"}
                                        </button>

                                        {index2 > 0 && (
                                          <button
                                            onClick={() =>
                                              arrayHelpers2.remove(index2)
                                            }
                                          >
                                            Remove this Answer
                                          </button>
                                        )}
                                      </li>
                                    );
                                  }
                                )}
                              </ul>

                              <div className="addMore">
                                <button
                                  onClick={() =>
                                    arrayHelpers2.push({
                                      answer: "",
                                      correct: false,
                                    })
                                  }
                                >
                                  <div className="icon" />
                                  <span>Add Another Answer</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </FieldArray>

                        {index > 0 && (
                          <button onClick={() => arrayHelpers1.remove(index)}>
                            Remove this Question
                          </button>
                        )}
                      </div>
                    );
                  })}
                  <div className="addMore">
                    <button
                      onClick={() =>
                        arrayHelpers1.push({
                          question: "",
                          answers: [
                            {
                              answer: "",
                              correct: false,
                            },
                          ],
                        })
                      }
                    >
                      <div className="icon" />
                      <span>Add Another Question</span>
                    </button>
                  </div>
                </>
              )}
            </FieldArray>

            <div className="cta">
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
