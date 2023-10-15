import { useMutation } from "@tanstack/react-query";
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
  QuestionHeader,
  Container,
  ContainerBottom,
} from "./styles";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
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
          trivia.storeQuizInfo({
            full_name: values.name,
            email: values.email,
            number_of_questions: values.amount,
            difficulty: difficulty,
            type: type,
          });
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

            <StyledButton type={"submit"}>Submit</StyledButton>
          </FormInputs>
        </Form>
      </Formik>
    </FormContent>
  );
}

function App() {
  const { mutate, data, isLoading } = useMutation({
    queryKey: ["triviaQuestions"],
    mutationFn: (values) => trivia.getQuiz(values),
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [questionToShow, setQuestionToShow] = useState(0);
  const [triviaAnswers, setTriviaAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  return (
    <Content>
      {!isFormSubmitted && (
        <ExampleForm
          initialState={{
            amount: 10,
            difficulty: "medium",
            type: "multiple",
          }}
          onSubmit={async (changedValues) => {
            mutate(changedValues);
          }}
          setIsFormSubmitted={setIsFormSubmitted}
        />
      )}
      {isLoading && (
        <Loader>
          <Spinner />
        </Loader>
      )}

      {!!data &&
        (questionToShow < data.length ? (
          <Container>
            <QuestionContainer>
              {data.map(
                (item, questionNumber) =>
                  questionToShow === questionNumber && (
                    <div key={item.category}>
                      <QuestionHeader>
                        <TextDiv
                          minheight={"20px"}
                          color={"green"}
                          fontSize={"14px"}
                          key={questionNumber + item.category}
                        >
                          Category: {decodeHTMLEntities(item.category)}
                        </TextDiv>
                        <TextDiv
                          minheight={"60px"}
                          color={"#97233F"}
                          fontSize={"14px"}
                          key={questionNumber}
                        >
                          {decodeHTMLEntities(item.question)}
                        </TextDiv>
                      </QuestionHeader>
                      <AnswersSection>
                        {shuffleAnswers(
                          item["incorrect_answers"],
                          item["correct_answer"]
                        ).map((ans, i) => (
                          <Answer
                            color={
                              selectedAnswer === ans ? "#72A0C1" : "#aa3333"
                            }
                            onClick={() => setSelectedAnswer(ans)}
                            // onClick={() => {
                            //   setQuestionToShow(questionToShow + 1);
                            //   const updatedArray = [...triviaAnswers, ans];
                            //   setTriviaAnswers(updatedArray);
                            // }}
                            key={i}
                          >
                            {decodeHTMLEntities(ans)}
                          </Answer>
                        ))}
                      </AnswersSection>
                    </div>
                  )
              )}
            </QuestionContainer>
            {selectedAnswer && (
              <ContainerBottom>
                <StyledButton
                  onClick={() => {
                    setQuestionToShow(questionToShow + 1);
                    const updatedArray = [...triviaAnswers, selectedAnswer];
                    setTriviaAnswers(updatedArray);
                    setSelectedAnswer("");
                  }}
                >
                  Next
                </StyledButton>
              </ContainerBottom>
            )}
          </Container>
        ) : (
          <>
            <TextDiv minheight={"20px"} color={"green"} fontSize={"20px"}>
              Your Answers
            </TextDiv>
            <ResultsContainer>
              {triviaAnswers.map((res, key) => (
                <TextDiv
                  minheight={"20px"}
                  color={"DodgerBlue"}
                  fontSize={"14px"}
                  key={key}
                >
                  {decodeHTMLEntities(res)}
                </TextDiv>
              ))}
            </ResultsContainer>
            <StyledButton
              type={"submit"}
              onClick={() => {
                setIsFormSubmitted(false);
                setQuestionToShow(0);
                setTriviaAnswers([]);
                mutate(["triviaQuestions"], [], true);
              }}
            >
              Want to go again?
            </StyledButton>
          </>
        ))}
    </Content>
  );
}

export default App;
