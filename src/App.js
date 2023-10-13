import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import trivia from "./api";
import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { decodeHTMLEntities } from "./utils/index";
import {
  CustomTextInput,
  CustomSelect,
  CustomOption,
  InputLabel,
  ErrorMessageText,
  Content,
  FormInputs,
  FormContent,
} from "./styles";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  amount: Yup.number()
    .required("Amount is required")
    .integer()
    .typeError("Amount must be a number")
    .max(49, "Amount must be less than 50"),
});

function ExampleForm({ initialState, onSubmit, setIsFormSubmitted }) {
  const [difficulty, setDifficulty] = useState(initialState.difficulty);
  const [type, setType] = useState(initialState.type);

  let typeOptions = {
    "Any Type": "",
    "Multiple Choice": "multiple",
    "True/False": "boolean",
  };

  let difficultyOptions = ["easy", "medium", "hard"];

  return (
    <FormContent>
      <Formik
        initialValues={{
          name: "",
          email: "",
          amount: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          let amount = values.amount;
          const param1 = {
            amount,
            difficulty,
            type: type,
          };
          onSubmit(param1);
          setIsFormSubmitted(true);
        }}
      >
        <Form>
          <FormInputs>
            <InputLabel>Full Name</InputLabel>
            <CustomTextInput type="text" id="name" name="name" />
            <ErrorMessageText>
              <ErrorMessage name="name" component="div" className="error" />
            </ErrorMessageText>

            <InputLabel>Email</InputLabel>
            <CustomTextInput type="text" id="email" name="email" />
            <ErrorMessageText>
              <ErrorMessage name="email" component="div" className="error" />
            </ErrorMessageText>

            <InputLabel>Number of questions</InputLabel>
            <CustomTextInput type="text" id="amount" name="amount" />
            <ErrorMessageText>
              <ErrorMessage name="amount" component="div" className="error" />
            </ErrorMessageText>

            <InputLabel>Select difficulty</InputLabel>
            <CustomSelect
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              {difficultyOptions.map((option) => (
                <CustomOption key={option} value={option}>
                  {option}
                </CustomOption>
              ))}
            </CustomSelect>

            <InputLabel>Select type</InputLabel>
            <CustomSelect
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {Object.entries(typeOptions).map(([key, value]) => (
                <CustomOption key={key} value={value}>
                  {key}
                </CustomOption>
              ))}
            </CustomSelect>

            <button type="submit">Submit</button>
          </FormInputs>
        </Form>
      </Formik>
    </FormContent>
  );
}

function App() {
  const { mutate, data, isLoading, isError, error } = useMutation({
    mutationFn: (values) => trivia.getQuiz(values),
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  return (
    <Content>
      {!isFormSubmitted && (
        <ExampleForm
          initialState={{
            amount: 10,
            difficulty: "medium",
            type: "multiple",
          }}
          onSubmit={(changedValues) => {
            mutate(changedValues);
          }}
          setIsFormSubmitted={setIsFormSubmitted}
        />
      )}

      {isLoading ? (
        <p>loading</p>
      ) : (
        !!data && (
          <div>
            {data.results.map((item) => decodeHTMLEntities(item.question))}
          </div>
        )
      )}
    </Content>
  );
}

export default App;
