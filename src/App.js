import styled from "styled-components";
import { useMutation, useQuery } from "@tanstack/react-query";
import trivia from "./api";
import { useState } from "react";

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
  gap: 10px;
  padding-bottom: 10px;
`;
const FormButton = styled.div`
  display: flex;
  justify-content: center;
`;

const Form = styled.div`
  border-radius: 8px;

  background: rgb(255, 255, 255);
  box-shadow: rgb(230, 230, 230) 10px 10px 20px, rgb(255, 255, 255);
  padding: 20px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #bf4f74;
`;

const CustomSelect = styled.select`
  width: 200px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
`;

const CustomOption = styled.option`
  background-color: #fff;
  color: #333;
`;

const CustomTextInput = styled.input`
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 200px;
  color: #333;

  &:focus {
    outline: none;
    border-color: #007bff; /* Change border color on focus */
  }
`;

function ExampleForm({ initialState, onSubmit }) {
  const [difficulty, setDifficulty] = useState(initialState.difficulty);
  const [type, setType] = useState(initialState.type);

  let typeOptions = {
    "Any Type": "",
    "Multiple Choice": "multiple",
    "True/False": "boolean",
  };

  let difficultyOptions = ["easy", "medium", "hard"];

  return (
    <Form>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          const param1 = {
            amount: 10,
            difficulty,
            type: type,
          };
          onSubmit(param1);
        }}
      >
        <FormInputs>
          <CustomTextInput placeholder="Full Name" />

          <CustomTextInput placeholder="Email" />

          <CustomTextInput placeholder="Number of Questions" />

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

          <CustomSelect value={type} onChange={(e) => setType(e.target.value)}>
            {Object.entries(typeOptions).map(([key, value]) => (
              <CustomOption key={key} value={value}>
                {key}
              </CustomOption>
            ))}
          </CustomSelect>
        </FormInputs>

        <FormButton>
          <button>Submit</button>
        </FormButton>
      </form>
    </Form>
  );
}

function App() {
  const { mutate, data, isLoading, isError, error } = useMutation({
    mutationFn: (values) => trivia.getQuiz(values),
  });

  return (
    <Content>
      <ExampleForm
        initialState={{
          amount: 10,
          difficulty: "medium",
          type: "multiple",
        }}
        onSubmit={(changedValues) => {
          console.log("changed", changedValues);
          // setForm(changedValues);
          mutate(changedValues);
        }}
      />
      {isLoading ? (
        <p>loading</p>
      ) : (
        !!data && <Title>{JSON.stringify(data.results)}</Title>
      )}
    </Content>
  );
}

export default App;
