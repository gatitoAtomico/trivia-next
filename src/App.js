import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import trivia from "./api";
import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  CustomTextInput,
  CustomSelect,
  CustomOption,
  InputLabel,
  ErrorMessageText,
} from "./styles";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #bf4f74;
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 10px;
`;

const FormContent = styled.div`
  border-radius: 8px;
  box-shadow: rgb(230, 230, 230) 10px 10px 20px,
    rgb(255, 255, 255) -10px -10px 20px;

  padding: 20px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #aa3333;
`;

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
        !!data && <Title>{JSON.stringify(data.results)}</Title>
      )}
    </Content>
  );
}

export default App;
