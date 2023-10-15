import styled from "styled-components";
import { Field } from "formik";

export const CustomTextInput = styled(Field)`
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 200px;
  color: #333;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const CustomSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  outline: none;
`;

export const CustomOption = styled.option`
  background-color: #fff;
`;

export const InputLabel = styled.label`
  color: #f8f8ff;
`;

export const ErrorMessageText = styled.div`
  color: red;
  font-size: 14px;
`;

export const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;
export const FormInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 10px;
`;

export const FormContent = styled.div`
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

export const QuestionContainer = styled.div`
  border-radius: 8px;
  padding: 15px;
  width: 320px;
  height: 300px;
  background-color: #faebd7;
`;

export const ResultsContainer = styled.div`
  border-radius: 8px;
  padding: 15px;
  width: 250px;
  background-color: #faebd7;
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 250px;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const TextDiv = styled.div`
  padding: 5px;
  border-radius: 8px;
  color: white;
  background-color: ${(props) => props.color};
  min-height: ${(props) => props.minheight};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.fontSize};
  width: 100%;
`;

export const AnswersSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

export const Answer = styled.div`
  border-radius: 8px;
  padding: 7px;
  width: 90%;
  background-color: #aa3333;
  text-align: center;
  color: white;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: #0000ff;
    box-shadow: 0 5px #666;
    transform: translateY(2px);
  }
`;

export const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const QuestionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
  min-height: 120px;
`;
