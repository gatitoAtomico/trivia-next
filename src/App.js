import { useMutation, useQueryClient } from "@tanstack/react-query";
import trivia from "./api";
import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { decodeHTMLEntities, shuffleAnswers } from "./utils/index";
import {
  CustomTextInput,
  CustomSelect,
  CustomOption,
  InputLabel,
  ErrorMessageText,
  Content,
  FormInputs,
  FormContent,
  QuestionContainer,
  TextDiv,
  AnswersSection,
  Answer,
  ResultsContainer,
  StyledButton,
  Loader,
  Spinner,
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

function ExampleForm({
  initialState,
  onSubmit,
  setIsFormSubmitted,
  setNumberOfQuestions,
}) {
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
          setNumberOfQuestions(amount);
        }}
      >
        <Form>
          <FormInputs>
            <InputLabel>Full Name</InputLabel>
            <CustomTextInput type="text" id="name" name="name" />
            <ErrorMessageText>
              <ErrorMessage name="name" />
            </ErrorMessageText>

            <InputLabel>Email</InputLabel>
            <CustomTextInput type="text" id="email" name="email" />
            <ErrorMessageText>
              <ErrorMessage name="email" />
            </ErrorMessageText>

            <InputLabel>Number of questions</InputLabel>
            <CustomTextInput type="text" id="amount" name="amount" />
            <ErrorMessageText>
              <ErrorMessage name="amount" />
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

            <StyledButton>Submit</StyledButton>
          </FormInputs>
        </Form>
      </Formik>
    </FormContent>
  );
}

function App() {
  const { mutate, data, isLoading, isError, error } = useMutation({
    queryKey: ["triviaQuestions"],
    mutationFn: (values) => trivia.getQuiz(values),
  });

  const queryClient = useQueryClient();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [questionToShow, setQuestionToShow] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const [triviaAnswers, setTriviaAnswers] = useState([]);

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
          setNumberOfQuestions={setNumberOfQuestions}
        />
      )}

      {questionToShow < numberOfQuestions ? (
        isLoading ? (
          <Loader>
            <Spinner />
          </Loader>
        ) : (
          !!data && (
            <QuestionContainer>
              {data.results.map(
                (item, questionNumber) =>
                  questionToShow == questionNumber && (
                    <div key={questionNumber}>
                      <TextDiv color={"#97233F"} key={questionNumber}>
                        {decodeHTMLEntities(item.question)}
                      </TextDiv>
                      <AnswersSection>
                        {shuffleAnswers(
                          item["incorrect_answers"],
                          item["correct_answer"]
                        ).map((ans, i) => (
                          <Answer
                            onClick={() => {
                              setQuestionToShow(questionToShow + 1);
                              const updatedArray = [...triviaAnswers, ans];
                              setTriviaAnswers(updatedArray);
                            }}
                            key={i}
                          >
                            {ans}
                          </Answer>
                        ))}
                      </AnswersSection>
                    </div>
                  )
              )}
            </QuestionContainer>
          )
        )
      ) : (
        <>
          <ResultsContainer>
            <TextDiv color={"green"}>Your Answers</TextDiv>
            {triviaAnswers.map((res, key) => (
              <TextDiv color={"#aa3333"} key={key}>
                {res}
              </TextDiv>
            ))}
          </ResultsContainer>
          <StyledButton
            onClick={() => {
              setIsFormSubmitted(false);
              setQuestionToShow(0);
              setNumberOfQuestions(1);
              setTriviaAnswers([]);
              mutate(["triviaQuestions"], [], true);
            }}
          >
            Want to go again?
          </StyledButton>
        </>
      )}
    </Content>
  );
}

export default App;
