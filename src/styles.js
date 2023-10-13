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
