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
