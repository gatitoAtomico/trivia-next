import styled from "styled-components";
import { useMutation, useQuery } from "@tanstack/react-query";
import trivia from "./api";
import { useState } from "react";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #bf4f74;
`;

function ExampleForm({ initialState, onSubmit }) {
  const [difficulty, setDifficulty] = useState(initialState.difficulty);
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        const param1 = {
          amount: 10,
          difficulty,
          type: "multiple",
        };
        onSubmit(param1);
      }}
    >
      <input
        name="difficulty"
        type="text"
        value={difficulty}
        onChange={(ev) => setDifficulty(ev.target.value)}
      />
      <button>Submit</button>
    </form>
  );
}

function App() {
  const { mutate, data, isLoading, isError, error } = useMutation({
    mutationFn: (values) => trivia.getQuiz(values),
  });

  return (
    <div>
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
    </div>
  );
}

export default App;
